import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../data/translations'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { lang, toggleLang } = useLanguage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="pill-icon">💊</span>
          <span className="logo-text">{getTranslation(lang, 'navLogo')}</span>
        </Link>
        <div className="nav-right">
          <div className="nav-links">
            {isHome ? (
              <>
                <a href="#start" className="nav-link">{getTranslation(lang, 'startHere')}</a>
                <a href="#core" className="nav-link">{getTranslation(lang, 'coreIdea')}</a>
                <a href="#inner" className="nav-link">{getTranslation(lang, 'foundation')}</a>
                <a href="#external" className="nav-link">{getTranslation(lang, 'lifePillars')}</a>
                <a href="#tools" className="nav-link">{getTranslation(lang, 'systems')}</a>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">{getTranslation(lang, 'home')}</Link>
                <Link to="/guide" className="nav-link">{getTranslation(lang, 'guide')}</Link>
              </>
            )}
          </div>
          <button 
            onClick={toggleLang} 
            className="lang-btn"
            title={lang === 'en' ? 'التحويل للعامية المصرية' : 'Switch to English'}
          >
            <span className="lang-globe">🌐</span>
            <span className="lang-text">{lang === 'en' ? 'مصر' : 'EN'}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
