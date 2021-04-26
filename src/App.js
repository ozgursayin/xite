import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SongCard from "./components/SongCard";

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <SongCard />
    </div>
  );
};

export default App;
