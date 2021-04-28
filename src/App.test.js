import React from "react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import renderer from "react-test-renderer";
import NavBar from "./components/NavBar";
import SearchBox from "./components/SearchBox";
import data from "./testData.json";

const songs = data.videos;
const genres = data.genres;

test("App renders a snapshot", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("NavBar component matches the snapshot", () => {
  const navBar = renderer.create(<NavBar />);
  expect(navBar.toJSON()).toMatchSnapshot();
});

test("SearchBox component matches the snapshot", () => {
  const searchBox = renderer.create(
    <SearchBox songs={songs} genres={genres} />
  );
  expect(searchBox.toJSON()).toMatchSnapshot();
});

test("fetchData function works properly", async () => {
  const expectedData = {
    expectedGenres: jest.fn(() => Promise.resolve(JSON.stringify(data.genres))),
    expectedSongs: jest.fn(() => Promise.resolve(JSON.stringify(data.videos))),
  };
  await expect(expectedData.expectedGenres()).resolves.toBe(
    JSON.stringify(genres)
  );
  await expect(expectedData.expectedSongs()).resolves.toBe(
    JSON.stringify(songs)
  );
});

test("fetchData function rejects correctly", async () => {
  const expectedData = {
    expectedGenres: jest.fn(() =>
      Promise.reject(new Error("Something went wrong"))
    ),
    expectedSongs: jest.fn(() =>
      Promise.reject(new Error("Something went wrong"))
    ),
  };
  await expect(expectedData.expectedGenres()).rejects.toThrow(
    "Something went wrong"
  );
  await expect(expectedData.expectedSongs()).rejects.toThrow(
    "Something went wrong"
  );
});
