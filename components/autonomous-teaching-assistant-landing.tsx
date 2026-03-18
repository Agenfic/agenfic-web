"use client";

import { useEffect, useRef, useState } from "react";
import {
  getNavigationBannerIframeHtml,
  getPreferredTheme,
  type LandingTheme
} from "./landing-hero";
import styles from "./autonomous-teaching-assistant-landing.module.css";

export default function AutonomousTeachingAssistant() {
  const [theme, setTheme] = useState<LandingTheme>("light");
  const [bannerMounted, setBannerMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    setTheme(getPreferredTheme());
    setBannerMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);

      if (scrollY <= 0) {
        setNavVisible(true);
        lastScrollYRef.current = scrollY;
        return;
      }

      const delta = scrollY - lastScrollYRef.current;
      if (delta > 5) setNavVisible(false);
      else if (delta < -5) setNavVisible(true);
      if (Math.abs(delta) > 5) lastScrollYRef.current = scrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={`main ${styles.page}`}>
      {/* Sticky nav */}
      <header
        className={["header", isScrolled ? "scrolled" : "", !navVisible ? "hidden" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="agenfic-banner-frame-wrap">
          {bannerMounted ? (
            <iframe
              title="Agenfic Banner"
              className="agenfic-banner-frame"
              srcDoc={getNavigationBannerIframeHtml(theme)}
              scrolling="no"
            />
          ) : null}
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Autonomous Teaching Assistant</p>
          <h1 className={styles.heroHeading}>
            The knowledge base that teaches itself
          </h1>
          <p className={styles.heroSub}>
            One platform for every tutor, student, and admin in your centre.
            Sessions are recorded and distilled into structured lesson documents.
            Materials are organised by subject and class. Students get an AI
            chat that knows exactly what was taught — and when.
          </p>
          <div className={styles.heroCtas}>
            <a href="/under-construction" className={styles.ctaPrimary}>
              Request early access
            </a>
            <a href="/under-construction" className={styles.ctaSecondary}>
              See how it works
            </a>
          </div>
        </div>

        {/* Decorative grid visual */}
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.heroGrid}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className={styles.heroGridCell} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className={styles.pillars}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeading}>Three pillars of learning intelligence</h2>
          <div className={styles.pillarsGrid}>
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarBody}>{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep feature sections */}
      {FEATURES.map((feat, i) => (
        <section
          key={feat.title}
          className={[styles.featureSection, i % 2 === 1 ? styles.featureSectionAlt : ""]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles.featureInner}>
            <div className={styles.featureText}>
              <p className={styles.featureEyebrow}>{feat.eyebrow}</p>
              <h2 className={styles.featureHeading}>{feat.title}</h2>
              <p className={styles.featureBody}>{feat.body}</p>
              <ul className={styles.featureList}>
                {feat.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
            <div className={styles.featureArtwork} aria-hidden="true">
              <div className={styles.featureCard}>
                <p className={styles.featureCardLabel}>{feat.cardLabel}</p>
                <p className={styles.featureCardValue}>{feat.cardValue}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Personas */}
      <section className={styles.personas}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionHeading}>Built for everyone in your centre</h2>
          <div className={styles.personasGrid}>
            {PERSONAS.map((persona) => (
              <div key={persona.role} className={styles.personaCard}>
                <p className={styles.personaRole}>{persona.role}</p>
                <h3 className={styles.personaTitle}>{persona.title}</h3>
                <ul className={styles.personaList}>
                  {persona.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaHeading}>
            Ready to transform how your centre learns?
          </h2>
          <p className={styles.ctaSub}>
            We partner with a small number of tuition centres each quarter to
            deploy and fine-tune the assistant. Reach out to see if you qualify.
          </p>
          <div className={styles.ctaButtons}>
            <a href="/under-construction" className={styles.ctaPrimary}>
              Request early access
            </a>
            <a href="/under-construction" className={styles.ctaSecondary}>
              Contact us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Agenfic. All rights reserved.</p>
      </footer>
    </main>
  );
}

const PILLARS = [
  {
    icon: "⚡",
    title: "Session capture",
    body: "Record audio and video during class. The assistant automatically generates a structured lesson document — summary, key points, explanations, and a mini quiz — ready to review and publish."
  },
  {
    icon: "📚",
    title: "Structured knowledge base",
    body: "Organise every piece of material by subject, class, and level. Each class has its own private KB alongside a shared subject-level store accessible to all relevant students and tutors."
  },
  {
    icon: "💬",
    title: "AI chat for students",
    body: "Students chat with the KB using natural language. The assistant retrieves answers grounded in what was actually taught — including specifics from past lessons and tutor-shared files."
  }
];

const FEATURES = [
  {
    eyebrow: "Session intelligence",
    title: "Every class, automatically documented",
    body: "Record audio and visual during a session and receive a single polished document covering meeting notes, important explanations, key learnings, and a mini quiz. The tutor reviews and publishes before it goes live.",
    points: [
      "Auto-generated summary, notes, and learning checklist",
      "Mini quiz with suggested answers attached to each session",
      "Tutor edits inline before publishing to students",
      "Sessions archived chronologically in the class KB"
    ],
    cardLabel: "Avg. time to publish",
    cardValue: "4 min"
  },
  {
    eyebrow: "Knowledge architecture",
    title: "One centre, perfectly organised",
    body: "The platform mirrors how a tuition centre actually works. At the top level, tutors manage a shared subject KB. Below that, each class has its own private space containing only material relevant to that cohort.",
    points: [
      "Centre → Subject → Class hierarchy out of the box",
      "Role-based access: tutors, students, and admins",
      "Students see only the KBs they belong to",
      "Drag-and-drop material upload for tutors"
    ],
    cardLabel: "Access levels",
    cardValue: "Centre · Subject · Class"
  },
  {
    eyebrow: "Student experience",
    title: "A chat that knows your lessons",
    body: "Students ask questions in plain language. The AI answers with context pulled directly from session documents, uploaded notes, and tutor-shared files — so replies reflect what was actually taught, not generic web results.",
    points: [
      "Contextual answers grounded in your curriculum",
      "Query past lessons by date, topic, or tutor",
      "Access tutor-shared files from inside the chat",
      "Escalates unanswered questions to the tutor"
    ],
    cardLabel: "Avg. answer latency",
    cardValue: "1.6 s"
  }
];

const PERSONAS = [
  {
    role: "For tutors",
    title: "Spend more time teaching, less on admin",
    points: [
      "Session documents reduce note-taking to zero",
      "Share materials directly inside the platform",
      "See where each student is struggling before the lesson",
      "KB doubles as an admin assistant for background paperwork"
    ]
  },
  {
    role: "For students",
    title: "Every lesson, forever accessible",
    points: [
      "Revisit any past session with a structured document",
      "Chat with the KB to clarify concepts from class",
      "Ask about what your tutor said in a specific lesson",
      "Better learning experience, not just more content"
    ]
  },
  {
    role: "For tuition centres",
    title: "A product worth talking about",
    points: [
      "Students who learn better want to stay",
      "Parents recommend what they can see working",
      "Use the platform as a differentiator when pitching to new families",
      "Centre-wide analytics in a single dashboard"
    ]
  }
];
