# 🛡️ Web Security Toolkit

A full-stack web application that allows users to scan files or known hash values for potential threats using the **Hybrid Analysis API**. The toolkit features a user-friendly interface with light/dark mode, real-time scan polling, and hash detection results from multiple vendors.

---

## 📁 Folder Structure

web-security-toolkit/

├── client/ # React frontend

├── server/ # Express backend

├── .gitignore

├── README.md


---

## 🚀 Features

- 📁 **File Upload and Hash Detection**  
  Upload a file, get its **SHA-256 hash** via VirusTotal, and use that hash to fetch analysis from Hybrid Analysis.

- 🔍 **Hash Input for Scan Results**  
  Directly paste a known SHA-256 hash to retrieve malware scan reports.

- 🌙 **Dark/Light Mode Toggle**  
  Switch between modes for accessibility and ease of use.

- 📋 **Copy-to-Clipboard Support**  
  Instantly copy SHA-256 hashes for sharing or future scans.

- ⏳ **Real-Time Polling**  
  Automatically updates the scan result once Hybrid Analysis finishes processing.

- 📬 **Contact Form**  
  Built-in contact form powered by FormSubmit.

- 🧾 **About Page**  
  Learn more about the toolkit, its tech stack, and usage instructions.

---

## ⚙️ Technologies Used

**Frontend**: React, Bootstrap, FormSubmit  
**Backend**: Node.js, Express, Hybrid Analysis API  
**Other Tools**: Git, GitHub, VirusTotal (for SHA-256 retrieval only)

---

## 📝 Important Note

📌 **VirusTotal Usage**:  
To retrieve the SHA-256 hash of a file, the toolkit sends the file to VirusTotal using a backend route.  
The file is **not scanned on VirusTotal**, only uploaded to generate the **SHA-256 hash**, which is then used to request the scan report from **Hybrid Analysis**.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/web-security-toolkit.git
cd web-security-toolkit
```

2. Setup the Backend

```bash
cd server
npm install
```

Create a .env file in the server/ directory with:
```bash
HYBRID_ANALYSIS_API_KEY=your_hybrid_analysis_api_key
```

Then start the backend:
```bash
node server.js
It will run on http://localhost:5000
```

3. Setup the Frontend
```bash
cd ../client
npm install
```

Start the React frontend:
```bash
npm start
It will run on http://localhost:3000
```

### 🌐 API Routes

POST /api/files: Upload file to VirusTotal and return SHA-256 hash

POST /api/hashScan: Trigger Hybrid Analysis scan using SHA-256

GET /api/hashScan: Poll scan result for status/report

## 📷 Screenshots

### File Upload & Scan Result
![alt text](<Screenshot 2025-07-18 141047.png>)

### Dark Mode Interface
![alt text](<Screenshot 2025-07-18 141114.png>)

### Contact Form Page
![alt text](<Screenshot 2025-07-18 141141.png>)

### About Page UI
![alt text](<Screenshot 2025-07-18 141709.png>)

### History
![alt text](<Screenshot 2025-07-18 141743.png>)

📬 Contact
📧 Email: pavan.s.diwakar@mail.com

💼 LinkedIn: https://linkedin.com/in/pavan-s-diwakar-7b6930315/

