import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { guideIntro, guideSteps, guideClosing } from '../data/guideContent'
import './Guide.css'

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.fade-in')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Guide() {
  const containerRef = useFadeIn()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="guide-page" ref={containerRef}>
      {/* Header */}
      <section className="guide-hero">
        <div className="guide-container">
          <Link to="/" className="guide-back fade-in">← Back to Home</Link>
          <div className="guide-hero-content fade-in">
            <span className="guide-emoji">{guideIntro.emoji}</span>
            <h1 className="guide-title">{guideIntro.title}</h1>
            {guideIntro.intro.map((p, i) => (
              <p key={i} className="guide-intro-text">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="guide-steps">
        <div className="guide-container">
          {guideSteps.map((step, idx) => (
            <div key={step.slug} className="step-block fade-in">
              <div className="step-header">
                <span className="step-label">{step.step}</span>
                <h2 className="step-title">{step.title}</h2>
              </div>
              <div className="step-content">
                {step.content.map((block, bi) => (
                  <ContentBlock key={bi} block={block} />
                ))}
              </div>
              {step.subpage && (
                <Link to={`/guide/${step.slug}`} className="subpage-card">
                  <span className="subpage-emoji">{step.subpage.emoji}</span>
                  <div className="subpage-info">
                    <h3>{step.subpage.title}</h3>
                    <p>Deep dive into this step →</p>
                  </div>
                  <div className="subpage-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </div>
                </Link>
              )}
              {idx < guideSteps.length - 1 && <div className="step-divider" />}
            </div>
          ))}
        </div>
      </section>

      {/* Compound Effect */}
      <section className="guide-closing">
        <div className="guide-container">
          <div className="closing-block fade-in">
            <h2>{guideClosing.compoundEffect.title}</h2>
            {guideClosing.compoundEffect.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="step-divider" />

          <div className="closing-block fade-in">
            <h2>{guideClosing.accountability.title}</h2>
            <p>{guideClosing.accountability.intro}</p>
            <div className="accountability-tools">
              {guideClosing.accountability.tools.map((tool) => (
                <div key={tool.name} className="acc-tool-card">
                  <span className="acc-tool-emoji">{tool.emoji}</span>
                  <div>
                    <strong>{tool.name}</strong>
                    <span className="acc-tool-desc"> {tool.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ContentBlock({ block }) {
  if (block.type === 'paragraph') {
    return <p className="step-para">{block.text}</p>
  }

  if (block.type === 'callout') {
    return (
      <div className="step-callout">
        <FormattedText text={block.text} />
      </div>
    )
  }

  if (block.type === 'list') {
    return (
      <ul className="step-list">
        {block.items.map((item, i) => (
          <li key={i}>
            <strong>{item.bold}</strong>{item.text}
          </li>
        ))}
      </ul>
    )
  }

  return null
}

function FormattedText({ text }) {
  // Simple bold/italic markdown parsing
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return part
      })}
    </p>
  )
}
