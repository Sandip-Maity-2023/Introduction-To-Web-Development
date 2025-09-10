import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import VillageAgri from "./VillageAgri";
import DistrictAgri from "./DistrictAgri";
import AgriTrend from "./AgriTrend";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>🌾 Agriculture Info Portal (Bhuvan API)</h1>

        {/* Navigation Menu */}
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link to="/village" style={{ marginRight: "15px" }}>Village Agriculture</Link>
          <Link to="/district" style={{ marginRight: "15px" }}>District Stats</Link>
          <Link to="/trend">Agriculture Trend</Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<h2>Welcome! Choose an option from above menu.</h2>} />
          <Route path="/village" element={<VillageAgri />} />
          <Route path="/district" element={<DistrictAgri />} />
          <Route path="/trend" element={<AgriTrend />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
