import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [signupCount, setSignupCount] = useState(0)

  useEffect(() => {
    const signups: string[] = JSON.parse(localStorage.getItem('vrolympics_signups') || '[]')
    setSignupCount(signups.length)
  }, [])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    const signups: string[] = JSON.parse(localStorage.getItem('vrolympics_signups') || '[]')
    if (!signups.includes(email.trim().toLowerCase())) {
      signups.push(email.trim().toLowerCase())
      localStorage.setItem('vrolympics_signups', JSON.stringify(signups))
      setSignupCount(signups.length)
    }
    setEmail('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="landing">
      {/* Hero + Signup */}
      <section className="hero">
        <div className="hero-badge">🏅 Early Access</div>
        <h1 className="hero-title">
          Step Into the Arena.<br />
          <span className="gradient-text">Compete in VR.</span>
        </h1>
        <p className="hero-subtitle">
          The world's first VR sports competition platform. Train, compete, and climb the global leaderboard — all from your living room.
        </p>

        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-btn">
            {submitted ? '✓ You\'re In!' : 'Get Early Access'}
          </button>
        </form>

        {submitted && (
          <p className="signup-confirm">Welcome to the arena 🎮</p>
        )}

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">{signupCount}</span>
            <span className="stat-label">Signed Up</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">2026</span>
            <span className="stat-label">Launch Year</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">∞</span>
            <span className="stat-label">Possibilities</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2 className="section-title">Why VROlympics?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Competitive VR Sports</h3>
            <p>Real-time multiplayer competitions across a growing lineup of VR sports disciplines.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Global Leaderboards</h3>
            <p>Track your progress, climb the ranks, and see how you stack up against players worldwide.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏋️</div>
            <h3>Train & Improve</h3>
            <p>Practice modes, skill challenges, and analytics to sharpen your game before competition day.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Community First</h3>
            <p>Join teams, form rivalries, and connect with a global community of VR athletes.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your athlete profile and pick your sports.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Train</h3>
            <p>Practice in solo or multiplayer training sessions.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Compete</h3>
            <p>Enter tournaments and climb the global leaderboard.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2026 VROlympics. Built for the next generation of athletes.</p>
      </footer>
    </div>
  )
}

export default App
