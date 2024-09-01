import React, { useState, useEffect } from 'react';

function FarmerProfile() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    fetch('/api/farmers')
      .then(response => response.json())
      .then(data => setFarmers(data));
  }, []);

  return (
    <div>
      <h2>Farmer Profiles</h2>
      <ul>
        {farmers.map(farmer => (
          <li key={farmer.id}>
            <h3>{farmer.name}</h3>
            <p>{farmer.history}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FarmerProfile;
