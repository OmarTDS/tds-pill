import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../data/translations'
import './Footer.css'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="pill-icon">💊</span>
          <span className="footer-logo">{getTranslation(lang, 'navLogo')}</span>
        </div>
        <p className="footer-tagline">{getTranslation(lang, 'tagline')}</p>
        <div className="footer-divider" />
        <p className="footer-copy">© 2024 TDS. {getTranslation(lang, 'rights')}</p>
      </div>
    </footer>
  )
}
