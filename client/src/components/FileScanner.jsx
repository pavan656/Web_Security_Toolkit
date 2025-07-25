import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function FileScanner() {
  const [mode, setMode] = useState('file');
  const [file, setFile] = useState(null);
  const [hashInput, setHashInput] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [computedHash, setComputedHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const borderStyle = {
    border: '2px solid',
    borderColor: isDark ? 'white' : 'black'
  };

  const handleFileChange = async (e) => {
    setFile(null);
    setScanResult(null);
    setComputedHash('');
    setError('');
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    await handleFileUpload(selectedFile);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hash = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setComputedHash(hash);
    } catch (err) {
      setError('❌ Failed to compute file hash.');
    }
  };
  
  const baseURL = process.env.REACT_APP_BACKEND_URL;

  const handleFileUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setScanResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseURL}/api/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { sha256 } = response.data;
      setComputedHash(sha256); // Optional: update if new hash is returned
      setHashInput(sha256);    // Pre-fill the hash input
      // Optionally, you can auto-scan after upload here if desired
    } catch (err) {
      setError('❌ Failed to upload file.');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setScanResult(null);
    setLoading(true);

    try {
      const response = await axios.post('/api/hashScan', { hash: hashInput });
      setScanResult({ ...response.data, hash: hashInput });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('❌ Failed to fetch scan report.');
      }
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    if (!scanResult || !scanResult.vendorFindings) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('🛡️ VirusTotal Scan Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Hash: ${scanResult.hash}`, 14, 30);
    doc.text(`Scan Date: ${new Date().toLocaleString()}`, 14, 38);

    const rows = scanResult.vendorFindings.map((v) => [
      v.vendor,
      v.result || 'Clean',
      v.category === 'malicious' ? '⚠️ Malicious' : '✅ Clean'
    ]);

    doc.autoTable({
      startY: 45,
      head: [['Vendor', 'Result', 'Status']],
      body: rows,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [52, 58, 64] },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.text('Generated by Web Security Toolkit', 14, doc.internal.pageSize.height - 10);
      },
    });

    doc.save(`ScanReport_${scanResult.hash}.pdf`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(computedHash);
  };

  return (
    <div className="container mt-5">
      <div
        className="p-4 rounded shadow position-relative"
        style={{
          backgroundColor: 'var(--bs-body-bg)',
          ...borderStyle
        }}
      >
        <h2 className="text-center text-success mb-4">🛡️ File Scanner</h2>

        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group">
            <button
              type="button"
              className={`btn btn-${mode === 'file' ? 'primary' : 'outline-primary'}`}
              style={borderStyle}
              onClick={() => {
                setMode('file');
                setScanResult(null);
                setError('');
                setHashInput('');
              }}
            >
              Upload File
            </button>
            <button
              type="button"
              className={`btn btn-${mode === 'hash' ? 'primary' : 'outline-primary'}`}
              style={borderStyle}
              onClick={() => {
                setMode('hash');
                setScanResult(null);
                setError('');
                setComputedHash('');
                setFile(null);
              }}
            >
              Enter Hash
            </button>
          </div>
        </div>

        {mode === 'file' ? (
          <>
            <div className="mb-3 text-center">
              <label className="form-label custom-label">Select File</label>
              <input
                type="file"
                className="form-control mx-auto file-input-custom"
                style={{ maxWidth: '300px', ...borderStyle }}
                onChange={handleFileChange}
                required
              />
            </div>
            {computedHash && (
              <div className="alert alert-info text-center">
                🧾 <strong>SHA-256:</strong>
                <div className="d-flex justify-content-center align-items-center mt-2">
                  <code style={{ wordWrap: 'break-word', maxWidth: '85%' }}>{computedHash}</code>
                  <button
                    className="btn btn-sm btn-outline-dark ms-2"
                    style={borderStyle}
                    onClick={handleCopy}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '500px' }}>
            <div className="mb-3">
              <label className="form-label custom-label">Enter SHA-256 Hash</label>
              <input
                type="text"
                className="form-control hash-input-custom"
                style={{
                  backgroundColor: 'var(--bs-body-bg)',
                  color: 'var(--bs-body-color)',
                  ...borderStyle
                }}
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100" style={borderStyle} disabled={loading}>
              {loading ? 'Scanning...' : '🔍 Scan Now'}
            </button>
          </form>
        )}

        {error && (
          <div className="alert alert-warning mt-4 text-center" role="alert">
            {error}
          </div>
        )}

        {scanResult && (
          <div className="mt-5">
            {scanResult.vendorFindings?.length > 0 ? (
              <>
                <h4 className="text-info text-center mb-3">✅ Scan Report</h4>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover text-light">
                    <thead className="table-dark">
                      <tr>
                        <th>Vendor</th>
                        <th>Result</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanResult.vendorFindings.map((v, idx) => (
                        <tr
                          key={idx}
                          className={v.category === 'malicious' ? 'table-danger' : 'table-success'}
                        >
                          <td>{v.vendor}</td>
                          <td>{v.result || 'Clean'}</td>
                          <td>{v.category === 'malicious' ? '⚠️ Malicious' : '✅ Clean'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-outline-primary" style={borderStyle} onClick={exportPDF}>
                    📄 Download PDF Report
                  </button>
                </div>
              </>
            ) : (
              <div className="alert alert-warning text-center">
                ⚠️ No scan result found for this file. It may not have been scanned yet.
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div className="text-center">
              <div className="spinner-border text-light" role="status" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-white fs-5">🔄 Scanning file... Please wait</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileScanner;
