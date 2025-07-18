import React from 'react';

function History() {
  const loggedIn = true; // Replace this with real auth check
  const dummyData = [
    {
      id: 1,
      filename: 'malware.exe',
      hash: 'd41d8cd98f00b204e9800998ecf8427e',
      date: '2025-07-15',
      status: 'Malicious',
    },
    {
      id: 2,
      filename: 'report.pdf',
      hash: '44d88612fea8a8f36de82e1278abb02f',
      date: '2025-07-14',
      status: 'Clean',
    },
  ];

  if (!loggedIn) {
    return (
      <div className="container py-5 text-center">
        <h3>Please log in to view your scan history.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4">🕘 Scan History</h2>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>File Name</th>
              <th>Hash</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.filename}</td>
                <td>{entry.hash}</td>
                <td>{entry.date}</td>
                <td>
                  <span
                    className={`badge ${
                      entry.status === 'Malicious' ? 'bg-danger' : 'bg-success'
                    }`}
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
