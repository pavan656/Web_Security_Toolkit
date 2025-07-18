import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-1">© 2025 Web Security Toolkit. All rights reserved.</p>
        <p className="mb-1">
          📧 <a href="" className="text-white">pavan.s.diwakar@gmail.com</a>
          {' '}|{' '}
          🔗 <a href="https://www.linkedin.com/in/pavan-s-diwakar-7b6930315/" target="_blank" rel="noreferrer" className="text-white text-decoration-underline">LinkedIn</a>
        </p>
        <p className="small text-muted">Built for security-conscious developers and professionals.</p>
      </div>
    </footer>
  );
}

export default Footer;
