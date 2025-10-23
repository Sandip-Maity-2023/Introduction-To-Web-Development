/*
import React, { useEffect, useState } from "react";
import Card from "./Card";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Side";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
   const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_KEY = "e733550425fb40bd8be6237f7a60c919";

  const getData = async (query = search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      console.log(jsonData.articles);
      if (jsonData.status === "ok") {
        let dt = jsonData.articles.slice(0, 100);
        setNewsData(dt);
        setError(null);
      } else {
        setError(jsonData.message || "Error fetching news");
        setNewsData([]);
      }
    } catch (error) {
      setError("Error fetching news");
      setNewsData([]);
    }finally{
        setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleCategoryClick = (category) => {
    getData(category);
    setSearch(category);
  };

  return (
    <div>
      <Sidebar onToggle={(open) => setSidebarOpen(open)} />
      <nav>
        <ul style={{ display: "flex", gap: "13px" }}>
          <li
            style={{
              fontWeight: 600,
              fontSize: "17px",
              listStyle: "none",
              margin: "15px",
            }}
          >
            TopHeadlines{" "}
          </li>
        </ul>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleSearchChange}
          />
          <button onClick={() => getData(search)}>Search</button>
        </div>
      </nav>

      <div className="categoryBtn" style={{ marginTop: "20px" }}>
        {["sports", "politics", "entertainment", "health", "fitness"].map(
          (category) => (
            <button key={category} onClick={()=>handleCategoryClick(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* News cards 
      {newsData.length > 0 && <Card data={newsData} />}
    
    </div>
  );
};

export default Newsapp;
*/


import React, { useEffect, useState } from "react";
import Card from "./Card";
import Sidebar from "./Side";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ move API key to .env for safety (e.g., VITE_NEWS_API_KEY)
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY || "e733550425fb40bd8be6237f7a60c919";

  const getData = async (query = search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=50&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();

      if (jsonData.status === "ok") {
        setNewsData(jsonData.articles || []);
        setError(null);
      } else {
        throw new Error(jsonData.message || "Failed to fetch news");
      }
    } catch (error) {
      setError(error.message);
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleCategoryClick = (category) => {
    setSearch(category);
    getData(category);
  };

  return (
    <div
      style={{
        transition: "margin-left 0.3s ease",
        marginLeft: sidebarOpen ? "150px" : "0",
        padding: "80px 20px 20px",
      }}
    >
      {/* Sidebar */}
      <Sidebar onToggle={(open) => setSidebarOpen(open)} />

      {/* Top Search Bar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          background: "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginTop: "10px",
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 600 }}>Top Headlines</h2>

        <div className="searchBar" style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search News..."
            value={search}
            onChange={handleSearchChange}
            style={{
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <button
            onClick={() => getData(search)}
            style={{
              padding: "8px 14px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </nav>

      {/* Category Buttons */}
      <div
        className="categoryBtn"
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {["sports", "politics", "entertainment", "health", "fitness", "technology"].map(
          (category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundColor: search === category ? "#007bff" : "#f0f0f0",
                color: search === category ? "#fff" : "#333",
                border: "none",
                padding: "8px 14px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Loading / Error / News */}
      <div style={{ marginTop: "30px" }}>
        {loading && (
          <p style={{ textAlign: "center", color: "#555" }}>Loading news...</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>
            ⚠️ {error}
          </p>
        )}
        {!loading && !error && newsData.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            No news found for "{search}" 😕
          </p>
        )}
        {!loading && newsData.length > 0 && <Card data={newsData} />}
      </div>
    </div>
  );
};

export default Newsapp;
