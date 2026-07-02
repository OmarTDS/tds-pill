import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { notionPages } from '../data/guideContent';
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

export default function PillarPage() {
  const { slug } = useParams();
  const containerRef = useFadeIn();
  
  const notionData = notionPages[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!notionData) {
    return (
      <main className="subpage" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>Pillar not found</h2>
        <Link to="/" style={{ color: 'var(--beige)', marginTop: 16, display: 'inline-block' }}>
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="subpage" ref={containerRef}>
      <div className="subpage-container">
        <Link to="/" className="subpage-back fade-in">← Back to Home</Link>

        <div className="subpage-header fade-in">
          <span className="subpage-step-label">Pillar</span>
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
            ← Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
