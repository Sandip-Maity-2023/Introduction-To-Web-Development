// src/pages/AgricultureTrend.js
import React, { useState } from "react";

function AgriTrend() {
  const [district, setDistrict] = useState("");
  const [trend, setTrend] = useState(null);

  const fetchTrend = async () => {
    try {
      const url = `https://bhuvan-app1.nrsc.gov.in/api/lulc250k_district_timeseries?district=${district}&token=820900689e6d25c25c9fa6fa8f79cf44dea527b3`;
      const res = await fetch(url);
      const data = await res.json();

      // Extract agriculture only for each year
      const agriTrend = {};
      Object.keys(data.years).forEach((yr) => {
        const agriClass = data.years[yr].find((c) => c.class === "Agriculture");
        agriTrend[yr] = agriClass ? agriClass.area_ha : 0;
      });

      setTrend(agriTrend);
    } catch (err) {
      console.error("Error fetching trend:", err);
    }
  };

  return (
    <div>
      <h2>Agriculture Trend Over Years</h2>
      <input
        type="text"
        placeholder="Enter district name"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <button onClick={fetchTrend}>Get Trend</button>

      {trend && (
        <div>
          <h3>Trend Results:</h3>
          <ul>
            {Object.keys(trend).map((yr) => (
              <li key={yr}>
                {yr}: {trend[yr]} ha
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AgriTrend;
