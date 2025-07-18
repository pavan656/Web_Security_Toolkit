// server/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Required to read req.body
app.use(express.urlencoded({ extended: true }));

// Routes
const hashScanRoutes = require('./api/hashScan');
app.use('/api/hashScan', hashScanRoutes);

const fileUploadRoute = require('./api/files');
app.use('/api/files', fileUploadRoute);

const reportRoutes = require('./api/report');
app.use('/api/report', reportRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
