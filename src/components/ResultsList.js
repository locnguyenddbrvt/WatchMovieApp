import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./ResultsList.module.css";

const ResultsList = (props) => {
  const [searchList, setSearchList] = useState([]);
  const [isNoResult, setIsNoResult] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieDetailID, setMovieDetailID] = useState(null);
  const fetchData = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b4c25df3217105f0da854b6a36512244&query={${props.inputData}}&language=en-US&page=1&include_adult=false`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();
    setSearchList(data.results);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    if (searchList.length === 0) {
      setIsNoResult(true);
    } else {
      setIsNoResult(false);
    }
  }, [searchList]);
  //  Xử lý việc hovered
  const handlerMouseEnter = (ItemID) => {
    setHoveredItem(ItemID);
  };
  const handerMouseLeave = () => {
    setHoveredItem(null);
  };
  // xử lý movieDetail
  const handleCloseModal = () => {
    setMovieDetail(null);
  };
  const handlerModalMovieDetail = async (
    movieID,
    movieTitle,
    movieRelease_date,
    movieVote,
    movieOverview
  ) => {
    if (movieDetail !== null && movieDetailID === movieID) {
      setMovieDetail(null);
    } else {
      setMovieDetailID(movieID);
      const response = await fetch(
        `https://api.themoviedb.org/3//movie/${movieID}/videos?api_key=b4c25df3217105f0da854b6a36512244`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const movieDetailElement = (
        <div className={styles["movie-detail-element"]}>
          <div className={styles.descriptions}>
            <h2>{movieTitle}</h2>
            <h4>Release Date: {movieRelease_date}</h4>
            <h4>Vote: {movieVote}</h4>
            <p>{movieOverview}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
          <div>
            <div className={styles["ytb-video"]}>
              <iframe
                key={movieID}
                width="100%"
                height="450px"
                src={`https://www.youtube.com/embed/${data.results[0].key}`}
              ></iframe>
            </div>
          </div>
        </div>
      );
      setMovieDetail(movieDetailElement);
    }
  };
  const backdrop = (
    <div
      className={
        movieDetail === null
          ? `${styles.backdrop} ${styles.hide}`
          : `${styles.backdrop}`
      }
    ></div>
  );

  //   Render từng phần tử
  //   console.log(searchList.length);
  const displayResults = searchList.map((el) => {
    return (
      <>
        <div key={el.id} className={styles["result-element"]}>
          <div
            className={`${hoveredItem === el.id ? styles.active : ""}`}
            onMouseEnter={() => handlerMouseEnter(el.id)}
            onMouseLeave={handerMouseLeave}
            onClick={() =>
              handlerModalMovieDetail(
                el.id,
                el.title,
                el.release_date,
                el.vote_average,
                el.overview
              )
            }
          >
            <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
          </div>
        </div>
      </>
    );
  });
  const noResultForDisplay = (
    <div className={styles["no-result"]}>0 result found.</div>
  );
  //   const displayResults = <div></div>;
  return (
    <div className={styles["results-list"]}>
      <h2>Search Results</h2>
      <div className={styles["results-container"]}>
        {isNoResult ? noResultForDisplay : displayResults}
      </div>
      {ReactDOM.createPortal(
        <>
          {backdrop}
          {movieDetail}
        </>,
        document.getElementById("movie-detail-root")
          ? document.getElementById("movie-detail-root")
          : document.createElement("div")
      )}
      {/* {movieDetail} */}
    </div>
  );
};

export default ResultsList;
