import { Button } from "flowbite-react"
import { useCallback, useEffect } from "react"

export default function App() {
  const request = useCallback(async () => {
    const res = await fetch("http://localhost:3000")
    const text = await res.text()
    console.log(text)
  }, [])
  useEffect(() => {
    request()
  }, [request])

  return <Button color="default">Yo</Button>
}
