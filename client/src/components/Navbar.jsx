import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🔐 Web Security Toolkit</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              { path: '/', label: 'Home' },
              { path: '/about', label: 'About' },
              { path: '/history', label: 'History' },
              { path: '/contact', label: 'Contact' },
            ].map((link) => (
              <li className="nav-item" key={link.path}>
                <Link
                  className={`nav-link ${location.pathname === link.path ? 'active fw-semibold' : ''}`}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/auth" className="btn btn-light me-2">Login / Signup</Link>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
