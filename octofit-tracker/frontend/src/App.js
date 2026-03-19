import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octoFitLogo from './logo.svg';
import './App.css';

function Home() {
  return (
    <div className="octofit-hero text-center">
      <img src={octoFitLogo} alt="OctoFit" className="octofit-logo mb-4" />
      <h1>OctoFit Tracker</h1>
      <p className="lead mb-4">Track your fitness activities, compete with teams, and climb the leaderboard!</p>
      <div className="row justify-content-center g-3 mt-2">
        {[
          { icon: '🏃', title: 'Activities', desc: 'Log and track workouts', path: '/activities' },
          { icon: '🏆', title: 'Leaderboard', desc: 'See who leads the pack', path: '/leaderboard' },
          { icon: '👥', title: 'Teams', desc: 'Compete as a team', path: '/teams' },
          { icon: '👤', title: 'Users', desc: 'Meet the heroes', path: '/users' },
          { icon: '💪', title: 'Workouts', desc: 'Personalized plans', path: '/workouts' },
        ].map(item => (
          <div className="col-6 col-md-4 col-lg-2" key={item.title}>
            <NavLink to={item.path} className="text-decoration-none">
              <div className="feature-card card text-center p-3">
                <div className="feature-icon">{item.icon}</div>
                <div className="fw-bold text-dark">{item.title}</div>
                <small className="text-muted">{item.desc}</small>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={octoFitLogo} alt="OctoFit" height="28" className="me-2" />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler border-secondary"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-1">
              {[
                { label: '👤 Users', path: '/users' },
                { label: '👥 Teams', path: '/teams' },
                { label: '🏃 Activities', path: '/activities' },
                { label: '🏆 Leaderboard', path: '/leaderboard' },
                { label: '💪 Workouts', path: '/workouts' },
              ].map(item => (
                <li className="nav-item" key={item.path}>
                  <NavLink className="nav-link" to={item.path}>{item.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container octofit-content mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

