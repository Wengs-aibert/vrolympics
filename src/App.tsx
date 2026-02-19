import { useState, useEffect, useRef } from 'react'
import './App.css'

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [signupCount, setSignupCount] = useState(0)

  const infoBlock = useScrollReveal()
  const card0 = useScrollReveal()
  const card1 = useScrollReveal()
  const card2 = useScrollReveal()
  const card3 = useScrollReveal()

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
        <p className="hero-label fade-up fade-up-1">VROlympics</p>
        <h1 className="hero-headline fade-up fade-up-2">
          Step Into the Arena.
        </h1>
        <p className="hero-subheadline fade-up fade-up-3">
          The world's first VR sports competition platform.
          <br />
          Train. Compete. Rise.
        </p>
      </section>

      {/* Signup */}
      <section className="signup-section fade-up fade-up-4">
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
        <div ref={infoBlock.ref} className={`info-block slide-right ${infoBlock.visible ? 'visible' : ''}`}>
          <h2 className="info-headline">Compete in VR sports with players worldwide.</h2>
          <p className="info-body">
            VROlympics brings real-time multiplayer competition to virtual reality. 
            Whether it's boxing, archery, or table tennis — step into the arena 
            and prove yourself on the global leaderboard. No travel required. 
            Just you, your headset, and the will to win.
          </p>
        </div>

        <div className="info-grid">
          <div ref={card0.ref} className={`info-card slide-right ${card0.visible ? 'visible' : ''}`} style={{ transitionDelay: '0ms' }}>
            <h3>Global Leaderboards</h3>
            <p>Track your rank across every sport. See where you stand against the world.</p>
          </div>
          <div ref={card1.ref} className={`info-card slide-right ${card1.visible ? 'visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            <h3>Live Tournaments</h3>
            <p>Scheduled competitions with real stakes. Enter solo or with a team.</p>
          </div>
          <div ref={card2.ref} className={`info-card slide-right ${card2.visible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            <h3>Train & Improve</h3>
            <p>Practice modes and skill analytics to sharpen your game before match day.</p>
          </div>
          <div ref={card3.ref} className={`info-card slide-right ${card3.visible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
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
