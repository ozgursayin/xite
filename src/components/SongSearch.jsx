import React from "react";
import SongCard from "./SongCard";

const SongSearch = ({ songs, searchQuery, selectedGenres, selectedYears }) => {
  return songs?.length > 0 ? (
    <div>
      {songs?.map((song) => (
        <SongCard song={song} key={song.id} />
      ))}
    </div>
  ) : searchQuery?.length > 0 ||
    selectedGenres?.length > 0 ||
    selectedYears?.length > 0 ? (
    <div style={{ marginTop: 100, fontSize: 40 }}>No songs found.</div>
  ) : (
    <div style={{ marginTop: 100, fontSize: 40 }}>Loading...</div>
  );
};

export default SongSearch;
