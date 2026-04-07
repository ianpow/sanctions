import { Routes, Route, NavLink } from 'react-router-dom'
import LearnPage from './pages/LearnPage'
import GlobePage from './pages/GlobePage'
import QuizPage from './pages/QuizPage'

function Nav() {
  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">
          <span className="nav-logo-icon">🛡</span>
          Sanctions Explorer
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Learn
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Quiz
          </NavLink>
          <NavLink to="/globe" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Globe
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="app-container">
      <Nav />
      <Routes>
        <Route path="/" element={<LearnPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/globe" element={<GlobePage />} />
      </Routes>
    </div>
  )
}
