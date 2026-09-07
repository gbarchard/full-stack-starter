import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Alert, Button, Spinner } from 'flowbite-react'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { env } from '../env'
import { auth } from '../utils/firebase'

export default function Login() {
  useExistingSession()
  const { errorMessage, loading, onGoogleLogin } = useGoogleLogin()
  return (
    <section className="mx-auto my-auto w-full max-w-sm">
      <div className="space-y-4 rounded-4xl bg-gray-300 p-4 dark:bg-gray-800">
        <h1 className="text-center text-xl">Full Stack Starter</h1>
        <Button
          disabled={loading}
          onClick={onGoogleLogin}
          pill
          className="w-full"
        >
          {loading ? <Spinner /> : 'Log In'}
        </Button>
      </div>
      {errorMessage && (
        <Alert color="red" className="mt-4">
          {errorMessage}
        </Alert>
      )}
    </section>
  )
}

function useExistingSession() {
  const navigate = useNavigate()

  return useEffect(() => {
    const findSession = async () => {
      await auth.authStateReady()
      const user = auth.currentUser
      if (user) {
        navigate('/home')
      }
    }

    findSession()
  }, [navigate])
}

function useGoogleLogin() {
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onGoogleLogin = useCallback(async () => {
    setLoading(true)
    try {
      const googleProvider = new GoogleAuthProvider()
      const res = await signInWithPopup(auth, googleProvider)
      const token = await res.user.getIdToken()
      const createUserRes = await createUserIfNecessary(token)

      if (createUserRes.status !== 200) {
        const errorMessage = await createUserRes.text()
        setErrorMessage(errorMessage)
        return
      }

      navigate('/home')
    } catch (e) {
      const errorMessage = getErrorMessage(e)
      setErrorMessage(errorMessage)
    }
    setLoading(false)
  }, [navigate])

  return { loading, onGoogleLogin, errorMessage }
}

async function createUserIfNecessary(token: string) {
  const createUserResponse = await fetch(
    `${env.SERVER_URL}/create-user-if-necessary`,
    {
      method: 'POST',
      headers: { authorization: token },
    },
  )

  return createUserResponse
}

function getErrorMessage(e: unknown) {
  if (!(e instanceof Error)) return ''

  if (e instanceof FirebaseError && e.code === 'auth/popup-closed-by-user') {
    return ''
  }

  return e.message
}
