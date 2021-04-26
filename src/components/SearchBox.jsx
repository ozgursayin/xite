import React, { useState } from "react";
import "../App.css";
import SongSearch from "./SongSearch";
import Select from "react-select";

const filterByYears = (selectedYears, filteredSongsByQuery) => {
  let allSelectedYears = [];
  selectedYears?.forEach((y) => {
    allSelectedYears.push(y.value);
  });
  let filteredSongsByYears = filteredSongsByQuery;
  if (selectedYears?.length > 0) {
    filteredSongsByYears = filteredSongsByQuery?.filter((s) => {
      return allSelectedYears?.includes(s.release_year);
    });
  }
  return filteredSongsByYears;
};

const SearchBox = ({ songs, genres }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChangeQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterByQuery = (songs) => {
    return songs.filter(
      (song) =>
        song?.artist
          ?.toString()
          .toLowerCase()
          ?.includes(searchQuery?.toLowerCase()) ||
        song?.title
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
    );
  };

  const handleChangeYears = (selectedYears) => {
    setSelectedYears(selectedYears);
  };

  const uniqueYearsListGenerator = (songs) => {
    let yearList = [];
    songs?.forEach((song) => {
      if (!yearList.includes(song?.release_year))
        yearList.push(song?.release_year);
    });
    let uniqueYearsList = [];
    yearList
      ?.sort()
      .reverse()
      .forEach((year) => {
        uniqueYearsList.push({
          label: year,
          value: year,
        });
      });
    return uniqueYearsList;
  };

  const genreListGenerator = (genres) => {
    let genreList = [];
    genres?.forEach((genre) => {
      genreList.push({ label: genre.name, value: genre.name, id: genre.id });
    });
    return genreList;
  };

  const handleChangeGenres = (selectedGenres) => {
    setSelectedGenres(selectedGenres);
  };

  const filterByGenres = (selectedGenres, filteredSongsByYears) => {
    let selectedGenreIds = [];
    selectedGenres?.forEach((genre) => {
      selectedGenreIds.push(genre.id);
    });
    let filteredSongsByGenres = filteredSongsByYears;
    if (selectedGenreIds?.length > 0) {
      filteredSongsByGenres = filteredSongsByYears?.filter((s) => {
        return selectedGenreIds?.includes(s.genre_id);
      });
    }
    return filteredSongsByGenres;
  };

  const uniqueYearsList = uniqueYearsListGenerator(songs);
  const genreList = genreListGenerator(genres);
  const filteredSongsByQuery = searchQuery ? filterByQuery(songs) : songs;
  const filteredSongsByYears = filterByYears(
    selectedYears,
    filteredSongsByQuery
  );
  const filteredSongsByGenres = filterByGenres(
    selectedGenres,
    filteredSongsByYears
  );

  return (
    <div>
      <div>
        <input
          className="searchBox"
          type="search"
          placeholder="Search Songs or Artists..."
          onChange={handleChangeQuery}
        />
      </div>

      <Select
        className="yearBox"
        closeMenuOnSelect={false}
        placeholder="Filter by Year..."
        isMulti
        options={uniqueYearsList}
        onChange={handleChangeYears}
        styles={styles}
      />
      <Select
        className="genreBox"
        closeMenuOnSelect={false}
        placeholder="Filter by Genre..."
        isMulti
        options={genreList}
        onChange={handleChangeGenres}
        styles={styles}
      />

      <SongSearch
        songs={filteredSongsByGenres}
        searchQuery={searchQuery}
        selectedYears={selectedYears}
        selectedGenres={selectedGenres}
      />
    </div>
  );
};

const styles = {
  option: (provided) => ({
    ...provided,
    borderBottom: "2px  black",
    color: "black",
  }),
};

export default SearchBox;
