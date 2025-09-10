import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

// enable cors for frontend
app.use(cors());

// proxy endpoint
app.get("/api/district", async (req, res) => {
  const { district, year } = req.query;

  // 🔥 replace YOUR_TOKEN with your real Bhuvan token
  const apiUrl = `https://bhuvan-app1.nrsc.gov.in/api/lulc50k_district?district=${district}&year=${year}&token=820900689e6d25c25c9fa6fa8f79cf44dea527b3`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data); // send back to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data from Bhuvan" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on http://localhost:${PORT}`);
});
