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

      {/* News cards */}
      {newsData.length > 0 && <Card data={newsData} />}
    
    </div>
  );
};

export default Newsapp;
