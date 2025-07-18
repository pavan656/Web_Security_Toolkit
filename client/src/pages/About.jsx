import React from 'react';

function About() {
  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">🔍 About Web Security Toolkit</h2>
      <p className="lead text-muted about-description">
        This project is built to help users detect and analyze malicious files using the powerful VirusTotal API.
        Users can scan files or paste known hashes to check threat results. If logged in, their previous scan reports
        are stored and viewable.
      </p>
      <ul className="list-group mt-4">
        <li className="list-group-item">✅ Built with React and Bootstrap</li>
        <li className="list-group-item">✅ Uses VirusTotal API for malware scanning</li>
        <li className="list-group-item">✅ PDF report generation with scan details</li>
        <li className="list-group-item">✅ Secure and clean UI for ease of use</li>
      </ul>
      <br />
      <p className="lead text-muted about-description">
       <b> Note : </b>You may have to Upload the file to VirusTotal Websit in order to fetch the report in their Database.
      </p>
    </div>
  );
}

export default About;
