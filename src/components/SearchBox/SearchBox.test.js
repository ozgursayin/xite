import "@testing-library/jest-dom/extend-expect";
import data from "../../testData.json";

const {
  filterByQuery,
  filterByYears,
  filterByGenres,
  genreListGenerator,
  uniqueYearsListGenerator,
} = require("./SearchBox");

const genres = data.genres;
const songs = data.videos;

test("songs data is correct", () => {
  expect(songs).toHaveLength(3);
  expect(songs).toMatchSnapshot();
});

test("genres data is correct", () => {
  expect(genres).toHaveLength(4);
  expect(genres).toMatchSnapshot();
});

for (let i = 0; i < songs.length; i++) {
  test(`songs[${i}] should have properties (id, artist, title, release_year, genre_id, image_url)`, () => {
    expect(songs[i]).toHaveProperty("id");
    expect(songs[i]).toHaveProperty("artist");
    expect(songs[i]).toHaveProperty("title");
    expect(songs[i]).toHaveProperty("release_year");
    expect(songs[i]).toHaveProperty("genre_id");
    expect(songs[i]).toHaveProperty("image_url");
  });
}

test("artist name is correct", () => {
  expect(songs.map((s) => s.artist)).toEqual([
    "Pants Velour",
    "El Koala",
    "Tom Petty and the Heartbreakers",
  ]);
});

test("genre name is correct", () => {
  expect(genres.map((g) => g.name)).toEqual([
    "Pop",
    "Electronic/Dance",
    "Rock",
    "Country",
  ]);
});

test("songs data has the expected song and matches as an object", () => {
  const expectedSong = {
    id: 501649,
    artist: "El Koala",
    title: "Veni paca to",
    release_year: 2014,
    genre_id: 8,
    image_url:
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg",
  };
  expect(songs[1]).toMatchObject(expectedSong);
});

test("filterByQuery function is working", () => {
  const result = filterByQuery(songs, "All");
  const songSearched = {
    artist: "Pants Velour",
    genre_id: 14,
    id: 501437,
    image_url:
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501437/images/app/w522_h292.jpg",
    release_year: 2014,
    title: "All In",
  };
  expect(result).toEqual([songSearched]);
});

test("filterByYear function is working", () => {
  const result = filterByYears([{ label: 2010, value: 2010 }], songs);
  const songSearched = {
    id: 501895,
    artist: "Tom Petty and the Heartbreakers",
    title: "I Should Have Known It",
    release_year: 2010,
    genre_id: 8,
    image_url:
      "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501895/images/app/w522_h292.jpg",
  };

  expect(result).toEqual([songSearched]);
});

test("filterByGenres function is working", () => {
  const result = filterByGenres(
    [{ label: "Rock", value: "Rock", id: 8 }],
    songs
  );
  const songSearched = [
    {
      id: 501649,
      artist: "El Koala",
      title: "Veni paca to",
      release_year: 2014,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501649/images/app/w522_h292.jpg",
    },
    {
      id: 501895,
      artist: "Tom Petty and the Heartbreakers",
      title: "I Should Have Known It",
      release_year: 2010,
      genre_id: 8,
      image_url:
        "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/679a82b1e7110c16e14412f1debaa118c10078a9/images/501895/images/app/w522_h292.jpg",
    },
  ];
  expect(result).toEqual(songSearched);
});

test("genreListGenerator function is working", () => {
  const result = genreListGenerator(genres);
  const genreList = [
    { label: "Pop", value: "Pop", id: 5 },
    { label: "Electronic/Dance", value: "Electronic/Dance", id: 6 },
    { label: "Rock", value: "Rock", id: 8 },
    { label: "Country", value: "Country", id: 13 },
  ];
  expect(result).toEqual(genreList);
});

test("uniqueYearsListGenerator function is working", () => {
  const result = uniqueYearsListGenerator(songs);
  const uniqueYearsList = [
    { label: 2014, value: 2014 },
    { label: 2010, value: 2010 },
  ];
  expect(result).toEqual(uniqueYearsList);
});
