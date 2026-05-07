import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // We will connect this to the actual API later, for now we mock it
    // or test if the gateway route works once backend is up
    fetch('/api/users/')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching users:', err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <header className="hero-gradient">
        <div className="container">
          <h1>Paws & Protect</h1>
          <p className="subtitle">
            Premium, transparent, and fast pet insurance. Because your furry family deserves the best care without the hassle.
          </p>
          <button className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            Get a Quote
          </button>
        </div>
      </header>

      <main className="container">
        <section className="grid">
          <div className="card">
            <h3>Lightning Fast Claims</h3>
            <p>Our claims microservice ensures your vet bills are processed and reimbursed in record time. No more waiting.</p>
          </div>
          <div className="card">
            <h3>Flexible Policies</h3>
            <p>Tailor your coverage to exactly what your pet needs. From accident-only to comprehensive wellness plans.</p>
          </div>
          <div className="card">
            <h3>Microservice Architecture</h3>
            <p>Built with React, FastAPI, and Postgres. Fast, reliable, and scalable modern web architecture.</p>
          </div>
        </section>
        
        {/* Placeholder for API Integration testing */}
        <section className="card" style={{ marginTop: '2rem' }}>
          <h3>API Status Check (Users Service)</h3>
          {loading ? (
            <p>Connecting to backend...</p>
          ) : users.length > 0 ? (
            <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
              {JSON.stringify(users, null, 2)}
            </pre>
          ) : (
            <p style={{ color: '#ef4444' }}>Could not connect to /api/users/ - backend might be down or not created yet.</p>
          )}
        </section>
      </main>
    </>
  )
}

export default App
