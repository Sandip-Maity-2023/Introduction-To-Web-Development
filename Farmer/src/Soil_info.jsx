import React, { useState } from 'react'


function Soil_info() {

    const [lat,setlat]=useState("");
    const [lon,setlon]=useState("");
    const [data,setData]=useState(null);

    const fetchSoil = async () => {
        const res = await fetch(`https://bhuvan-app1.nrsc.gov.in/api/api_proximity/curl_village_geocode.php?village=${alangiri}&token=820900689e6d25c25c9fa6fa8f79cf44dea527b3`);
        const result = await res.json();
        setData(result);
    };


  return (
    <div>
        <h2>Soil Information</h2>
        <input type="text" placeholder='Latutude' value={lat} onChange={e=>setlat(e.target.value)}  />
        <input type="text" placeholder='Longitude' value={lon} onChange={e=>setlon(e.target.value)} />
        <button onClick={fetchSoil}>Get Soil Info</button>
        {data && (
            <div>
                <h3>Results:</h3>
                <p>Land Use:{data.landuse}</p>
                <p>Soil Type:{data.soil}</p>
                <p>Accuracy:{data.accuracy}</p>

            </div>
        )}
    </div>
  )
}

export default Soil_info;