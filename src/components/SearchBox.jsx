import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";

import SongCard from "./SongCard";

import "../design.css";

const SearchBox = ({ songs, genres, isLoaded, error }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const inputRef = useRef();
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleChangeQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleChangeYears = (selectedYears) => {
    setSelectedYears(selectedYears);
  };

  const handleChangeGenres = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const uniqueYearsList = uniqueYearsListGenerator(songs);
  const genreList = genreListGenerator(genres);
  const filteredSongsByQuery = searchQuery
    ? filterByQuery(songs, searchQuery)
    : songs;
  const filteredSongsByYears = filterByYears(
    selectedYears,
    filteredSongsByQuery
  );
  const filteredSongsByGenres = filterByGenres(
    selectedGenres,
    filteredSongsByYears
  );

  const loadingMessage = () => {
    return <div className="screenMessage">Loading...</div>;
  };

  const errorMessage = () => {
    return <div className="screenMessage">{error}</div>;
  };

  const songCards = () => {
    return (
      <div>
        {filteredSongsByGenres.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>
    );
  };

  const noSongsFoundMessage = () => {
    return <div className="screenMessage"> No songs found...</div>;
  };

  return (
    <div className="content">
      <input
        className="searchBox"
        ref={inputRef}
        type="search"
        placeholder="Search Songs or Artists..."
        onChange={handleChangeQuery}
      />

      <div className="selectElements">
        <Select
          className="selectBox"
          closeMenuOnSelect={false}
          placeholder="Filter by Year..."
          isMulti
          options={uniqueYearsList}
          onChange={handleChangeYears}
          styles={selectOptionStyles}
        />

        <Select
          className="selectBox"
          closeMenuOnSelect={false}
          placeholder="Filter by Genre..."
          isMulti
          options={genreList}
          onChange={handleChangeGenres}
          styles={selectOptionStyles}
        />
      </div>
      {!isLoaded
        ? loadingMessage()
        : error
        ? errorMessage()
        : filteredSongsByGenres.length > 0
        ? songCards()
        : noSongsFoundMessage()}
    </div>
  );
};

export default SearchBox;

const selectOptionStyles = {
  option: (provided) => ({
    ...provided,
    borderBottom: "2px  black",
    color: "black",
  }),
};

const filterByYears = (selectedYears, filteredSongsByQuery) => {
  let allSelectedYears = [];
  selectedYears.forEach((y) => {
    allSelectedYears.push(y.value);
  });
  let filteredSongsByYears = filteredSongsByQuery;
  if (selectedYears.length > 0) {
    filteredSongsByYears = filteredSongsByQuery.filter((s) => {
      return allSelectedYears.includes(s.release_year);
    });
  }
  return filteredSongsByYears;
};

const filterByGenres = (selectedGenres, filteredSongsByYears) => {
  let selectedGenreIds = [];
  selectedGenres.forEach((genre) => {
    selectedGenreIds.push(genre.id);
  });
  let filteredSongsByGenres = filteredSongsByYears;
  if (selectedGenreIds.length > 0) {
    filteredSongsByGenres = filteredSongsByYears.filter((s) => {
      return selectedGenreIds.includes(s.genre_id);
    });
  }
  return filteredSongsByGenres;
};

const genreListGenerator = (genres) => {
  let genreList = [];
  genres.forEach((genre) => {
    genreList.push({ label: genre.name, value: genre.name, id: genre.id });
  });
  return genreList;
};

const uniqueYearsListGenerator = (songs) => {
  let yearList = [];
  songs.forEach((song) => {
    if (!yearList.includes(song.release_year)) yearList.push(song.release_year);
  });
  let uniqueYearsList = [];
  yearList
    .sort()
    .reverse()
    .forEach((year) => {
      uniqueYearsList.push({
        label: year,
        value: year,
      });
    });
  return uniqueYearsList;
};

const filterByQuery = (songs, searchQuery) => {
  return songs.filter(
    (song) =>
      song.artist
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      song.title.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export {
  filterByQuery,
  filterByYears,
  filterByGenres,
  genreListGenerator,
  uniqueYearsListGenerator,
};
