import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../data/translations';
import { guideSteps, notionPages } from '../data/guideContent';
import { notionPagesAr } from '../data/guideContentAr';
import NotionRenderer from '../components/NotionRenderer';
import './SubPage.css';

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

export default function SubPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const containerRef = useFadeIn();
  
  // Find step detail
  const step = guideSteps.find((s) => s.slug === slug);
  const notionData = lang === 'ar' ? notionPagesAr[slug] : notionPages[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!step || !notionData) {
    return (
      <main className="subpage" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>{getTranslation(lang, 'pageNotFound')}</h2>
        <Link to="/guide" style={{ color: 'var(--beige)', marginTop: 16, display: 'inline-block' }}>
          {getTranslation(lang, 'backGuide')}
        </Link>
      </main>
    );
  }

  // Label Step info
  let stepLabel = step.step;
  if (lang === 'ar') {
    stepLabel = stepLabel.replace('Step', 'الخطوة');
  }

  return (
    <main className="subpage" ref={containerRef}>
      <div className="subpage-container">
        <Link to="/guide" className="subpage-back fade-in">{getTranslation(lang, 'backGuide')}</Link>

        <div className="subpage-header fade-in">
          <span className="subpage-step-label">{stepLabel}</span>
          <div className="subpage-title-row">
            <span className="subpage-title-emoji">{notionData.emoji}</span>
            <h1 className="subpage-title">{notionData.title}</h1>
          </div>
        </div>

        <div className="subpage-body fade-in">
          <NotionRenderer blocks={notionData.blocks} />
        </div>

        <div className="subpage-nav fade-in">
          <Link to="/guide" className="subpage-nav-link">
            {getTranslation(lang, 'returnGuide')}
          </Link>
        </div>
      </div>
    </main>
  );
}
