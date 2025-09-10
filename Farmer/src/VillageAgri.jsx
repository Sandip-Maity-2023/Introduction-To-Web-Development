import React,{useState} from 'react'

function VillageAgri() {
    const [village,setvillage]=useState("");
    const [agriData,setAgriData]=useState(null);

    const fetchAgri=async()=>{
        try{
const geoUrl=`https://bhuvan-app1.nrsc.gov.in/api/api_proximity/curl_village_geocode.php?village=${village}&token=820900689e6d25c25c9fa6fa8f79cf44dea527b3`;
const geoRes=await fetch(geoUrl);
const geoData=await geoRes.json();
if(geoData.length>0){
    const {latitude,longitude,name,state_name,dist_name}=geodata[0];
    const lulcUrl=`https://bhuvan-app1.nrsc.gov.in/api/lulc250k?lat=${latitude}&lon=${longitude}&year=2018-19&token=820900689e6d25c25c9fa6fa8f79cf44dea527b3`;
    const lulcRes = await fetch(lulcUrl);
    const lulcJson = await lulcRes.json();

        setAgriData({
          village: name,
          state: state_name,
          district: dist_name,
          latitude,
          longitude,
          lulcClass: lulcJson.lulc_class.label,
          description: lulcJson.lulc_class.description
        });
      }
    } catch (error) {
      console.error("Error fetching agriculture info:", error);
    }
  };

  return (
    <div>
      <h2>Village Agriculture Info</h2>
      <input
        type="text"
        placeholder="Enter village name"
        value={village}
        onChange={(e) => setvillage(e.target.value)}
      />
      <button onClick={fetchAgri}>Get Agriculture Info</button>

      {agriData && (
        <div>
          <h3>Results:</h3>
          <p><b>Village:</b> {agriData.village}</p>
          <p><b>District:</b> {agriData.district}</p>
          <p><b>State:</b> {agriData.state}</p>
          <p><b>LULC Class:</b> {agriData.lulcClass}</p>
          <p><b>Description:</b> {agriData.description}</p>
        </div>
      )}
    </div>
  );
}

export default VillageAgri;