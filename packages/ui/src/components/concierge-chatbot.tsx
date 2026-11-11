"use client";

import * as React from "react";
import {
  MessageSquare,
  X,
  Send,
  UserCheck,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { Badge } from "./badge";
import { cn } from "../utils";

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  citation?: {
    label: string;
    href: string;
  };
  timestamp?: string;
}

export function ConciergeChatbot({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("");
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! Ask about our frontier research, academy pathways, or enterprise projects.",
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // Simulate RAG response with citation (Board 04 spec)
    setTimeout(() => {
      let botResponse: ChatMessage;
      if (text.toLowerCase().includes("mlops") || text.toLowerCase().includes("service")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Yes — we build high-throughput enterprise MLOps architectures with Redis & pgvector orchestration.",
          citation: {
            label: "Explore /services/mlops [Source 1]",
            href: "/services/mlops",
          },
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Our research covers Medicine, Precision Agri, Theoretical Physics, and Higher Math with custom AI reasoning models.",
          citation: {
            label: "Explore Research Division [Source 1]",
            href: "/research",
          },
        };
      }
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div className={cn("fixed bottom-6 right-6 z-40", className)}>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[#05070D] shadow-[0_0_28px_rgba(34,211,238,0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open Softcapphyjas AI Concierge"
        >
          <MessageSquare className="h-6 w-6 stroke-[2.2]" />
        </button>
      )}

      {isOpen && (
        <Card
          variant="standard"
          className="w-[90vw] max-w-sm sm:max-w-md h-[500px] flex flex-col p-0 rounded-2xl border border-[var(--border)] shadow-2xl bg-[var(--bg-elev-1)]/95 backdrop-blur-xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-elev-2)]/60">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="font-display text-sm font-semibold text-[var(--text)] leading-tight">
                  Concierge (RAG Assistant)
                </h4>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--accent-3)] font-mono-data">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-3)] animate-pulse" />
                  Active · Synapse Guardrails
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-elev-2)] transition-colors"
              aria-label="Close Concierge"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin text-left text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-2xl p-3 leading-relaxed",
                  m.sender === "user"
                    ? "ml-auto bg-[var(--accent)] text-[#05070D] font-medium rounded-br-xs shadow-xs"
                    : "mr-auto bg-[var(--bg-elev-2)] text-[var(--text)] border border-[var(--border)] rounded-bl-xs"
                )}
              >
                <span>{m.text}</span>
                {m.citation && (
                  <a
                    href={m.citation.href}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>{m.citation.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Quick prompt suggestions (Board 04) */}
          <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--bg-elev-2)]/30 flex items-center gap-2 overflow-x-auto">
            <span className="text-[11px] text-[var(--text-muted)] shrink-0 font-mono-data">
              Suggested:
            </span>
            <button
              type="button"
              onClick={() => handleSend("Do you offer MLOps?")}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-elev-2)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]/50 shrink-0 transition-colors"
            >
              Do you offer MLOps?
            </button>
            <button
              type="button"
              onClick={() => handleSend("Tell me about Synapse")}
              className="text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-elev-2)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)]/50 shrink-0 transition-colors"
            >
              Tell me about Synapse
            </button>
          </div>

          {/* Input & Actions */}
          <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-elev-1)] space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about research, courses or projects..."
                className="h-10 flex-1 rounded-xl px-3 bg-[var(--bg-elev-2)] border border-[var(--border)] text-xs text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]"
              />
              <Button type="submit" size="sm" variant="primary" className="h-10 px-3">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[var(--accent-3)]" />
                PII redacted · Injections blocked · Citations verified
              </span>
              <button
                type="button"
                onClick={() => handleSend("I would like a human handoff to an AI consultant.")}
                className="flex items-center gap-1 hover:text-[var(--text)] text-[var(--accent)] font-medium"
              >
                <UserCheck className="h-3 w-3" />
                Human handoff
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
