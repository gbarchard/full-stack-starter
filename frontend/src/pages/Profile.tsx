import { Button } from 'flowbite-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../utils/firebase'

export default function Profile() {
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    await auth.signOut()
    navigate('/')
  }, [navigate])

  return <Button onClick={logout}>Logout</Button>
}
