import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../data/translations'
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

export default function Home() {
  const containerRef = useFadeIn()
  const { lang } = useLanguage()

  const innerPillars = [
    { emoji: '🧠', title: getTranslation(lang, 'pillarMindset'), desc: getTranslation(lang, 'pillarMindsetDesc'), slug: 'mindset' },
    { emoji: '💪', title: getTranslation(lang, 'pillarBody'), desc: getTranslation(lang, 'pillarBodyDesc'), slug: 'body' },
  ]

  const externalPillars = [
    { emoji: '💼', title: getTranslation(lang, 'pillarWork'), desc: getTranslation(lang, 'pillarWorkDesc'), slug: 'work' },
    { emoji: '💰', title: getTranslation(lang, 'pillarMoney'), desc: getTranslation(lang, 'pillarMoneyDesc'), slug: 'money' },
    { emoji: '🤝', title: getTranslation(lang, 'pillarSocial'), desc: getTranslation(lang, 'pillarSocialDesc'), slug: 'social' },
    { emoji: '❤️', title: getTranslation(lang, 'pillarRelationships'), desc: getTranslation(lang, 'pillarRelationshipsDesc'), slug: 'relationships' },
    { emoji: '🕌', title: getTranslation(lang, 'pillarReligion'), desc: getTranslation(lang, 'pillarReligionDesc'), slug: 'religion' },
    { emoji: '📖', title: getTranslation(lang, 'pillarIslamicKnowledge'), desc: getTranslation(lang, 'pillarIslamicKnowledgeDesc'), slug: 'islamic-knowledge' },
  ]

  return (
    <main ref={containerRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge fade-in">
            <span className="badge-dot" />
            {getTranslation(lang, 'heroBadge')}
          </div>
          <h1 className="hero-title fade-in">
            <span className="hero-pill">💊</span>
            <span className="title-main">{getTranslation(lang, 'heroTitleMain')}</span>
            <span className="title-sub">{getTranslation(lang, 'heroTitleSub')}</span>
          </h1>
          <blockquote className="hero-quote fade-in">
            {getTranslation(lang, 'heroQuote')}
          </blockquote>
          <p className="hero-desc fade-in">
            {getTranslation(lang, 'heroDesc')}
          </p>
          <div className="hero-actions fade-in">
            <a href="#start" className="btn btn-primary">{getTranslation(lang, 'btnStart')} <Arrow /></a>
            <a href="/tds-habit-tracker.pdf" download="TDS-Habit-Tracker.pdf" className="btn btn-ghost btn-download">{getTranslation(lang, 'downloadTracker')} <Download /></a>
            <Link to="/guide" className="btn btn-ghost">{getTranslation(lang, 'btnGuide')}</Link>
          </div>
        </div>
        <div className="scroll-indicator fade-in">
          <div className="scroll-line" />
          <span>{getTranslation(lang, 'scroll')}</span>
        </div>
      </section>

      {/* Start Here */}
      <section className="section" id="start">
        <div className="container">
          <SectionHeader emoji="🗺️" title={getTranslation(lang, 'startTitle')} />
          <div className="start-card fade-in">
            <div className="start-card-inner">
              <div className="start-icon">🧠</div>
              <h3>{getTranslation(lang, 'startCardHeader')}</h3>
              <p>{getTranslation(lang, 'startCardDesc')}</p>
              <Link to="/guide" className="card-link">
                {getTranslation(lang, 'btnGuide')} <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Idea */}
      <section className="section section-alt" id="core">
        <div className="container">
          <SectionHeader emoji="🧩" title={getTranslation(lang, 'coreTitle')} />
          <div className="core-grid fade-in">
            <CoreCard num="01" title={getTranslation(lang, 'core01Title')} text={getTranslation(lang, 'core01Desc')} />
            <CoreCard num="02" title={getTranslation(lang, 'core02Title')} text={getTranslation(lang, 'core02Desc')} />
            <CoreCard num="03" title={getTranslation(lang, 'core03Title')} text={getTranslation(lang, 'core03Desc')} />
          </div>
        </div>
      </section>

      {/* Inner Foundation */}
      <section className="section" id="inner">
        <div className="container">
          <SectionHeader emoji="🧬" title={getTranslation(lang, 'innerTitle')} subtitle={getTranslation(lang, 'innerSubtitle')} />
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
          <SectionHeader emoji="🌍" title={getTranslation(lang, 'externalTitle')} />
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
          <SectionHeader emoji="🔧" title={getTranslation(lang, 'systemsTitle')} subtitle={getTranslation(lang, 'systemsSubtitle')} />
          <div className="tools-grid fade-in">
            <ToolCard icon="📅" title={getTranslation(lang, 'toolWeeklyReview')} desc={getTranslation(lang, 'toolWeeklyReviewDesc')} slug="weekly-review" />
            <ToolCard icon="🔄" title={getTranslation(lang, 'toolRelapse')} desc={getTranslation(lang, 'toolRelapseDesc')} slug="relapse-protocol" />
          </div>
        </div>
      </section>

      {/* Closing Quote */}
      <section className="section section-quote">
        <div className="container">
          <div className="quote-card fade-in">
            <div className="quote-mark">"</div>
            <blockquote>{getTranslation(lang, 'aristotleQuote')}</blockquote>
            <cite>{getTranslation(lang, 'aristotleAuthor')}</cite>
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
  const { lang } = useLanguage()
  return (
    <Link to={`/tools/${slug}`} className="tool-card-link">
      <div className="tool-card">
        <div className="tool-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="tool-link">{lang === 'en' ? 'Open →' : 'افتح ←'}</span>
      </div>
    </Link>
  )
}

function Arrow() {
  const { lang } = useLanguage()
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ transform: lang === 'ar' ? 'scaleX(-1)' : 'none' }}
    >
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
