import { Button } from 'flowbite-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../utils/firebase'

export default function Home() {
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    await auth.signOut()
    navigate('/')
  }, [navigate])

  const getUser = useCallback(async () => {
    const token = await auth.currentUser?.getIdToken()
    if (!token) return
    fetch('http://localhost:3000/user', {
      credentials: 'include',
      headers: {
        authorization: token,
      },
    })
  }, [])

  return (
    <>
      <Button onClick={logout}>Log Out</Button>
      <Button onClick={getUser}>Get the user</Button>
    </>
  )
}
