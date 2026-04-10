import { useState, useEffect } from 'react'
import { Navbar, NavbarNavId } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { ContactUs } from './pages/ContactUs'

export default function App() {
  const [activePage, setActivePage] = useState<NavbarNavId>('home')

  // Simple hash-based routing to show both pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'contact') setActivePage('contact')
      else setActivePage('home')
    }
    window.addEventListener('hashchange', handleHash)
    handleHash()
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-brand-surface">
      <Navbar activeItem={activePage} isLoggedIn={true} />
      
      <main className="flex-1">
        {activePage === 'contact' ? <ContactUs /> : <Home />}
      </main>

      <Footer />
    </div>
  )
}
