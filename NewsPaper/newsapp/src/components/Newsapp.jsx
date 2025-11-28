import React, { useEffect, useState } from "react";
import Card from "./Card";
import Sidebar from "./Side";
import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatWindow";
import WeatherWidget from "./Weather";
import Anchor from "./Anchor";
const Newsapp = () => {

const Newsapp = ({ user }) => {
  const [userEmail, setUserEmail] = useState(user?.email || "");

  // now your email sending function will use logged in email
};


  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showChatbot, setShowChatbot] = useState(false);

  const [userEmail, setUserEmail] = useState("");


  const sendNewsSummaryEmail = async () => {
    if (!userEmail) return alert("Please enter email!");

    const categories =
      JSON.parse(localStorage.getItem("emailCategories")) || [];

    if (categories.length === 0) return alert("Select categories first!");

    // fetch news for selected categories
    let allNews = [];

    for (const category of categories) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${category}&language=en&pageSize=5&apiKey=VITE_NEWS_API_KEY`
      );
      const json = await response.json();
      allNews = [...allNews, ...json.articles];
    }

    // build HTML email
    const htmlTemplate = buildNewsHTML(allNews);

    // send through emailjs
    emailjs.send(
      "service_gzoaqjp",
      "template_hrfybf4",
      {
        user_email: userEmail,
        news_html: htmlTemplate,
      },
      "e5629VytwxZ8ecaKM"
    );

    alert("News summary sent!");
  };

  // ✅ move API key to .env for safety (e.g., VITE_NEWS_API_KEY)
  const API_KEY =
    import.meta.env.VITE_NEWS_API_KEY;

  const getData = async (query = search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=50&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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
    updateCategoryPreference(category); // <-- ADD THIS
    getData(category);
  };

  //generate recommendation based on user preferences
  const getRecommendedArticles = (articles) => {
    const prefs = JSON.parse(localStorage.getItem("userPrefs"));

    if (!prefs || !prefs.categoriesViewed) return [];

    const topCategory = Object.entries(prefs.categoriesViewed).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return articles.filter((a) =>
      a.title?.toLowerCase().includes(topCategory.toLowerCase())
    );
  };

  // 🔥 Save category interest to localStorage
  const updateCategoryPreference = (category) => {
    let data = JSON.parse(localStorage.getItem("userPrefs")) || {
      categoriesViewed: {},
    };

    data.categoriesViewed[category] =
      (data.categoriesViewed[category] || 0) + 1;

    localStorage.setItem("userPrefs", JSON.stringify(data));
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
            onClick={() => {
              updateCategoryPreference(search);
              getData(search);
            }}
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


{/* <button onClick={() => navigate("/camera")}>
  📸 Open Camera Booth
</button> */}


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
        {[
          "sports",
          "politics",
          "entertainment",
          "health",
          "fitness",
          "technology",
        ].map((category) => (
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
        ))}
      </div>





{/* <Anchor newsText={newsData.map(n => n.title).join(". ")} /> */}

{/* weather */}
<WeatherWidget city="Delhi" />


      {/* Loading / Error / News */}
      <div style={{ marginTop: "30px" }}>
        {loading && (
          <p style={{ textAlign: "center", color: "#555" }}>Loading news...</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>⚠️ {error}</p>
        )}
        {!loading && !error && newsData.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            No news found for "{search}" 😕
          </p>
        )}

        {/* Recommended Section */}
        {!loading && getRecommendedArticles(newsData).length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "10px" }}>⭐ RECOMMENDATION</h3>

            <Card data={getRecommendedArticles(newsData)} />
          </div>
        )}

        {!loading && newsData.length > 0 && <Card data={newsData} />}

        {showChatbot && (
          <ChatbotWindow
            onClose={() => setShowChatbot(false)}
            newsData={newsData}
          />
        )}
        <ChatbotButton onClick={() => setShowChatbot(true)} />
      </div>

      {/* email */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "250px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={sendNewsSummaryEmail}
          style={{
            padding: "10px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Send Daily News Email
        </button>
      </div>

      {/* ---------------- EMAIL PREFERENCES SECTION ---------------- */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "40px auto",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          📧 Daily News Email Settings
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "10px",
          }}
        />

        {/* Category Selection */}
        <label style={{ fontWeight: 600 }}>Select Categories:</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            margin: "10px 0",
          }}
        >
          {[
            "sports",
            "politics",
            "entertainment",
            "health",
            "fitness",
            "technology",
          ].map((cat) => (
            <label
              key={cat}
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <input
                type="checkbox"
                onChange={(e) => {
                  let selected =
                    JSON.parse(localStorage.getItem("emailCategories")) || [];
                  if (e.target.checked) selected.push(cat);
                  else selected = selected.filter((x) => x !== cat);

                  localStorage.setItem(
                    "emailCategories",
                    JSON.stringify(selected)
                  );
                }}
              />
              {cat}
            </label>
          ))}
        </div>

        {/* Time Picker */}
        <label style={{ fontWeight: 600 }}>Choose Time (24h):</label>
        <input
          type="time"
          onChange={(e) => localStorage.setItem("emailTime", e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            width: "100%",
            marginBottom: "20px",
            marginTop: "6px",
          }}
        />

        <button
          onClick={sendNewsSummaryEmail}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Save & Send Test Email
        </button>
      </div>
    </div>
  );
};

export default Newsapp;
