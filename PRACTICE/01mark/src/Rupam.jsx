import React, { useState, useEffect } from "react";

// Mock friend list
const friends = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

export default function FullSpotifyClone() {
  const [searchTerm, setSearchTerm] = useState("hello");
  const [songs, setSongs] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [selectedFriendId, setSelectedFriendId] = useState(friends[0].id);

  useEffect(() => {
    fetch(
      `https://musicapi.x007.workers.dev/search?q=${encodeURIComponent(
        searchTerm
      )}&searchEngine=gaama`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setSongs(data.response);
        }
      });
  }, [searchTerm]);

  const addToPlaylist = (song) => {
    if (!playlist.find((s) => s.id === song.id)) {
      setPlaylist([...playlist, { ...song, recommendedBy: selectedFriendId }]);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", fontFamily: "Arial" }}>
      <h1>Spotify Clone - Full Songs & Friend Choice Playlist</h1>

      {/* Search Songs */}
      <input
        type="text"
        placeholder="Search Songs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 20 }}
      />

      {/* Select Friend for Recommendation */}
      <label>
        Select Friend to Recommend:
        <select
          value={selectedFriendId}
          onChange={(e) => setSelectedFriendId(Number(e.target.value))}
          style={{ marginLeft: 8 }}
        >
          {friends.map((friend) => (
            <option key={friend.id} value={friend.id}>
              {friend.name}
            </option>
          ))}
        </select>
      </label>

      {/* Search Results */}
      <h3>Songs</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {songs.map((song) => (
          <div
            key={song.id}
            style={{
              border: "1px solid #ddd",
              padding: 10,
              width: 180,
              cursor: "pointer",
            }}
            onClick={() => addToPlaylist(song)}
          >
            <img
              src={song.img}
              alt={song.title}
              style={{ width: "100%", marginBottom: 8 }}
            />
            <strong>{song.title}</strong>
            <p style={{ fontSize: 12, color: "#555" }}>
              Click to recommend in your playlist
            </p>
          </div>
        ))}
      </div>

      {/* Playlist */}
      <h3 style={{ marginTop: 40 }}>Friend Choice Playlist</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {playlist.map((song) => {
          const friendName =
            friends.find((f) => f.id === song.recommendedBy)?.name || "Unknown";
          return (
            <li
              key={song.id}
              style={{
                display: "flex",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: 10,
              }}
            >
              <img
                src={song.img}
                alt={song.title}
                style={{ width: 60, marginRight: 10 }}
              />
              <div style={{ flexGrow: 1 }}>
                <strong>{song.title}</strong>
                <br />
                Recommended by: <em>{friendName}</em>
              </div>
              <audio controls src={`https://musicapi.x007.workers.dev/fetch?id=${song.id}`} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}