import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
