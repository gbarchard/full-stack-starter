import { Button } from "flowbite-react"
import { useCallback } from "react"
import { useNavigate } from "react-router"

export default function Home() {
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "same-origin",
    })
    navigate("/")
  }, [navigate])

  const getUser = useCallback(() => {
    fetch("http://localhost:3000/api/user", { credentials: "include" })
  }, [])

  return (
    <>
      <Button onClick={logout}>Log Out</Button>
      <Button onClick={getUser}>Get the user</Button>
    </>
  )
}
