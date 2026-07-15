import { Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import { ErrorBoundary } from './components/ErrorBoundary'
import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { Apollo } from './utils/apollo'
import { auth } from './utils/firebase'

export default function App() {
  return (
    <ErrorBoundary>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route element={<AuthenticatedApp />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

function AuthenticatedApp() {
  const { isLoading, token } = useAuth()

  if (isLoading)
    return (
      <div className="mx-auto my-auto">
        <Spinner />
      </div>
    )
  if (!token) return <Navigate to="/" />

  return (
    <Apollo token={token}>
      <NavBar />
      <Outlet />
    </Apollo>
  )
}

function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      const t = await user?.getIdToken()

      setToken(t!)
      setIsLoading(false)
    })
  }, [])

  return {
    token,
    isLoading,
  }
}
