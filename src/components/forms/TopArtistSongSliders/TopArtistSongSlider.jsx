import React from "react";

const TopArtistSongSlider = ({
  numArtists,
  setNumArtists,
  numSongsFromArtist,
  setNumSongsFromArtist,
}) => {
  return (
    <div className="mt-2">
      <p className="font-bold mb-1">
        Songs Per Artist{" "}
        <span className="font-extrabold">({numSongsFromArtist})</span>
      </p>
      <input
        aria-label="Songs per artist"
        className="range range-primary"
        type="range"
        min={1}
        max={10}
        step={1}
        value={numSongsFromArtist}
        onChange={(e) => {
          setNumSongsFromArtist(e.target.value);
        }}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {[...Array(10).keys()].map((_) => (
          <span>|</span>
        ))}
      </div>
      <p className="font-bold mb-1">
        Number of artists <span className="font-extrabold">({numArtists})</span>
      </p>
      <input
        aria-label="Number of artists"
        className="range range-primary"
        type="range"
        min={1}
        max={50}
        step={1}
        value={numArtists}
        onChange={(e) => {
          setNumArtists(e.target.value);
        }}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {[...Array(50).keys()].map((_) => (
          <span>|</span>
        ))}
      </div>
    </div>
  );
};

export default TopArtistSongSlider;
