import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Guide from './pages/Guide'
import SubPage from './pages/SubPage'
import PillarPage from './pages/PillarPage'
import ToolPage from './pages/ToolPage'
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
        <Route path="/pillars/:slug" element={<PillarPage />} />
        <Route path="/tools/:slug" element={<ToolPage />} />
      </Routes>
      <Footer />
    </>
  )
}

