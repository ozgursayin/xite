import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  const BASE_URL =
    "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

  const fetchData = async () => {
    const result = await axios
      .get(BASE_URL)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    setSongs(result?.videos);
    setGenres(result?.genres);
  };

  console.log("songs", songs);
  console.log("genres", genres);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <div>
        {genres.map((g) => (
          <div key={g.id}>{g.name}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
