const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
require('dotenv').config();

// Temp upload directory
const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/', upload.single('file'), async (req, res) => {
  console.log('📡 Received file for upload:', req.file?.originalname);

  if (!req.file) {
    return res.status(400).json({ message: '❌ No file uploaded.' });
  }

  const apiKey = process.env.VT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: '❌ Missing API key' });
  }

  try {
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path));

    const vtResponse = await axios.post('https://www.virustotal.com/api/v3/files', form, {
      headers: {
        'x-apikey': apiKey,
        ...form.getHeaders(),
      },
    });

    fs.unlinkSync(req.file.path); // Clean up uploaded temp file

    const scanId = vtResponse.data?.data?.id;

    return res.status(200).json({
      message: '✅ File uploaded successfully',
      scanId,
    });
  } catch (error) {
    console.error('❌ VirusTotal Upload Error:', error.response?.data || error.message);
    return res.status(500).json({
      message: '❌ Failed to upload file to VirusTotal',
      error: error.response?.data?.error?.message || error.message || 'Unknown error',
    });
  }
});

module.exports = router;
