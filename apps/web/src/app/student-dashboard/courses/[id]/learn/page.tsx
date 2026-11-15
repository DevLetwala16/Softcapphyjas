"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  FileText,
  MessageSquare,
  Download,
  Award,
  Sparkles,
  Lock,
  Layers,
  Send,
  ShieldCheck,
  Check,
  Clock,
  PlayCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import {
  ACADEMY_COURSES,
  type CourseData,
  type LessonData,
  type ModuleData,
  type QuizData,
} from "@/lib/academy-data";

export default function LmsPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const courseIdOrSlug = (params?.id as string) || "autonomous-agents-arch";

  // Find course data
  const fallbackCourse =
    ACADEMY_COURSES.find(
      (c) => c.slug === courseIdOrSlug || c.id === courseIdOrSlug
    ) || ACADEMY_COURSES[0]!;

  const { data: learnData } = trpc.student.getCourseLearn.useQuery(
    { courseIdOrSlug },
    {
      initialData: {
        course: fallbackCourse as any,
        enrollment: {
          id: "enr_demo_01",
          userId: "user_demo",
          courseId: fallbackCourse.id,
          progressPct: 66,
          completedAt: null,
        } as any,
        progressMap: {
          "les-1-1": { completed: true, positionSec: 2100 },
          "les-1-2": { completed: true, positionSec: 1500 },
          "les-1-3": { completed: true, positionSec: 900 },
        },
        certificate: null,
      },
    }
  );

  const course = (learnData?.course as CourseData) || fallbackCourse;
  const modules = course.modules || [];
  const allLessons = React.useMemo(() => {
    return modules.flatMap((m) => m.lessons);
  }, [modules]);

  // Current active lesson state
  const [activeLessonId, setActiveLessonId] = React.useState<string>(
    allLessons[0]?.id || "les-1-1"
  );

  const currentLesson: LessonData =
    allLessons.find((l) => l.id === activeLessonId) || allLessons[0]!;

  // Video player state
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(currentLesson.durationSec || 1800);
  const [playbackRate, setPlaybackRate] = React.useState(1.0);
  const [isMuted, setIsMuted] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"notes" | "quiz" | "qa" | "resources">("notes");

  // Dynamic progress map
  const [progressMap, setProgressMap] = React.useState<
    Record<string, { completed: boolean; positionSec: number }>
  >(
    learnData?.progressMap || {
      "les-1-1": { completed: true, positionSec: 2100 },
      "les-1-2": { completed: true, positionSec: 1500 },
      "les-1-3": { completed: true, positionSec: 900 },
    }
  );

  // Save progress mutation
  const saveProgressMutation = trpc.student.saveProgress.useMutation();
  const submitQuizMutation = trpc.student.submitQuiz.useMutation();

  // Quiz state
  const [quizAnswers, setQuizAnswers] = React.useState<Record<string, any>>({});
  const [quizSubmitted, setQuizSubmitted] = React.useState(false);
  const [quizResult, setQuizResult] = React.useState<any>(null);

  // AI Tutor Q&A state
  const [chatMessages, setChatMessages] = React.useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: `Hello! I am your Softcapphyjas AI Tutor for "${course.title}". Ask me any theoretical question or code clarification about "${currentLesson.title}".`,
    },
  ]);
  const [inputQuestion, setInputQuestion] = React.useState("");
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  // Watermark timestamp state
  const [watermarkTime, setWatermarkTime] = React.useState("");
  React.useEffect(() => {
    setWatermarkTime(new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC");
    const interval = setInterval(() => {
      setWatermarkTime(new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC");
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts (Space: play/pause, J/L: -10s/+10s, <: 0.75x, >: 1.5x)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "j" || e.key === "J") {
        seekRelative(-10);
      } else if (e.key === "l" || e.key === "L") {
        seekRelative(10);
      } else if (e.key === ">") {
        changePlaybackRate(Math.min(2.0, playbackRate + 0.25));
      } else if (e.key === "<") {
        changePlaybackRate(Math.max(0.75, playbackRate - 0.25));
      } else if (e.key === "n" || e.key === "N") {
        goToNextLesson();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, playbackRate, activeLessonId]);

  // Periodic progress saving (every 10s)
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (videoRef.current) {
        const pos = Math.round(videoRef.current.currentTime);
        saveProgressMutation.mutate({
          courseIdOrSlug: course.slug,
          lessonId: activeLessonId,
          positionSec: pos,
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isPlaying, activeLessonId, course.slug]);

  // Video control helpers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const seekRelative = (delta: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(
      0,
      Math.min(videoRef.current.duration || duration, videoRef.current.currentTime + delta)
    );
  };

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setQuizSubmitted(false);
    setQuizResult(null);
    setQuizAnswers({});
    const nextLesson = allLessons.find((l) => l.id === lessonId);
    if (nextLesson?.type === "QUIZ") {
      setActiveTab("quiz");
    } else {
      setActiveTab("notes");
    }
  };

  const toggleLessonComplete = () => {
    const isCompleted = !progressMap[activeLessonId]?.completed;
    const newProgress = {
      ...progressMap,
      [activeLessonId]: {
        completed: isCompleted,
        positionSec: Math.round(currentTime),
      },
    };
    setProgressMap(newProgress);

    saveProgressMutation.mutate({
      courseIdOrSlug: course.slug,
      lessonId: activeLessonId,
      positionSec: Math.round(currentTime),
      completed: isCompleted,
    });
  };

  const goToNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex < allLessons.length - 1) {
      handleLessonSelect(allLessons[currentIndex + 1]!.id);
    }
  };

  const goToPrevLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex > 0) {
      handleLessonSelect(allLessons[currentIndex - 1]!.id);
    }
  };

  // Submit Quiz
  const handleQuizSubmit = async () => {
    const quizId = currentLesson.quiz?.id || "quiz-mod-1";
    submitQuizMutation.mutate(
      {
        quizId,
        courseIdOrSlug: course.slug,
        answers: quizAnswers,
      },
      {
        onSuccess: (data) => {
          setQuizResult(data);
          setQuizSubmitted(true);
          if (data.passed) {
            setProgressMap((prev) => ({
              ...prev,
              [activeLessonId]: { completed: true, positionSec: 900 },
            }));
          }
        },
      }
    );
  };

  // AI Tutor message submit
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuestion.trim()) return;

    const userText = inputQuestion.trim();
    setInputQuestion("");
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsAiThinking(true);

    setTimeout(() => {
      let reply = `In the context of ${currentLesson.title}, this directly connects to enforcing deterministic safety contracts and schema validations. ReAct loops ground actions by isolating intermediate sub-goals, preventing hallucinated parameters from reaching the runtime sandbox.`;
      if (userText.toLowerCase().includes("code") || userText.toLowerCase().includes("python")) {
        reply = `Here is how you can implement this in PyTorch/Python:
\`\`\`python
async def execute_verified_trajectory(agent, query):
    thought = await agent.think(query)
    schema = ToolCallSchema.validate(thought.tool_call)
    return await sandbox.run(schema)
\`\`\`
Notice how the schema validation happens strictly before entering the sandbox kernel.`;
      }
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsAiThinking(false);
    }, 800);
  };

  // Calculate completion percentage
  const completedCount = Object.values(progressMap).filter((p) => p.completed).length;
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / (allLessons.length || 1)) * 100)
  );

  return (
    <div className="min-h-screen bg-[#05070D] text-[var(--text)] flex flex-col selection:bg-[var(--accent)] selection:text-[#05070D]">
      {/* 1. LMS CLASSROOM TOP BAR */}
      <header className="h-14 border-b border-[var(--border)] bg-[#0A0E1A] px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/student-dashboard"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {course.title}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hidden sm:inline">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] truncate max-w-[250px] sm:max-w-lg">
              {currentLesson.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mark Completed Toggle */}
          <button
            onClick={toggleLessonComplete}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              progressMap[activeLessonId]?.completed
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
            }`}
          >
            {progressMap[activeLessonId]?.completed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Circle className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {progressMap[activeLessonId]?.completed ? "Completed" : "Mark Complete"}
            </span>
          </button>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={goToPrevLesson}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 disabled:opacity-30"
              title="Previous Lesson"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goToNextLesson}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 disabled:opacity-30"
              title="Next Lesson (N)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 ml-2"
            title="Toggle Curriculum Sidebar"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. MAIN LMS WORKSPACE (Player + Sidebar) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left / Center Area: Video + Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* VIDEO / MEDIA PLAYER SECTION (Board 20) */}
          <div className="bg-black relative aspect-video max-h-[60vh] w-full flex items-center justify-center overflow-hidden group">
            {currentLesson.type === "QUIZ" ? (
              <div className="text-center p-8 space-y-3">
                <HelpCircle className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
                <h3 className="text-xl font-bold text-white">Module Assessment Lab</h3>
                <p className="text-xs font-mono text-[var(--text-muted)] max-w-sm">
                  Complete the mastery questions below to verify theoretical rigor and unlock your certificate.
                </p>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors"
                >
                  Start Assessment Questions
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={
                    currentLesson.videoUrl ||
                    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  }
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                      setDuration(videoRef.current.duration || currentLesson.durationSec || 1800);
                    }
                  }}
                  onEnded={() => {
                    setIsPlaying(false);
                    toggleLessonComplete();
                  }}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={togglePlay}
                />

                {/* Subtle Anti-Piracy Watermark Overlay (Spec §11.5) */}
                <div className="absolute top-4 right-5 text-[10px] font-mono text-white/20 pointer-events-none select-none tracking-widest uppercase">
                  Softcapphyjas LMS · student@learner.org · {watermarkTime}
                </div>

                {/* Play/Pause Giant Center Overlay when paused */}
                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    className="absolute w-16 h-16 rounded-full bg-[var(--accent)]/90 hover:bg-[var(--accent)] text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                  >
                    <Play className="w-8 h-8 fill-black translate-x-0.5" />
                  </button>
                )}

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                  {/* Seek Slider */}
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      const newTime = parseFloat(e.target.value);
                      setCurrentTime(newTime);
                      if (videoRef.current) {
                        videoRef.current.currentTime = newTime;
                      }
                    }}
                    className="w-full h-1 bg-white/20 accent-[var(--accent)] cursor-pointer rounded-full"
                  />

                  <div className="flex items-center justify-between text-xs font-mono text-white">
                    <div className="flex items-center gap-3">
                      <button onClick={togglePlay} className="hover:text-[var(--accent)] transition-colors">
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>

                      <button onClick={() => seekRelative(-10)} className="hover:text-[var(--accent)] transition-colors" title="Rewind 10s (J)">
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      <button onClick={() => seekRelative(10)} className="hover:text-[var(--accent)] transition-colors" title="Fast Forward 10s (L)">
                        <RotateCw className="w-4 h-4" />
                      </button>

                      <span className="text-[11px] text-[var(--text-muted)]">
                        {Math.floor(currentTime / 60)}:
                        {Math.floor(currentTime % 60).toString().padStart(2, "0")} /{" "}
                        {Math.floor(duration / 60)}:
                        {Math.floor(duration % 60).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Speed Selector */}
                      <select
                        value={playbackRate}
                        onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                        className="bg-black/60 border border-white/20 rounded-lg px-2 py-0.5 text-[11px] font-mono text-white"
                      >
                        <option value="0.75">0.75x</option>
                        <option value="1.0">1.0x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2.0">2.0x</option>
                      </select>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                          }
                        }}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.requestFullscreen();
                          }
                        }}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* MULTI-TAB WORKSPACE TABS HEADER (Board 20) */}
          <div className="border-b border-[var(--border)] bg-[#0A0E1A] px-6 flex items-center gap-6">
            <button
              onClick={() => setActiveTab("notes")}
              className={`py-3.5 text-xs font-mono flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "notes"
                  ? "border-[var(--accent)] text-[var(--accent)] font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Lecture Notes</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`py-3.5 text-xs font-mono flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "quiz"
                  ? "border-emerald-400 text-emerald-400 font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Assessment Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab("qa")}
              className={`py-3.5 text-xs font-mono flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "qa"
                  ? "border-purple-400 text-purple-400 font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Tutor Q&amp;A</span>
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={`py-3.5 text-xs font-mono flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === "resources"
                  ? "border-amber-400 text-amber-400 font-bold"
                  : "border-transparent text-[var(--text-muted)] hover:text-white"
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Code &amp; Papers</span>
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-6 sm:p-8 flex-1 max-w-4xl space-y-6">
            {/* TAB 1: NOTES */}
            {activeTab === "notes" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white">{currentLesson.title}</h2>
                    <p className="text-xs font-mono text-[var(--text-muted)]">
                      Faculty Research Notes &amp; Mathematical Formulations
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Notes</span>
                  </button>
                </div>

                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-white/90 leading-relaxed space-y-4">
                  {currentLesson.contentMd ? (
                    <div className="space-y-4 whitespace-pre-line font-sans">
                      {currentLesson.contentMd}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p>
                        In this module, we formulate the test-time search dynamics over structured tool call graphs. Unlike single-turn completions, multi-step agent trajectories depend on strict environmental invariants.
                      </p>
                      <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-[var(--accent)]">
                        τ_t = (observation_1, action_1, observation_2, action_2, ... observation_t, action_t)
                      </div>
                      <p>
                        Every step must be verified against predefined JSON Schemas before execution in the isolated kernel sandbox.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE QUIZ ENGINE (Board 20 Spec) */}
            {activeTab === "quiz" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-base font-bold text-white">
                        {currentLesson.quiz?.title || "Mastery Knowledge Verification"}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-mono">
                      Pass mark: 70% · Max attempts: 3 · Verified against server key
                    </p>
                  </div>

                  {quizSubmitted && quizResult && (
                    <div
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 ${
                        quizResult.passed
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      }`}
                    >
                      {quizResult.passed ? <Check className="w-4 h-4" /> : null}
                      <span>Score: {quizResult.scorePct}% ({quizResult.passed ? "PASSED" : "FAILED"})</span>
                    </div>
                  )}
                </div>

                {/* Quiz Questions */}
                <div className="space-y-6">
                  {(
                    currentLesson.quiz?.questions || [
                      {
                        id: "q-demo-1",
                        kind: "MCQ" as const,
                        prompt:
                          "In the ReAct framework, what is the primary purpose of generating an explicit 'Thought' step before executing an 'Action'?",
                        options: [
                          "To decompose complex multi-step reasoning and ground future tool arguments",
                          "To reduce the number of tokens sent to the API provider",
                          "To prevent the model from using external APIs",
                          "To encrypt the conversation history against injection",
                        ],
                        answer: 0,
                        explanation:
                          "Generating explicit thoughts allows the model to perform test-time chain-of-thought search, track intermediate goals, and synthesize accurate arguments for downstream tool execution.",
                        points: 25,
                      },
                      {
                        id: "q-demo-2",
                        kind: "MCQ" as const,
                        prompt:
                          "Which mechanism prevents an agent from entering infinite retry loops when a tool consistently throws a 500 server error?",
                        options: [
                          "A finite Reflexion retry counter paired with plan backtracking",
                          "Increasing the temperature parameter to 2.0",
                          "Removing system prompt instructions",
                          "Ignoring the error and marking the task as successful",
                        ],
                        answer: 0,
                        explanation:
                          "A capped retry policy combined with episodic reflexion allows the agent to diagnose failure, mark the tool path as dead, and backtrack to alternative sub-plans.",
                        points: 25,
                      },
                    ]
                  ).map((question, qIdx) => {
                    const selected = quizAnswers[question.id];
                    const questionResult = quizResult?.questionResults?.[question.id];

                    return (
                      <div
                        key={question.id}
                        className="p-5 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-sm font-semibold text-white leading-relaxed">
                            <span className="font-mono text-[var(--accent)] mr-2">Q{qIdx + 1}.</span>
                            {question.prompt}
                          </h4>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0">
                            {question.points} pts
                          </span>
                        </div>

                        {/* Options */}
                        <div className="space-y-2">
                          {question.options.map((opt, oIdx) => {
                            const isChosen = selected === oIdx;

                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={quizSubmitted}
                                onClick={() =>
                                  setQuizAnswers({
                                    ...quizAnswers,
                                    [question.id]: oIdx,
                                  })
                                }
                                className={`w-full p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center justify-between ${
                                  isChosen
                                    ? "bg-[var(--accent)]/15 border-[var(--accent)] text-white font-medium"
                                    : "bg-black/30 border-white/10 text-white/80 hover:bg-white/5"
                                }`}
                              >
                                <span>{opt}</span>
                                {isChosen && (
                                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation after submit */}
                        {quizSubmitted && questionResult && (
                          <div
                            className={`p-3.5 rounded-xl text-xs space-y-1 ${
                              questionResult.correct
                                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                                : "bg-rose-500/10 border border-rose-500/20 text-rose-300"
                            }`}
                          >
                            <div className="font-bold font-mono">
                              {questionResult.correct ? "✓ Correct!" : "✗ Incorrect"}
                            </div>
                            <div className="text-[11px] leading-relaxed text-white/80">
                              {questionResult.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Submit Quiz Action */}
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={submitQuizMutation.isPending}
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submit Assessment for Cryptographic Evaluation</span>
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizResult(null);
                        setQuizAnswers({});
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                    >
                      Retake Assessment
                    </button>

                    {quizResult?.passed && (
                      <Link
                        href={`/academy/verify/${quizResult.certificate?.publicId || "SCP-CERT-2026-A91F2B"}`}
                        className="px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-xs font-mono font-bold text-black transition-opacity flex items-center gap-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>Inspect Issued Ed25519 Certificate</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: AI TUTOR Q&A */}
            {activeTab === "qa" && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Softcapphyjas Frontier AI Tutor</span>
                  </div>
                  <p className="text-[11px] text-white/70">
                    Grounded directly in this lesson's transcripts, mathematical proofs, and lab code.
                  </p>
                </div>

                {/* Conversation Feed */}
                <div className="space-y-3 min-h-[240px] max-h-[400px] overflow-y-auto pr-2">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 text-xs leading-relaxed ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xl p-3.5 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-[var(--accent)] text-black font-medium"
                            : "bg-[var(--bg-elev-1)] border border-[var(--border)] text-white/90"
                        }`}
                      >
                        <div className="whitespace-pre-line font-sans">{msg.text}</div>
                      </div>
                    </div>
                  ))}
                  {isAiThinking && (
                    <div className="flex gap-2 items-center text-xs text-purple-400 font-mono animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Tutor synthesizing answer from lesson corpus...</span>
                    </div>
                  )}
                </div>

                {/* Question Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                    placeholder="Ask about proof steps, code implementation, or invariants..."
                    className="flex-1 h-11 px-4 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="px-4 h-11 rounded-xl bg-purple-500 hover:bg-purple-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB 4: CODE & DOWNLOADS */}
            {activeTab === "resources" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white">Laboratory Code &amp; Citations</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-4 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">GitHub Laboratory Repository</div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)]">
                        git clone https://github.com/softcapphyjas/agent-mesh-labs.git
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("git clone https://github.com/softcapphyjas/agent-mesh-labs.git");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px]"
                    >
                      Copy Clone
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--bg-elev-1)] border border-[var(--border)] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-white">Jupyter Code Lab Notebook</div>
                      <div className="text-[11px] text-[var(--text-muted)]">
                        interactive-cognitive-loop.ipynb · PyTorch 2.4+
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-black font-semibold text-[11px] flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .ipynb</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. COLLAPSIBLE CURRICULUM SIDEBAR (Right Rail, Board 20) */}
        {sidebarOpen && (
          <aside className="w-80 border-l border-[var(--border)] bg-[#0A0E1A] flex flex-col shrink-0 overflow-y-auto">
            <div className="p-4 border-b border-[var(--border)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Course Modules
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {completedCount}/{allLessons.length} Done
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Modules and Lessons list */}
            <div className="p-3 space-y-4">
              {modules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-1.5">
                  <div className="px-2 text-[11px] font-mono text-[var(--text-muted)] font-bold uppercase truncate">
                    {mod.title}
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = progressMap[lesson.id]?.completed;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonSelect(lesson.id)}
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-sans transition-all flex items-center justify-between gap-2.5 ${
                            isActive
                              ? "bg-[var(--accent)]/15 border border-[var(--accent)] text-white font-medium"
                              : "hover:bg-white/5 text-white/80 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-white/30 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-muted)]">
                            {lesson.type === "QUIZ" && (
                              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                            )}
                            <span>{Math.round(lesson.durationSec / 60)}m</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
