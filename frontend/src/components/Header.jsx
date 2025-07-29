import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PropFinder</span>
      </div>
      <nav className="header__nav">
        <a href="/">Inicio</a>
        <a href="/agentes">Agentes</a>
        <a href="/publicar">Publicar</a>
        <a href="/login">Ingresar</a>
      </nav>
      <div className="header__search">
        <input type="text" placeholder="Buscar propiedades..." />
        <button>Buscar</button>
      </div>
    </header>
  );
};

export default Header;
