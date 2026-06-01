import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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
          <span className="logo-text">TDS Pill</span>
        </Link>
        <div className="nav-links">
          {isHome ? (
            <>
              <a href="#start" className="nav-link">Start Here</a>
              <a href="#core" className="nav-link">Core Idea</a>
              <a href="#inner" className="nav-link">Foundation</a>
              <a href="#external" className="nav-link">Life Pillars</a>
              <a href="#tools" className="nav-link">Systems</a>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/guide" className="nav-link">Guide</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
