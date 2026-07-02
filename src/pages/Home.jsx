import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.fade-in')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

const innerPillars = [
  { emoji: '🧠', title: 'Mindset', desc: 'Your internal operating system. Beliefs, self-talk, discipline, and mental frameworks that shape every decision you make.', slug: 'mindset' },
  { emoji: '💪', title: 'Body — Health, Physique & Style', desc: 'Your physical vessel. Health, fitness, grooming, and how you present yourself to the world.', slug: 'body' },
]

const externalPillars = [
  { emoji: '💼', title: 'Work Life & Career', desc: 'Your professional path, productivity systems, and how you build value in the world.', slug: 'work' },
  { emoji: '💰', title: 'Money & Financial Freedom', desc: 'Income, savings, investments, and building the financial foundation for independence.', slug: 'money' },
  { emoji: '🤝', title: 'Social Life, Friends & Brotherhood', desc: 'Your circle, networking, and building genuine, high-value relationships.', slug: 'social' },
  { emoji: '❤️', title: 'Relationships', desc: 'Understanding dynamics, building standards, and approaching relationships with clarity.', slug: 'relationships' },
  { emoji: '🕌', title: 'Religion & Purpose', desc: 'Your relationship with Allah, finding meaning, and aligning your actions with a higher purpose.', slug: 'religion' },
  { emoji: '📖', title: 'Islamic Knowledge & Spiritual Development', desc: 'Deepening your understanding of the Deen, building consistent spiritual habits.', slug: 'islamic-knowledge' },
]

export default function Home() {
  const containerRef = useFadeIn()

  return (
    <main ref={containerRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span className="badge-dot" />
            The Operating System for Life
          </div>
          <h1 className="hero-title fade-in">
            <span className="hero-pill">💊</span>
            <span className="title-main">TDS Pill</span>
            <span className="title-sub">— The System</span>
          </h1>
          <blockquote className="hero-quote fade-in">
            "Your life is your responsibility. This system exists to help you rebuild it — <em>methodically, honestly, and permanently.</em>"
          </blockquote>
          <p className="hero-desc fade-in">
            This is not a collection of motivational quotes. It is a structured operating system for becoming the best version of yourself — rooted in Islamic principles, backed by practical frameworks, and designed to be followed, not just read.
          </p>
          <div className="hero-actions fade-in">
            <a href="#start" className="btn btn-primary">Start Here <Arrow /></a>
            <a href="/tds-habit-tracker.svg" download="TDS-Habit-Tracker.svg" className="btn btn-ghost btn-download">Habit Tracker <Download /></a>
            <Link to="/guide" className="btn btn-ghost">Read the Guide</Link>
          </div>
        </div>
        <div className="scroll-indicator fade-in">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Start Here */}
      <section className="section" id="start">
        <div className="container">
          <SectionHeader emoji="🗺️" title="Start Here" />
          <div className="start-card fade-in">
            <div className="start-card-inner">
              <div className="start-icon">🧠</div>
              <h3>Self-Improvement Guide</h3>
              <p>If you are new, begin with the self-improvement guide. It walks you through the foundational steps in the right order — because <strong>the order matters.</strong></p>
              <Link to="/guide" className="card-link">
                Read the Guide <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Idea */}
      <section className="section section-alt" id="core">
        <div className="container">
          <SectionHeader emoji="🧩" title="The Core Idea" />
          <div className="core-grid fade-in">
            <CoreCard num="01" title="You Are a System" text="Think of yourself as a system made of interconnected parts. Your habits, beliefs, relationships, and routines all fit together. You cannot just swap one bad piece for a good one — it will not fit with the rest." />
            <CoreCard num="02" title="Rebuild Deliberately" text="You rebuild the whole system. Deliberately, piece by piece, in the right sequence. Good habits, a strong mindset, a healthy body, meaningful relationships, and a clear purpose — all reinforcing each other." />
            <CoreCard num="03" title="Not a Hobby" text="This is not self-improvement as a hobby. This is self-reconstruction as a project. Structured, intentional, and built to last." />
          </div>
        </div>
      </section>

      {/* Inner Foundation */}
      <section className="section" id="inner">
        <div className="container">
          <SectionHeader emoji="🧬" title="You — Inner Foundation" subtitle="Your mind and body are the foundation everything else is built on. Fix these first." />
          <div className="pillars-grid pillars-2 fade-in">
            {innerPillars.map((p) => (
              <PillarCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* External Pillars */}
      <section className="section section-alt" id="external">
        <div className="container">
          <SectionHeader emoji="🌍" title="Your Life — External Pillars" />
          <div className="pillars-grid pillars-2 fade-in">
            {externalPillars.map((p) => (
              <PillarCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Systems & Tools */}
      <section className="section" id="tools">
        <div className="container">
          <SectionHeader emoji="🔧" title="Systems & Tools" subtitle="Knowledge without execution is entertainment. These systems keep you on track." />
          <div className="tools-grid fade-in">
            <ToolCard icon="📅" title="Weekly Review & Accountability System" desc="A structured weekly check-in framework to review progress, course-correct, and maintain momentum." slug="weekly-review" />
            <ToolCard icon="🔄" title="The Relapse Protocol" desc="You will fall. This protocol exists for exactly that moment — a step-by-step recovery system to get back on track." slug="relapse-protocol" />
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="section section-quote">
        <div className="container">
          <div className="quote-card fade-in">
            <div className="quote-mark">"</div>
            <blockquote>We are what we repeatedly do. Excellence, then, is not an act, but a habit.</blockquote>
            <cite>— Aristotle</cite>
          </div>
        </div>
      </section>
    </main>
  )
}

function SectionHeader({ emoji, title, subtitle }) {
  return (
    <div className="section-header fade-in">
      <span className="section-emoji">{emoji}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}

function CoreCard({ num, title, text }) {
  return (
    <div className="core-card">
      <span className="core-num">{num}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  )
}

function PillarCard({ emoji, title, desc, slug }) {
  return (
    <Link to={`/pillars/${slug}`} className="pillar-card-link">
      <div className="pillar-card">
        <div className="pillar-icon-box"><span>{emoji}</span></div>
        <div className="pillar-body">
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <div className="pillar-arrow"><Arrow /></div>
      </div>
    </Link>
  )
}

function ToolCard({ icon, title, desc, slug }) {
  return (
    <Link to={`/tools/${slug}`} className="tool-card-link">
      <div className="tool-card">
        <div className="tool-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="tool-link">Open →</span>
      </div>
    </Link>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function Download() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}

