# 🛡️ Web Security Toolkit

A full-stack web application that allows users to scan files or known hash values for potential threats using the **VirusTotal API**. The toolkit features a user-friendly interface with light/dark mode, real-time scan polling, and hash detection results from multiple vendors.

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
  Automatically updates the scan result once VirusTotal finishes processing.

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
The file is **not scanned on VirusTotal**, only uploaded to generate the **SHA-256 hash**, which is then used to request the scan report from **VirusTotal**.

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
V_T_API_KEY=your_Virus_Total_api_key
```

Then start the backend:
```bash
node server.js
```
It will run on http://localhost:10000


3. Setup the Frontend
```bash
cd ../client
npm install
```

Start the React frontend:
```bash
npm start
```
It will run on http://localhost:3000


### 🌐 API Routes

POST /api/files: Upload file to VirusTotal and return SHA-256 hash

POST /api/hashScan: Trigger VirusTotal scan using SHA-256

GET /api/hashScan: Poll scan result for status/report

---

## 🌐 Live Demo

- **Frontend (Vercel)**: [https://web-security-toolkit-42kpwdcva-pavan656s-projects.vercel.app/](https://web-security-toolkit-42kpwdcva-pavan656s-projects.vercel.app/)

- **Backend (Render)**: [https://web-security-backend.onrender.com](https://web-security-backend.onrender.com)

---

## 🚀 Deployment Instructions

### 🚀 Deploy Backend to to Render:

Go to https://render.com

Click New > Web Service

Connect your GitHub repo

Set:

Build Command: npm install

Start Command: node index.js (or the entry file)

Environment: Node

Environment Variables: add VIRUSTOTAL_API_KEY

Port: 10000 (or your backend port)

### 🚀 Deploy Frontend to to Vercel:

Go to https://vercel.com

Create a new project from GitHub repo

Set Environment Variable:
```bash
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```
Vercel automatically handles build and deployment for React apps.

### 📝 Notes:

🧾 File Upload: Files must first be uploaded to VirusTotal, which returns a hash.

🔁 The app polls the API using that hash until the report is ready.

🔐 Do NOT commit your .env file; use secrets in deployment platforms instead.


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

## 🙋‍♂️ Author :

Pavan S Diwakar

### 📬 Contact :

📧 Email: pavan.s.diwakar@mail.com

💼 LinkedIn: https://linkedin.com/in/pavan-s-diwakar-7b6930315/

