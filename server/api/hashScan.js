const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  console.log('📡 Received request: POST /api/hashScan');
  console.log('🧾 Full request body:', req.body);

  try {
    const hash = req.body.hash?.trim();

    if (!hash) {
      console.error('❌ No hash provided');
      return res.status(400).json({ message: '❌ No hash provided in request.' });
    }

    const apiKey = process.env.VT_API_KEY;
    if (!apiKey) {
      console.error('❌ Missing API key in .env');
      return res.status(500).json({ message: '❌ Server misconfigured: Missing API key' });
    }

    const url = `https://www.virustotal.com/api/v3/files/${hash}`;
    console.log('🔗 Requesting:', url);

    const response = await axios.get(url, {
      headers: { 'x-apikey': apiKey },
    });

    const attributes = response.data?.data?.attributes;
    if (!attributes?.last_analysis_results) {
      console.warn('⚠️ No scan results found in VirusTotal response.');
      return res.status(404).json({
        message: '⚠️ No scan result found for this file. You may need to upload it first.',
      });
    }

    const vendorFindings = Object.entries(attributes.last_analysis_results).map(
      ([vendor, details]) => ({
        vendor,
        result: details.result,
        category: details.category,
        engine_name: details.engine_name,
      })
    );

    const stats = attributes.last_analysis_stats || {};

    return res.json({
      message: '✅ Scan complete',
      vendorFindings,
      total_engines: stats,
    });
  } catch (err) {
    console.error('❌ API Error:', err.response?.data || err.message);

    if (err.response?.status === 404) {
      return res.status(404).json({
        message: '⚠️ No scan result found for this file. You may need to upload it first.',
      });
    }

    return res.status(500).json({
      message: '❌ Failed to contact VirusTotal',
      error: err.response?.data?.error?.message || err.message || 'Unknown error',
    });
  }
});

module.exports = router;
