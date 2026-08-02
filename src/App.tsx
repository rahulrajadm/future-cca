import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { AppStateProvider } from './state/AppState'
import { Home } from './pages/Home'
import { ExamMode } from './pages/ExamMode'
import { DomainPractice } from './pages/DomainPractice'
import { ScenarioPractice } from './pages/ScenarioPractice'
import { CustomPractice } from './pages/CustomPractice'
import { ReviewMode } from './pages/ReviewMode'
import { Session } from './pages/Session'
import { Results } from './pages/Results'
import { About } from './pages/About'
import './App.css'

function App() {
  return (
    <AppStateProvider>
      <HashRouter>
        <header className="app-header">
          <Link to="/" className="app-header__brand">
            CCAR-F Practice
          </Link>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam" element={<ExamMode />} />
            <Route path="/domain" element={<DomainPractice />} />
            <Route path="/scenario" element={<ScenarioPractice />} />
            <Route path="/custom" element={<CustomPractice />} />
            <Route path="/review" element={<ReviewMode />} />
            <Route path="/session" element={<Session />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </HashRouter>
    </AppStateProvider>
  )
}

export default App
