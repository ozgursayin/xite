import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";
import SearchBox from "./components/SearchBox";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const BASE_URL =
    "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

  const fetchData = () => {
    axios
      .get(BASE_URL)
      .then((response) => {
        setSongs(response.data.videos);
        setGenres(response.data.genres);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log("Error:", error);
        setError(error.message);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <SearchBox songs={songs} genres={genres} />
    </div>
  );
};

export default App;
