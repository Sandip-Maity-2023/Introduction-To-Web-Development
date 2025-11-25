import "./App.css";
import Newsapp from "./components/Newsapp";
import Sidebar from "./components/Side";
import Footer from "./components/Footer";
import Email from "./components/Email";
import WeatherWidget from "./components/Weather";
import { signOut } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import Anchor from "./components/Anchor";
import AnchorButton from "./components/AnchorButton";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { auth } from "./components/Firebase";
//import Profile from "./components/Profile";
function App() {
  const [user, setUser] = useState(null);
  const [showAnchor, setShowAnchor] = useState(false);

  const sampleNews =
    "Breaking news: Technology stocks rise sharply as market shows strong recovery.";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // If NOT logged in → show login page
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      {/* --- Floating Logout Button --- */}
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button
          onClick={handleLogout}
          style={{
            position: "fixed",
            right: "20px",
            top: "20px",
            background: "#ff4d4d",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            zIndex: 2000,
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* --- MAIN NEWS APP --- */}
      <Newsapp user={user} />

      {/* --- FLOATING ANCHOR BUTTON --- */}
      <AnchorButton onClick={() => setShowAnchor(!showAnchor)} />

      {/* --- FLOATING ANCHOR WINDOW --- */}
      {showAnchor && (
        <div
          style={{
            position: "fixed",
            right: "110px",
            bottom: "210px",
            zIndex: 9999,
            background: "white",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 8px 18px rgba(0,0,0,0.25)",
          }}
        >
          <Anchor newsText={user} />
        </div>
      )}

      {/* --- WEATHER WIDGET FLOATING LIKE BEFORE --- */}
      <WeatherWidget city="Kolkata" />

      {/* --- SIDEBAR + FOOTER --- */}
      <Sidebar />
      <Email />
      <Footer />

      <ToastContainer />
    </>
  );
}

export default App;
