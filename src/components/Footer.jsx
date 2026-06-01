import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="pill-icon">💊</span>
          <span className="footer-logo">TDS Pill</span>
        </div>
        <p className="footer-tagline">Rebuild. Restructure. Rise.</p>
        <div className="footer-divider" />
        <p className="footer-copy">© 2024 TDS. All rights reserved.</p>
      </div>
    </footer>
  )
}
