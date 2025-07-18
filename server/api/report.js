const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.get('/:id', async (req, res) => {
  const scanId = req.params.id;
  const apiKey = process.env.VT_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: '❌ Missing VirusTotal API key in server config' });
  }

  try {
    const url = `https://www.virustotal.com/api/v3/analyses/${scanId}`;
    const response = await axios.get(url, {
      headers: {
        'x-apikey': apiKey,
      },
    });

    const analysisStatus = response.data.data.attributes.status;

    // If analysis is still queued
    if (analysisStatus !== 'completed') {
      return res.status(202).json({ status: analysisStatus });
    }

    const results = response.data.data.attributes.results;
    const stats = response.data.data.attributes.stats;

    // Convert the results into a vendorFindings array
    const vendorFindings = Object.entries(results).map(([vendor, details]) => ({
      vendor,
      result: details.result,
      category: details.category,
      engine_name: details.engine_name,
    }));

    return res.json({
      message: '✅ Scan completed',
      vendorFindings,
      total_engines: stats,
    });

  } catch (err) {
    console.error('❌ Error fetching report:', err.response?.data || err.message);
    return res.status(500).json({
      message: '❌ Failed to retrieve scan report',
      error: err.response?.data?.error?.message || err.message || 'Unknown error',
    });
  }
});

module.exports = router;
