import React, { useState } from "react";
import Select from "react-select";

import SongCard from "./SongCard";

import "../design.css";

const SearchBox = ({ songs, genres, isLoaded, error }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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

  return (
    <div className="content">
      <input
        className="searchBox"
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
      {!isLoaded ? (
        <div className="screenMessage">Loading...</div>
      ) : error ? (
        <div className="screenMessage">{error}</div>
      ) : filteredSongsByGenres.length > 0 ? (
        <div>
          {filteredSongsByGenres.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      ) : (
        <div className="screenMessage"> No songs found...</div>
      )}
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
