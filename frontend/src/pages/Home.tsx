import { Button } from 'flowbite-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../utils/firebase'
import { useUserLazyQuery } from './home.generated'

export default function Home() {
  const navigate = useNavigate()
  const [userLazyQuery] = useUserLazyQuery()

  const logout = useCallback(async () => {
    await auth.signOut()
    navigate('/')
  }, [navigate])

  const getUser = useCallback(async () => {
    const { data } = await userLazyQuery()
    console.log(data)
  }, [userLazyQuery])

  return (
    <>
      <Button onClick={logout}>Log Out</Button>
      <Button onClick={getUser}>Get User</Button>
    </>
  )
}
