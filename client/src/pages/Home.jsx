import React from 'react';
import FileScanner from '../components/FileScanner';

function Home() {
  return (
    <div className="container py-5 text-center">
      <h1 className="text-primary fw-bold mb-4">Web Security Toolkit</h1>

      <p className="text-secondary mb-4">
        Quickly scan uploaded files or hashes for malicious content using the trusted VirusTotal API. 
        Download styled PDF reports and manage your scans securely.
      </p>

      {/* Show the FileScanner tool directly here */}
      <FileScanner />
    </div>
  );
}

export default Home;
