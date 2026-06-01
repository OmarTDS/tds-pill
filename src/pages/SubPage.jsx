import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { guideSteps } from '../data/guideContent'
import './SubPage.css'

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
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    )
    const els = ref.current?.querySelectorAll('.fade-in')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

// Subpage content data — each step's deeper content
const subpageContent = {
  'taking-action': {
    emoji: '⚡',
    title: 'Taking Action',
    sections: [
      {
        heading: 'Why Action Comes First',
        paragraphs: [
          'Most people start self-improvement by trying to learn everything first. They read books, watch videos, make plans — and never actually do anything. This is because motion feels productive but creates zero results.',
          'Action is the single most important skill in self-improvement. Without it, nothing else matters. Knowledge is useless without execution.',
        ],
      },
      {
        heading: 'The Two-Minute Rule',
        paragraphs: [
          'If a task takes less than two minutes, do it immediately. Do not add it to a list. Do not think about it. Just do it.',
          'This eliminates the backlog of small tasks that drain your mental energy and create the feeling of being overwhelmed.',
        ],
      },
      {
        heading: 'Start Embarrassingly Small',
        paragraphs: [
          'Want to start going to the gym? Start by just driving to the gym and sitting in the parking lot. Want to read more? Read one page. Want to pray on time? Set one alarm.',
          'The point is not the size of the action. The point is breaking the inertia. Once you are in motion, it is far easier to continue than it was to start.',
        ],
      },
      {
        heading: 'Identity-Based Actions',
        paragraphs: [
          'Every action you take is a vote for the type of person you want to become. When you make your bed, you vote for being organized. When you go to the gym, you vote for being fit. When you pray Fajr, you vote for being a person of faith.',
          'Stop trying to achieve outcomes. Start casting votes for your identity. The outcomes will follow.',
        ],
      },
    ],
  },
  discipline: {
    emoji: '⚔️',
    title: 'Discipline',
    sections: [
      {
        heading: 'Discipline vs. Motivation',
        paragraphs: [
          'Motivation is unreliable. It comes in waves — strong after watching an inspirational video, gone by Tuesday morning. If your self-improvement depends on motivation, it will fail.',
          'Discipline is the ability to do what needs to be done regardless of how you feel. It is built like a muscle: through repeated use against resistance.',
        ],
      },
      {
        heading: 'The Non-Negotiables',
        paragraphs: [
          'Create a short list of daily non-negotiables. These are things you do every single day, no matter what. Start with 3-5 items max.',
          'Examples: pray all five prayers on time, drink 2L of water, exercise for 30 minutes, read for 15 minutes, sleep before midnight. These are your floor — the minimum standard below which you refuse to drop.',
        ],
      },
      {
        heading: 'Discomfort Is the Signal',
        paragraphs: [
          'When something feels uncomfortable, that is usually a sign it is exactly what you need to do. Cold showers, difficult conversations, waking up early, putting your phone away — discomfort is where growth lives.',
          'Do not run from it. Lean into it. Every time you push through discomfort, your capacity for discipline grows.',
        ],
      },
      {
        heading: 'Accountability Systems',
        paragraphs: [
          'Do not rely on willpower alone. Build systems that make discipline easier: set phone timers, use app blockers, find an accountability partner, use the Weekly Review system from the tools section.',
          'Environment design is more powerful than willpower. Remove temptation, and discipline becomes the default.',
        ],
      },
    ],
  },
  'mental-health': {
    emoji: '🪩',
    title: 'Mental Health',
    sections: [
      {
        heading: 'The Foundation You Cannot Skip',
        paragraphs: [
          'Mental health is not a luxury — it is the foundation. You cannot build discipline, maintain relationships, or pursue purpose if your mental state is broken. Ignoring it does not make you tough. It makes you fragile.',
          'Many young men suffer silently because they were taught that mental health is weakness. This is wrong. Addressing your mental health is one of the most strategic things you can do.',
        ],
      },
      {
        heading: 'The Lifestyle Factors',
        paragraphs: [
          'Before considering anything else, audit these lifestyle factors — they have a direct, measurable impact on your brain chemistry and emotional state:',
        ],
        list: [
          { bold: 'Sleep', text: ' — 7-9 hours. Non-negotiable. Sleep deprivation destroys mood, focus, and willpower.' },
          { bold: 'Exercise', text: ' — Releases endorphins, reduces anxiety, improves self-image. Minimum 3 times per week.' },
          { bold: 'Diet', text: ' — Cut processed food, sugar, and excessive caffeine. Eat whole foods.' },
          { bold: 'Screen time', text: ' — Social media and doomscrolling are clinically linked to depression and anxiety.' },
          { bold: 'Sunlight', text: ' — Get outside. Natural light regulates your circadian rhythm and boosts serotonin.' },
          { bold: 'Social connection', text: ' — Isolation is destructive. Maintain real, in-person relationships.' },
        ],
      },
      {
        heading: 'Journaling & Reflection',
        paragraphs: [
          'Write down your thoughts. Not for anyone else — for yourself. Journaling externalizes the noise in your head and helps you process emotions you might otherwise suppress.',
          'Start simple: each morning, write 3 things you are grateful for. Each evening, write what went well and what you want to improve. This takes 5 minutes and compounds over time.',
        ],
      },
      {
        heading: 'When to Seek Professional Help',
        paragraphs: [
          'If you have been struggling with persistent low mood, anxiety, trauma, or destructive thought patterns for weeks or months, speak to a professional. A therapist or counsellor is not a sign of failure — it is a sign of intelligence.',
          'The strongest version of yourself uses every resource available. Do not let pride stop you from getting the help you need.',
        ],
      },
    ],
  },
}

export default function SubPage() {
  const { slug } = useParams()
  const containerRef = useFadeIn()
  const data = subpageContent[slug]
  const step = guideSteps.find((s) => s.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!data || !step) {
    return (
      <main className="subpage" style={{ paddingTop: 140, textAlign: 'center' }}>
        <h2>Page not found</h2>
        <Link to="/guide" style={{ color: 'var(--beige)', marginTop: 16, display: 'inline-block' }}>
          ← Back to Guide
        </Link>
      </main>
    )
  }

  return (
    <main className="subpage" ref={containerRef}>
      <div className="subpage-container">
        <Link to="/guide" className="subpage-back fade-in">← Back to Guide</Link>

        <div className="subpage-header fade-in">
          <span className="subpage-step-label">{step.step}</span>
          <div className="subpage-title-row">
            <span className="subpage-title-emoji">{data.emoji}</span>
            <h1 className="subpage-title">{data.title}</h1>
          </div>
        </div>

        <div className="subpage-body">
          {data.sections.map((section, si) => (
            <div key={si} className="subpage-section fade-in">
              <h2 className="subpage-heading">{section.heading}</h2>
              {section.paragraphs.map((p, pi) => (
                <p key={pi} className="subpage-para">{p}</p>
              ))}
              {section.list && (
                <ul className="subpage-list">
                  {section.list.map((item, li) => (
                    <li key={li}>
                      <strong>{item.bold}</strong>{item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="subpage-nav fade-in">
          <Link to="/guide" className="subpage-nav-link">
            ← Return to full guide
          </Link>
        </div>
      </div>
    </main>
  )
}
