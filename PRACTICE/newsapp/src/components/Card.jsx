/*
import React from 'react'

const Card = ({data}) => {
     console.log(data);

     const readMore = (url) =>{
        window.open(url)
     }
     
  return (
    <div className='cardContainer'>
    {data.map((curItem,index)=>{
        if(!curItem.urlToImage){
            return null
        }else{
            return(
            <div className='card'>
                <img src={curItem.urlToImage}/>
                <div className='content'>
                    <a className='title' onClick={()=>window.open(curItem.url)}>{curItem.title}</a>
                    <p>{curItem.description}</p>
                    <button onClick={()=>window.open(curItem.url)}>Explore More</button>
                </div>
            </div>
        )
        }
         
    })}
    </div>
  )
}

export default Card;
*/


import React from "react";

const Card = ({ data = [] }) => {
  const readMore = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!data.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}>
        <h3>No articles found 📰</h3>
      </div>
    );
  }

  return (
    <div
      className="cardContainer"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {data.map((item, index) => {
        if (!item.urlToImage) return null;

        return (
          <div
            key={index}
            className="card"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              background: "#fff",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              display: "flex",
              flexDirection: "column",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={item.urlToImage}
              alt={item.title || "News image"}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderBottom: "1px solid #eee",
              }}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x200?text=No+Image")
              }
            />
            <div style={{ padding: "15px", flex: 1 }}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="title"
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  textDecoration: "none",
                  lineHeight: "1.3",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                {item.title}
              </a>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  marginBottom: "15px",
                  lineHeight: "1.5",
                }}
              >
                {item.description
                  ? item.description.slice(0, 150) + "..."
                  : "No description available."}
              </p>
              <button
                onClick={() => readMore(item.url)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#007bff")
                }
              >
                Explore More
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
