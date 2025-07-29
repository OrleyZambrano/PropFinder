import React from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import logo from './assets/logo.png';
import './App.css';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFF8F0' }}>
      <Header />
      <main style={{ flex: 1, width: '100vw', margin: 0, padding: '2rem 0', background: '#fff', boxSizing: 'border-box', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Home />
      </main>
      <footer style={{ background: '#90A4AE', color: '#fff', textAlign: 'center', padding: '1rem 0', marginTop: 'auto', boxShadow: '0 -2px 8px rgba(0,0,0,0.05)' }}>
        © {new Date().getFullYear()} PropFinder. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
