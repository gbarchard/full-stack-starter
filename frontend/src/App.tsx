import { Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import { Apollo } from './utils/apollo'
import { auth } from './utils/firebase'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route element={<AuthenticatedApp />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function AuthenticatedApp() {
  const { isLoading, token } = useAuth()

  if (isLoading) return <Spinner />
  if (!token) return <Navigate to="/" />

  return (
    <Apollo token={token}>
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
