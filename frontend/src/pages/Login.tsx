import { Button } from 'flowbite-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
  const navigate = useNavigate()

  // shouldn't work because not logged in
  const getUser = useCallback(() => {
    fetch('http://localhost:3000/api/user', { credentials: 'include' })
  }, [])

  return (
    <>
      <Button onClick={() => navigate('http://localhost:3000/api/auth/google')}>
        Log In
      </Button>
      <Button onClick={getUser}>Click me</Button>
    </>
  )
}
