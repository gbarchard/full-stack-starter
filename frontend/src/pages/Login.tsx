import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from 'flowbite-react'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../utils/firebase'

export default function Login() {
  useExistingSession()
  const onGoogleLogin = useGoogleLogin()
  return (
    <section className="w-full max-w-sm p-4 mx-auto my-auto bg-gray-300 space-y-4 rounded-4xl dark:bg-gray-800">
      <h1 className="text-xl text-center">Full Stack Starter</h1>
      <Button onClick={onGoogleLogin} pill className="w-full">
        Log In
      </Button>
    </section>
  )
}

function useExistingSession() {
  const navigate = useNavigate()

  const findSession = useCallback(async () => {
    auth.onAuthStateChanged(async (user) => {
      const token = await user?.getIdToken()
      if (token) {
        return navigate('/home')
      }
    })
  }, [navigate])

  return useEffect(() => {
    findSession()
  }, [findSession])
}

function useGoogleLogin() {
  const navigate = useNavigate()

  return useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, googleProvider)
    const token = await res.user.getIdToken()
    const success = await createUserIfNecessary(token)
    if (success) {
      navigate('/home')
    }
  }, [navigate])
}

async function createUserIfNecessary(token: string) {
  const createUserResponse = await fetch(
    'http://localhost:3000/create-user-if-necessary',
    {
      method: 'POST',
      headers: { authorization: token },
    },
  )
  return createUserResponse.status === 200
}
