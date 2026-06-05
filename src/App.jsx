import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const CollectionPage = lazy(() => import('./pages/CollectionPage'))

const App = () => {
  return (
    <div className="page-shell">
      <Navbar />
      <Suspense fallback={<div className="page-loading">Loading</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="bottom-right"
        autoClose={2400}
        hideProgressBar
        newestOnTop
        closeButton={false}
        style={{ background: 'transparent', padding: 0 }}
      />
    </div>
  )
}

export default App
