import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DOAIDE_PRODUCTS = [
  { name: "Proposals", url: "https://proposals.doaide.com" },
  { name: "Scheduler", url: "https://scheduler.doaide.com" },
  { name: "Payroll", url: "https://payroll.doaide.com" },
  { name: "Inventory", url: "https://inventory.doaide.com" },
  { name: "Support", url: "https://support.doaide.com" },
  { name: "Voice", url: "https://voice.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://job.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
]

const TYPEWRITER_PHRASES = [
  "AI surfaces trends you missed",
  "Build dashboards in minutes",
  "Natural language data queries",
  "Scheduled reports on autopilot",
]

function RobotFace({ size = 32, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="1.5" r="1.5" fill={color} />
      <rect x="5" y="6" width="22" height="17" rx="5" fill={color} />
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <circle cx="11.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <circle cx="21.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="1" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
      <rect x="27" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
    </svg>
  )
}

function HeroRobot({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="120" height="100" className="landing-hero-robot" aria-hidden="true">
      <line x1="60" y1="18" x2="60" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="4" r="3" fill={color} className="landing-antenna-glow" />
      <rect x="25" y="18" width="70" height="55" rx="16" fill={color} />
      <ellipse cx="42" cy="40" rx="8" ry="10" fill="#0A0A0B" />
      <ellipse cx="78" cy="40" rx="8" ry="10" fill="#0A0A0B" />
      <circle cx="44" cy="38" r="3" fill={color} opacity="0.5" />
      <circle cx="80" cy="38" r="3" fill={color} opacity="0.5" />
      <path d="M45 60 Q60 72 75 60" stroke="#0A0A0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="5" y="30" width="16" height="18" rx="6" fill={color} opacity="0.8" />
      <rect x="99" y="30" width="16" height="18" rx="6" fill={color} opacity="0.8" />
    </svg>
  )
}

function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[index]
    let timeout
    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
    } else {
      const speed = deleting ? 30 : 60
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1))
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, phrases])

  return (
    <span className="landing-typewriter" aria-label={phrases[index]}>
      {text}
      <span className="landing-cursor" aria-hidden="true">|</span>
    </span>
  )
}

function PipelineGraphic() {
  return (
    <div className="landing-pipeline" aria-hidden="true">
      <svg viewBox="0 0 520 90" xmlns="http://www.w3.org/2000/svg">
        <line x1="78" y1="36" x2="152" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />
        <line x1="218" y1="36" x2="302" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />
        <line x1="368" y1="36" x2="442" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />

        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M78,36 L152,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M78,36 L152,36" />
        </circle>
        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path="M218,36 L302,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.2s" path="M218,36 L302,36" />
        </circle>
        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.4s" path="M368,36 L442,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.9s" path="M368,36 L442,36" />
        </circle>

        {/* Connect */}
        <circle cx="50" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M42 30v12h4l-6 6-6-6h4V30h4z" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="50" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Connect</text>

        {/* Analyze */}
        <circle cx="190" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M183 44l3-8 3 4 3-10 3 6" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="190" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Analyze</text>

        {/* Visualize */}
        <circle cx="330" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <rect x="320" y="28" width="4" height="14" rx="1" fill="#F0B429" opacity="0.6" />
        <rect x="326" y="32" width="4" height="10" rx="1" fill="#F0B429" opacity="0.8" />
        <rect x="332" y="25" width="4" height="17" rx="1" fill="#F0B429" />
        <rect x="338" y="30" width="4" height="12" rx="1" fill="#F0B429" opacity="0.7" />
        <text x="330" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Visualize</text>

        {/* Report */}
        <circle cx="470" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M462 28h16v16h-16z" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M465 33h10M465 36h7M465 39h9" stroke="#F0B429" strokeWidth="1" strokeLinecap="round" />
        <text x="470" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Report</text>
      </svg>
    </div>
  )
}

const PARTICLES = [
  { left: "8%", top: "15%", size: 3, delay: 0, dur: 18 },
  { left: "22%", top: "65%", size: 2, delay: 3, dur: 22 },
  { left: "35%", top: "30%", size: 4, delay: 7, dur: 15 },
  { left: "50%", top: "80%", size: 2, delay: 1, dur: 20 },
  { left: "65%", top: "20%", size: 3, delay: 5, dur: 17 },
  { left: "78%", top: "55%", size: 2, delay: 9, dur: 23 },
  { left: "90%", top: "35%", size: 3, delay: 2, dur: 19 },
  { left: "15%", top: "85%", size: 2, delay: 6, dur: 21 },
  { left: "42%", top: "45%", size: 3, delay: 4, dur: 16 },
  { left: "72%", top: "75%", size: 2, delay: 8, dur: 24 },
  { left: "88%", top: "10%", size: 4, delay: 10, dur: 14 },
  { left: "5%", top: "50%", size: 2, delay: 11, dur: 25 },
]

function ParticleField() {
  return (
    <div className="landing-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="landing-particle"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

const FEATURES = [
  {
    title: "Dashboard Builder",
    desc: "Drag-and-drop widgets to build custom dashboards with charts, KPIs, and tables.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    title: "Data Connectors",
    desc: "Import data from CSV files, Google Sheets, or enter manually.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "AI Insights",
    desc: "Get trend detection, anomaly alerts, and natural language queries powered by AI.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Rich Visualizations",
    desc: "Line, bar, pie, funnel charts plus data tables and KPI cards.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Report Generation",
    desc: "Export dashboards as PDF or Excel reports with one click.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
  },
  {
    title: "Scheduled Reports",
    desc: "Automate report delivery to your team on a recurring schedule.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
]

const HOW_IT_WORKS = [
  { step: "1", title: "Connect your data", desc: "Upload CSVs, link Google Sheets, or enter data manually. Your data stays in one place." },
  { step: "2", title: "Build dashboards", desc: "Drag and drop charts, KPIs, and tables to create dashboards that tell your story." },
  { step: "3", title: "Get AI insights", desc: "AI surfaces trends, anomalies, and recommendations. Ask questions in plain English." },
]

const PLANS = [
  { name: "Free", price: "$0/mo", desc: "For individuals exploring their data", features: ["3 dashboards", "Basic charts", "CSV upload", "1 user"], cta: "Get Started" },
  { name: "Pro", price: "$29/mo", desc: "For teams that need deeper insights", features: ["Unlimited dashboards", "AI insights", "Scheduled reports", "Team sharing", "PDF/Excel export", "Google Sheets connector"], cta: "Start Free Trial", featured: true },
  { name: "Enterprise", price: "Custom", desc: "For organizations at scale", features: ["Everything in Pro", "API access", "SSO/SAML", "Dedicated support", "Custom integrations", "SLA guarantee"], cta: "Contact Sales" },
]

const TESTIMONIALS = [
  { name: "Rebecca T.", role: "Marketing Director", quote: "We replaced three BI tools with DoAide Analytics. The AI insights alone pay for themselves — it surfaced a conversion drop we would have missed." },
  { name: "Pradeep K.", role: "Product Manager", quote: "Non-technical team members build their own dashboards now. No more waiting on the data team for every report." },
  { name: "Sarah L.", role: "CFO", quote: "Scheduled reports land in my inbox every Monday morning. I start the week knowing exactly where we stand financially." },
]

const FAQ_ITEMS = [
  { q: "What data sources can I connect?", a: "You can upload CSV files, connect Google Sheets, or enter data manually. Pro plans include additional connectors and API access for custom integrations." },
  { q: "How does the AI insights feature work?", a: "AI analyzes your data to detect trends, anomalies, and patterns. You can also ask questions in plain English like \"What was our top product last quarter?\" and get instant answers." },
  { q: "Can I share dashboards with my team?", a: "Yes. Pro plans include team sharing with role-based access. Share read-only views or give collaborators edit access to specific dashboards." },
  { q: "What export formats are supported?", a: "Export dashboards and reports as PDF or Excel files. Scheduled reports can be delivered via email on a daily, weekly, or monthly basis." },
  { q: "Is there a free plan?", a: "Yes. The Free plan includes 3 dashboards, basic charts, and CSV upload for 1 user. No credit card required to get started." },
  { q: "Can I use it for financial reporting?", a: "Absolutely. Many teams use DoAide Analytics for revenue dashboards, expense tracking, and financial KPIs. Export-ready reports make board presentations easy." },
]

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="landing-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="landing-section-title">Frequently Asked Questions</h2>
      <dl className="landing-faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="landing-faq-item">
            <dt>
              <button
                className="landing-faq-q"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <span className="landing-faq-chevron" aria-hidden="true">{openIndex === i ? "−" : "+"}</span>
              </button>
            </dt>
            {openIndex === i && <dd className="landing-faq-a">{item.a}</dd>}
          </div>
        ))}
      </dl>
    </section>
  )
}

export default function Landing() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const vis = visible ? "landing-visible" : ""

  return (
    <div className="landing-root">
      <ParticleField />

      <header className={`landing-header ${vis}`}>
        <a href="https://doaide.com" className="landing-brand">
          <RobotFace size={28} color="#F0B429" />
          <span className="landing-brand-text">
            DoAide <em>Analytics</em>
          </span>
        </a>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/pricing" style={{ color: "var(--ink-soft)", fontSize: "14px", textDecoration: "none" }}>Pricing</Link>
          <Link to="/login" className="btn btn-ghost" style={{ fontSize: "14px", padding: "6px 14px" }}>Sign In</Link>
          <Link to="/register" className="btn btn-primary" style={{ fontSize: "14px", padding: "6px 14px" }}>Get Started</Link>
        </div>
      </header>

      <main>
        <section className={`landing-hero ${vis}`}>
          <div className="landing-hero-robot-wrap">
            <HeroRobot color="#F0B429" />
          </div>
          <h1 className="landing-headline">AI-Powered Analytics for Growing Businesses</h1>
          <p className="landing-subtitle">
            Build beautiful dashboards, uncover trends with AI, and share insights
            with your team. Enterprise-grade analytics without the complexity.
          </p>
          <div className="landing-typewriter-wrap">
            <Typewriter phrases={TYPEWRITER_PHRASES} />
          </div>
          <PipelineGraphic />
          <div className="landing-hero-ctas">
            <Link to="/register" className="btn btn-primary" style={{ textDecoration: "none" }}>Start Free</Link>
            <Link to="/pricing" className="btn btn-ghost" style={{ textDecoration: "none" }}>View Pricing</Link>
          </div>
        </section>

        <section className="landing-section" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="landing-section-title">Free Tools — No Login Required</h2>
          <div className="landing-features-grid">
            <Link to="/calculator" className="landing-feature-card" style={{ textDecoration: "none" }}>
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="10" y2="10" /><line x1="14" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="10" y2="14" /><line x1="14" y1="14" x2="16" y2="14" />
                  <line x1="8" y1="18" x2="16" y2="18" />
                </svg>
              </div>
              <h3>ROI Calculator</h3>
              <p>See the ROI of better analytics for your business.</p>
            </Link>
            <Link to="/templates" className="landing-feature-card" style={{ textDecoration: "none" }}>
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3>Dashboard Templates</h3>
              <p>Ready-to-use templates for common use cases.</p>
            </Link>
            <Link to="/embed" className="landing-feature-card" style={{ textDecoration: "none" }}>
              <div className="landing-feature-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3>Embed Widget</h3>
              <p>Add charts to your website with one snippet.</p>
            </Link>
          </div>
        </section>

        <section className="landing-section" aria-labelledby="features-heading">
          <h2 id="features-heading" className="landing-section-title">Everything You Need to Understand Your Business</h2>
          <div className="landing-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature-card">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="how-heading">
          <h2 id="how-heading" className="landing-section-title">How It Works</h2>
          <div className="landing-steps">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="landing-step">
                <div className="landing-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-pricing" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="landing-section-title">Simple, Transparent Pricing</h2>
          <p style={{ color: "var(--ink-soft)", textAlign: "center", marginBottom: "40px" }}>Start free. Upgrade when you need more.</p>
          <div className="landing-pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`landing-pricing-card ${plan.featured ? "landing-pricing-card-highlight" : ""}`}>
                {plan.featured && <span className="landing-pricing-badge">Most Popular</span>}
                <h3>{plan.name}</h3>
                <p className="landing-pricing-desc">{plan.desc}</p>
                <div className="landing-pricing-price">{plan.price}</div>
                <ul className="landing-pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link to="/register" className={`btn ${plan.featured ? "btn-primary" : "btn-ghost"}`} style={{ textDecoration: "none", textAlign: "center", display: "block" }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="landing-section-title">Trusted by Data-Driven Teams</h2>
          <div className="landing-testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="landing-testimonial">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <FaqSection />

        <section className="landing-cta">
          <h2>Ready to Unlock Your Data?</h2>
          <p>Start building dashboards today. Free forever for up to 3 dashboards.</p>
          <Link to="/register" className="btn btn-primary landing-cta-btn" style={{ textDecoration: "none" }}>
            Get Started Free
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-nav">
          <div className="landing-footer-col">
            <h4>Product</h4>
            <Link to="/pricing">Pricing</Link>
            <a href="#features-heading" onClick={(e) => { e.preventDefault(); document.getElementById("features-heading")?.scrollIntoView({ behavior: "smooth" }) }}>Features</a>
            <a href="#faq-heading" onClick={(e) => { e.preventDefault(); document.getElementById("faq-heading")?.scrollIntoView({ behavior: "smooth" }) }}>FAQ</a>
          </div>
          <div className="landing-footer-col">
            <h4>Free Tools</h4>
            <Link to="/calculator">ROI Calculator</Link>
            <Link to="/templates">Dashboard Templates</Link>
            <Link to="/embed">Embed Widget</Link>
          </div>
          <div className="landing-footer-col">
            <h4>Resources</h4>
            <Link to="/blog">Blog</Link>
            <a href="#how-heading" onClick={(e) => { e.preventDefault(); document.getElementById("how-heading")?.scrollIntoView({ behavior: "smooth" }) }}>How It Works</a>
          </div>
          <div className="landing-footer-col">
            <h4>Company</h4>
            <a href="https://doaide.com">About DoAide</a>
            <a href="mailto:support@doaide.com">Contact</a>
          </div>
        </div>
        <div className="landing-footer-products">
          {DOAIDE_PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} className="landing-footer-link">
              {p.name}
            </a>
          ))}
        </div>
        <div className="landing-footer-bottom">
          <a href="https://doaide.com" className="landing-footer-home">
            <RobotFace size={16} color="#F0B429" />
            doaide.com
          </a>
          <span className="landing-footer-copy">&copy; {new Date().getFullYear()} DoAide. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
