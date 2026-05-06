import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Tools } from "./pages/Tools"
import { Toaster } from 'react-hot-toast'

export const App = () => {

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/:tool" element={<Tools />} />
      </Routes>
    </div>
  )
}