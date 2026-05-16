import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AdminLink from './AdminLink'
import AdSlot from './AdSlot'
import { trackVisit, trackToolVisit } from '../engine/visitTracker'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const location = useLocation()
  const { isAdmin } = useAuth()

  useEffect(() => {
    trackVisit()
  }, [])

  useEffect(() => {
    const path = location.pathname.replace('/', '')
    if (path && path !== 'admin' && !path.startsWith('admin/')) {
      trackToolVisit(path)
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        {location.pathname === '/' && <AdSlot position="top" />}
        <Outlet />
      </main>
      <Footer />
      {!isAdmin && <AdminLink />}
    </div>
  )
}
