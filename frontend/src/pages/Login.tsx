import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Button } from 'flowbite-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../utils/firebase'

export default function Login() {
  const navigate = useNavigate()

  const onGoogleLogin = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()
    await signInWithPopup(auth, googleProvider)
    navigate('/home')
  }, [navigate])

  return (
    <section className="mx-auto my-auto w-full max-w-sm space-y-4 rounded-4xl bg-gray-300 p-4 dark:bg-gray-800">
      <h1 className="text-center text-xl">Full Stack Starter</h1>
      <Button onClick={onGoogleLogin} pill className="w-full">
        Log In
      </Button>
    </section>
  )
}
