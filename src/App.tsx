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
    <div className="page">
      {/* Hero */}
      <section className="hero">
        <p className="hero-label">VROlympics</p>
        <h1 className="hero-headline">
          Step Into the Arena.
        </h1>
        <p className="hero-subheadline">
          The world's first VR sports competition platform.
          <br />
          Train. Compete. Rise.
        </p>
      </section>

      {/* Signup */}
      <section className="signup-section">
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
            {submitted ? '✓ You\'re In' : 'Get Early Access'}
          </button>
        </form>
        {submitted && (
          <p className="signup-confirm">Welcome to the arena.</p>
        )}
        {signupCount > 0 && !submitted && (
          <p className="signup-count">{signupCount} {signupCount === 1 ? 'person has' : 'people have'} signed up</p>
        )}
      </section>

      {/* Info */}
      <section className="info-section">
        <div className="info-block">
          <h2 className="info-headline">Compete in VR sports with players worldwide.</h2>
          <p className="info-body">
            VROlympics brings real-time multiplayer competition to virtual reality. 
            Whether it's boxing, archery, or table tennis — step into the arena 
            and prove yourself on the global leaderboard. No travel required. 
            Just you, your headset, and the will to win.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Global Leaderboards</h3>
            <p>Track your rank across every sport. See where you stand against the world.</p>
          </div>
          <div className="info-card">
            <h3>Live Tournaments</h3>
            <p>Scheduled competitions with real stakes. Enter solo or with a team.</p>
          </div>
          <div className="info-card">
            <h3>Train & Improve</h3>
            <p>Practice modes and skill analytics to sharpen your game before match day.</p>
          </div>
          <div className="info-card">
            <h3>Community</h3>
            <p>Join teams, form rivalries, and connect with VR athletes everywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 VROlympics</p>
      </footer>
    </div>
  )
}

export default App
