import './App.css';
import { useState } from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<PrivateRoute component={Home} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
}

function Home() {
  return <h1>Página de inicio</h1>;
}

export default App;
