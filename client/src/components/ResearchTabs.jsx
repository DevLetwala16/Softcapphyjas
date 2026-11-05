import { useState } from 'react';

const RESEARCH_DATA = {
  physics: {
    title: 'Computational Physics & Non-Linear Dynamics',
    tagline: 'Physics-Informed Neural Operators (PINNs) & High-Dimensional PDEs',
    desc: 'Modeling non-linear fluid flows, plasma containment dynamics, and quantum many-body systems by constraining neural networks to obey fundamental conservation laws.',
    metrics: [
      { num: '100x', lbl: 'Faster than traditional FEM/CFD solvers' },
      { num: 'O(10⁻⁵)', lbl: 'L2 relative error on Navier-Stokes' },
      { num: '4D', lbl: 'Spatiotemporal continuous manifolds' },
      { num: 'Zero', lbl: 'Violation of energy conservation bounds' },
    ],
    code: `# Softcapphyjas Physics Lab: Neural Operator Tensor
import softcapphyjas.physics as scp

operator = scp.FourierNeuralOperator(
    modes=(16, 16, 16),
    width=64,
    conservation_laws=["navier_stokes", "divergence_free"]
)
solution_manifold = operator.solve(
    reynolds_number=1e5,
    boundary_conditions="turbulent_boundary_3d"
)`
  },
  medicine: {
    title: 'Frontier AI in Medicine & Molecular Biology',
    tagline: 'De Novo Drug Discovery, Variant Pathogenicity & Histology Agents',
    desc: 'Accelerating therapeutic molecule design through generative 3D diffusion models, predicting genomic variant impact, and orchestrating multimodal clinical diagnostic reasoning agents.',
    metrics: [
      { num: '99.2%', lbl: 'Precision on variant clinical impact' },
      { num: '14 Days', lbl: 'From target sequence to lead candidate' },
      { num: 'Multi-Modal', lbl: 'Histopathology, genomic & EHR synthesis' },
      { num: 'HIPAA/GDPR', lbl: 'Fully compliant federated architecture' },
    ],
    code: `# Softcapphyjas Medicine: Autonomous Lead Molecule Diffusion
import softcapphyjas.bio as scb

pipeline = scb.GenerativeDrugPipeline(
    target_receptor="PDB:7W8U",
    docking_engine="alpha_dock_v3"
)
candidates = pipeline.generate_conformations(
    pocket_residues=[102, 105, 148, 162],
    filter_admet=True,
    min_affinity_kd="< 5nM"
)`
  },
  math: {
    title: 'Mathematical Intelligence & Theorem Proving',
    tagline: 'Formal Verification, High-Dimensional Geometry & Combinatorics',
    desc: 'Empowering formal mathematical discovery through neural-guided search across interactive theorem provers (Lean 4, Coq) and topological data analysis for non-Euclidean structures.',
    metrics: [
      { num: '10,000+', lbl: 'Formally proven mathematical lemmas' },
      { num: 'Lean 4', lbl: 'Native formal language synthesis' },
      { num: 'NP-Hard', lbl: 'Combinatorial heuristics with graph agents' },
      { num: '100%', lbl: 'Zero hallucination formal proof output' },
    ],
    code: `# Softcapphyjas Math: Automated Theorem Search Engine
import softcapphyjas.math as scm

verifier = scm.Lean4Agent(backend="formal_kernel")
goal = scm.TheoremGoal(
    statement="forall (M : RiemannManifold), RicciFlat M -> VolumeGrowth M"
)
proof_tree = verifier.search_tactic_stream(
    depth=32,
    heuristic="topological_entropy"
)`
  },
  agriculture: {
    title: 'Agricultural Intelligence & Soil Ecology',
    tagline: 'Multispectral Satellite Vision, Yield Forecasting & Biome Genetics',
    desc: 'Revolutionizing food security with edge-deployed computer vision, hyper-local microclimate prediction, and deep sequencing models for soil microbiome nutrient optimization.',
    metrics: [
      { num: '96.8%', lbl: 'Yield prediction accuracy at parcel level' },
      { num: '30% Less', lbl: 'Chemical fertilizer with biome targeting' },
      { num: '5m Resolution', lbl: 'Daily satellite multispectral inference' },
      { num: 'Offline Edge', lbl: 'Drone-mounted real-time detection models' },
    ],
    code: `# Softcapphyjas Agri: Edge Biome & Crop Telemetry
import softcapphyjas.agri as sca

canopy_agent = sca.MultispectralAnalyzer(
    sensor_bands=["NIR", "RedEdge", "SWIR"],
    model="crop_stress_vit_large"
)
recommendations = canopy_agent.analyze_field(
    spatial_coords=(28.6139, 77.2090),
    target_crop="drought_resistant_canola"
)`
  }
};

export default function ResearchTabs() {
  const [activeTab, setActiveTab] = useState('physics');
  const current = RESEARCH_DATA[activeTab];

  return (
    <section id="frontier-research-deep-dive" className="cs-section">
      <div className="cs-container">
        <div className="cs-section-header">
          <div className="cs-section-tag">
            <span>// Frontier Research Labs</span>
          </div>
          <h2 className="cs-section-title">
            Exploring the Boundaries of Human Knowledge
          </h2>
          <p className="cs-section-desc">
            Softcapphyjas combines deep domain physics, molecular medicine, pure mathematics, and agritech systems with state-of-the-art agentic foundation models.
          </p>
        </div>

        <div className="cs-research-box">
          <div className="cs-research-nav">
            <button
              type="button"
              className={`cs-research-tab ${activeTab === 'physics' ? 'active' : ''}`}
              onClick={() => setActiveTab('physics')}
            >
              <span>⚛️</span>
              <span>Physics</span>
            </button>
            <button
              type="button"
              className={`cs-research-tab ${activeTab === 'medicine' ? 'active' : ''}`}
              onClick={() => setActiveTab('medicine')}
            >
              <span>🧬</span>
              <span>Medicine</span>
            </button>
            <button
              type="button"
              className={`cs-research-tab ${activeTab === 'math' ? 'active' : ''}`}
              onClick={() => setActiveTab('math')}
            >
              <span>📐</span>
              <span>Mathematics</span>
            </button>
            <button
              type="button"
              className={`cs-research-tab ${activeTab === 'agriculture' ? 'active' : ''}`}
              onClick={() => setActiveTab('agriculture')}
            >
              <span>🌾</span>
              <span>Agriculture</span>
            </button>
          </div>

          <div className="cs-research-content">
            <div className="cs-research-info">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--cyan-primary)', textTransform: 'uppercase' }}>
                {current.tagline}
              </span>
              <h3 style={{ marginTop: '8px' }}>{current.title}</h3>
              <p>{current.desc}</p>

              <div className="cs-research-metrics">
                {current.metrics.map((m, idx) => (
                  <div key={idx} className="cs-metric-card">
                    <div className="cs-metric-num">{m.num}</div>
                    <div className="cs-metric-lbl">{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-research-preview">
              <div className="cs-code-header">
                <div className="cs-code-dots">
                  <div className="cs-code-dot" style={{ background: '#f87171' }}></div>
                  <div className="cs-code-dot" style={{ background: '#fbbf24' }}></div>
                  <div className="cs-code-dot" style={{ background: '#34d399' }}></div>
                </div>
                <span>research_kernel.py • Softcapphyjas Core</span>
              </div>
              <pre className="cs-code-block">
                <code>{current.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
