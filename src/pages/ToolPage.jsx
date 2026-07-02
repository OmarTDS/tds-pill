import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../data/translations';
import { notionPages } from '../data/guideContent';
import { notionPagesAr } from '../data/guideContentAr';
import NotionRenderer from '../components/NotionRenderer';
import './SubPage.css'; // Reuse subpage styling

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll('.fade-in');
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function ToolPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const containerRef = useFadeIn();
  
  const notionData = lang === 'ar' ? notionPagesAr[slug] : notionPages[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!notionData) {
    return (
      <main className="subpage" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>{getTranslation(lang, 'toolNotFound')}</h2>
        <Link to="/" style={{ color: 'var(--beige)', marginTop: 16, display: 'inline-block' }}>
          {getTranslation(lang, 'returnHome')}
        </Link>
      </main>
    );
  }

  return (
    <main className="subpage" ref={containerRef}>
      <div className="subpage-container">
        <Link to="/" className="subpage-back fade-in">{getTranslation(lang, 'backHome')}</Link>

        <div className="subpage-header fade-in">
          <span className="subpage-step-label">{getTranslation(lang, 'toolLabel')}</span>
          <div className="subpage-title-row">
            <span className="subpage-title-emoji">{notionData.emoji}</span>
            <h1 className="subpage-title">{notionData.title}</h1>
          </div>
        </div>

        <div className="subpage-body fade-in">
          <NotionRenderer blocks={notionData.blocks} />
        </div>

        <div className="subpage-nav fade-in">
          <Link to="/" className="subpage-nav-link">
            {getTranslation(lang, 'returnHome')}
          </Link>
        </div>
      </div>
    </main>
  );
}
