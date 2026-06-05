import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const CollectionPage = lazy(() => import('./pages/CollectionPage'))

const App = () => {
  return (
    <div className="page-shell min-h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="ambient-layer" aria-hidden="true">
        <div className="ambient-orb ambient-orb--primary" />
        <div className="ambient-orb ambient-orb--secondary" />
      </div>
      <div className="ambient-grain" aria-hidden="true" />

      <Navbar />
      <Suspense fallback={<div className="page-container py-20 text-center text-sm text-[var(--text-secondary)]">Loading content…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={2200}
        hideProgressBar
        newestOnTop
        closeButton={false}
        style={{ background: 'transparent', padding: 0 }}
        toastStyle={{
          background: 'linear-gradient(135deg, #0c0c0c 0%, #141414 100%)',
          color: '#fafafa',
          borderRadius: '14px',
          padding: '14px 20px',
          fontFamily: 'var(--font-primary)',
          fontSize: '13px',
          fontWeight: '500',
          letterSpacing: '-0.01em',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
          border: '1px solid rgba(232, 96, 46, 0.15)',
        }}
      />
    </div>
  )
}

export default App
