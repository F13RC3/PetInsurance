import { useState, useEffect } from 'react'

function App() {
  const [view, setView] = useState('home') // home, login, register, dashboard
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  
  // Forms state
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [quoteForm, setQuoteForm] = useState({ pet_age: 1, pet_breed: 'Dog', plan_type: 'Comprehensive' })
  const [claimForm, setClaimForm] = useState({ policy_id: '', amount: '' })
  
  // Results
  const [premiumQuote, setPremiumQuote] = useState(null)
  const [claims, setClaims] = useState([])

  useEffect(() => {
    if (token) {
      fetch('/api/users/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setUser(data)
          setView('dashboard')
        } else {
          setToken(null)
          localStorage.removeItem('token')
        }
      })
    }
  }, [token])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const formData = new URLSearchParams()
    formData.append('username', authForm.email)
    formData.append('password', authForm.password)

    try {
      const res = await fetch('/api/users/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setToken(data.access_token)
        localStorage.setItem('token', data.access_token)
      } else {
        setError(data.detail || 'Login failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authForm)
      })
      const data = await res.json()
      if (res.ok) {
        // Auto login
        handleLogin(e)
      } else {
        setError(data.detail || 'Registration failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const handleQuote = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/policies/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet_age: parseInt(quoteForm.pet_age),
          pet_breed: quoteForm.pet_breed,
          plan_type: quoteForm.plan_type
        })
      })
      const data = await res.json()
      if (res.ok) {
        setPremiumQuote(data.premium)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleClaim = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/claims/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          policy_id: parseInt(claimForm.policy_id),
          amount: parseFloat(claimForm.amount)
        })
      })
      const data = await res.json()
      if (res.ok) {
        alert('Claim submitted successfully!')
        setClaimForm({ policy_id: '', amount: '' })
      } else {
        setError(data.detail || 'Claim failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    setView('home')
  }

  return (
    <>
      <nav style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ cursor: 'pointer' }} onClick={() => setView(token ? 'dashboard' : 'home')}>Paws & Protect</h2>
        <div>
          {token ? (
            <button className="btn btn-primary" onClick={logout}>Logout</button>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn" style={{ background: 'transparent', color: 'var(--text-main)' }} onClick={() => setView('login')}>Login</button>
              <button className="btn btn-primary" onClick={() => setView('register')}>Register</button>
            </div>
          )}
        </div>
      </nav>

      {view === 'home' && (
        <header className="hero-gradient">
          <div className="container">
            <h1>Premium Pet Insurance</h1>
            <p className="subtitle">Secure your furry family's future instantly with our microservice-powered platform.</p>
            <button className="btn btn-primary" onClick={() => setView('register')}>Get Started</button>
          </div>
        </header>
      )}

      {(view === 'login' || view === 'register') && (
        <main className="container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
          <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
            <h3>{view === 'login' ? 'Login' : 'Register'}</h3>
            {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={view === 'login' ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {view === 'register' && (
                <input 
                  type="text" placeholder="Full Name" required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                  onChange={e => setAuthForm({...authForm, name: e.target.value})}
                />
              )}
              <input 
                type="email" placeholder="Email Address" required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                onChange={e => setAuthForm({...authForm, email: e.target.value})}
              />
              <input 
                type="password" placeholder="Password" required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                onChange={e => setAuthForm({...authForm, password: e.target.value})}
              />
              <button className="btn btn-primary" type="submit">{view === 'login' ? 'Login' : 'Create Account'}</button>
            </form>
          </div>
        </main>
      )}

      {view === 'dashboard' && user && (
        <main className="container" style={{ paddingTop: '2rem' }}>
          <h2>Welcome, {user.name}</h2>
          
          <div className="grid">
            <div className="card">
              <h3>Get a Quote</h3>
              <form onSubmit={handleQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input type="number" placeholder="Pet Age (Years)" min="0" required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                  value={quoteForm.pet_age} onChange={e => setQuoteForm({...quoteForm, pet_age: e.target.value})}
                />
                <select 
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                  value={quoteForm.plan_type} onChange={e => setQuoteForm({...quoteForm, plan_type: e.target.value})}>
                  <option>Comprehensive</option>
                  <option>Accident Only</option>
                </select>
                <button className="btn btn-primary" type="submit">Calculate Premium</button>
              </form>
              {premiumQuote !== null && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
                  <strong>Estimated Premium:</strong> ${premiumQuote} / month
                </div>
              )}
            </div>

            <div className="card">
              <h3>Submit a Claim</h3>
              {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
              <form onSubmit={handleClaim} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input type="number" placeholder="Policy ID" required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                  value={claimForm.policy_id} onChange={e => setClaimForm({...claimForm, policy_id: e.target.value})}
                />
                <input type="number" step="0.01" placeholder="Claim Amount ($)" required
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-color)', color: 'white' }}
                  value={claimForm.amount} onChange={e => setClaimForm({...claimForm, amount: e.target.value})}
                />
                <button className="btn btn-primary" type="submit" style={{ background: '#f59e0b', boxShadow: 'none' }}>File Claim</button>
              </form>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default App
