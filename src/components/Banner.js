import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./Banner.module.css";

const Banner = () => {
  const [dataMovies, setDataMovies] = useState([]);

  const fetchMoviesAPI = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/tv?api_key=b4c25df3217105f0da854b6a36512244&with_network=123"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const transformedMovies = data.results.map((el) => {
        return {
          id: el.id,
          titile: el.name,
          subtext: el.overview,
          backdrop: el.backdrop_path,
        };
      });
      setDataMovies(transformedMovies);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchMoviesAPI();
  }, [fetchMoviesAPI]);

  let dataRender =
    dataMovies[Math.floor(Math.random() * dataMovies.length - 1)];
  let content;
  if (dataMovies.length > 0) {
    content = (
      <>
        <img src={`https://image.tmdb.org/t/p/w500${dataRender.backdrop}`} />
        <div className={styles.description}>
          <h3>{dataRender.titile}</h3>
          <div className={styles.actions}>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p>{dataRender.subtext}</p>
        </div>
      </>
    );
  }

  return <div className={styles.banner}>{content}</div>;
};

export default Banner;
