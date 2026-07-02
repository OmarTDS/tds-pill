import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../data/translations'
import { guideIntro, notionPages } from '../data/guideContent'
import { notionPagesAr } from '../data/guideContentAr'
import NotionRenderer from '../components/NotionRenderer'
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
  const { lang } = useLanguage()

  // Select language specific blocks
  const notionData = lang === 'ar' ? notionPagesAr.guide : notionPages.guide

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!notionData) {
    return (
      <main className="guide-page" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>{getTranslation(lang, 'pageNotFound')}</h2>
        <Link to="/" style={{ color: 'var(--beige)', marginTop: 16, display: 'inline-block' }}>
          {getTranslation(lang, 'returnHome')}
        </Link>
      </main>
    )
  }

  return (
    <main className="guide-page" ref={containerRef}>
      {/* Header */}
      <section className="guide-hero">
        <div className="guide-container">
          <Link to="/" className="guide-back fade-in">{getTranslation(lang, 'backHome')}</Link>
          <div className="guide-hero-content fade-in">
            <span className="guide-emoji">{guideIntro.emoji}</span>
            <h1 className="guide-title">
              {lang === 'ar' ? notionPagesAr.guide.title : guideIntro.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main content from Notion blocks */}
      <section className="guide-steps">
        <div className="guide-container fade-in">
          <NotionRenderer blocks={notionData.blocks} />
        </div>
      </section>
    </main>
  )
}
