// src/pages/DistrictAgriculture.js
import React, { useState } from "react";

function DistrictAgri() {
  const [district, setDistrict] = useState("");
  //const [year, setYear] = useState("2011-12");
  //const [agriStats, setAgriStats] = useState(null);

const fetchStats = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/district?district=${district}&year=${year}`
    );
    const result = await res.json();
    setData(result);
  } catch (error) {
    console.error("Error fetching district stats:", error);
  }
};
  return (
    <div>
      <h2>District Agriculture Stats</h2>
      <input
        type="text"
        placeholder="Enter district name"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="2005-06">2005-06</option>
        <option value="2011-12">2011-12</option>
      </select>
      <button onClick={fetchStats}>Get Stats</button>

      {agriStats && (
        <div>
          <h3>Results:</h3>
          <p><b>District:</b> {agriStats.district}</p>
          <p><b>Year:</b> {agriStats.year}</p>
          <p><b>Total Area (ha):</b> {agriStats.totalArea}</p>
          <p><b>Agriculture Area (ha):</b> {agriStats.agriArea}</p>
          <p><b>Agriculture %:</b> {agriStats.agriPercent}%</p>
        </div>
      )}
    </div>
  );
}

export default DistrictAgri;
