import { useState, useEffect, useCallback } from "react";

import styles from "./MoviesList.module.css";
import MoviesListComponent from "./MoviesListComponent";

const MoviesList = () => {
  function useFetchData(url) {
    const [dataMovies, setDataMovies] = useState([]);
    const fetchMoviesAPI = useCallback(async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        setDataMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }, []);
    useEffect(() => {
      fetchMoviesAPI();
    }, [fetchMoviesAPI]);
    // console.log(dataMovies);
    return { dataMovies };
  }

  const originalList = useFetchData(
    "https://api.themoviedb.org/3/discover/tv?api_key=b4c25df3217105f0da854b6a36512244&with_network=123"
  ).dataMovies;
  const trendingList = useFetchData(
    "https://api.themoviedb.org/3/trending/all/week?api_key=b4c25df3217105f0da854b6a36512244&language=en-US"
  ).dataMovies;
  const topRatedList = useFetchData(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=b4c25df3217105f0da854b6a36512244&language=en-US"
  ).dataMovies;
  const actionList = useFetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=b4c25df3217105f0da854b6a36512244&with_genres=2"
  ).dataMovies;
  const comedyList = useFetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=b4c25df3217105f0da854b6a36512244&with_genres=35"
  ).dataMovies;
  const horrorList = useFetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=b4c25df3217105f0da854b6a36512244&with_genres=27"
  ).dataMovies;
  const romanceList = useFetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=b4c25df3217105f0da854b6a36512244&with_genres=1074"
  ).dataMovies;
  const documentList = useFetchData(
    "https://api.themoviedb.org/3/discover/movie?api_key=b4c25df3217105f0da854b6a36512244&with_genres=9"
  ).dataMovies;

  const IsOriginalList = true;
  return (
    <div className={styles["movies-list"]}>
      <h3>Netflix Original</h3>
      <MoviesListComponent data={originalList} valid={IsOriginalList} />
      <h3>Trending List</h3>
      <MoviesListComponent data={trendingList} valid={!IsOriginalList} />
      <h3>Top Rated</h3>
      <MoviesListComponent data={topRatedList} valid={!IsOriginalList} />
      {/* <h3>Actions</h3> */}
      {/* <MoviesListComponent data={actionList} valid={IsOriginalList}/> chuỗi rỗng */}
      <h3>Comedy</h3>
      <MoviesListComponent data={comedyList} valid={!IsOriginalList} />
      <h3>Horror</h3>
      <MoviesListComponent data={horrorList} valid={!IsOriginalList} />
      {/* <h3>Romance</h3> */}
      {/* <MoviesListComponent data={romanceList} valid={IsOriginalList}/> chuỗi rỗng*/}
      {/* <h3>Document</h3>
      <MoviesListComponent data={documentList} valid={!IsOriginalList} /> */}
    </div>
  );
};

export default MoviesList;
