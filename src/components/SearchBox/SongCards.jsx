import React from "react";

import SongCard from "../SongCard";

const SongCards = ({ filteredSongsByGenres }) => {
  return (
    <div>
      {filteredSongsByGenres.map((song) => (
        <SongCard song={song} key={song.id} />
      ))}
    </div>
  );
};

export default SongCards;
