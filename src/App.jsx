import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cases from './pages/Cases'
import CaseDetail from './pages/CaseDetail'
import Bills from './pages/Bills'
import BillDetail from './pages/BillDetail'
import About from './pages/About'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminCases from './pages/admin/AdminCases'
import AdminBills from './pages/admin/AdminBills'

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <Home />
              </PublicLayout>
            }
          />
          <Route
            path="/cases"
            element={
              <PublicLayout>
                <Cases />
              </PublicLayout>
            }
          />
          <Route
            path="/cases/:id"
            element={
              <PublicLayout>
                <CaseDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/bills"
            element={
              <PublicLayout>
                <Bills />
              </PublicLayout>
            }
          />
          <Route
            path="/bills/:id"
            element={
              <PublicLayout>
                <BillDetail />
              </PublicLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PublicLayout>
                <About />
              </PublicLayout>
            }
          />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="cases" element={<AdminCases />} />
            <Route path="bills" element={<AdminBills />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
