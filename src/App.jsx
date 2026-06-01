import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Guide from './pages/Guide'
import SubPage from './pages/SubPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/guide/:slug" element={<SubPage />} />
      </Routes>
      <Footer />
    </>
  )
}
