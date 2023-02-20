import React, { useRef, useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import styles from "./MoviesListComponent.module.css";

const MoviesListComponent = React.memo((props) => {
  const contentRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [movieDetailID, setMovieDetailID] = useState(null);

  const handlerMouseEnter = (ItemID) => {
    setHoveredItem(ItemID);
  };
  const handerMouseLeave = () => {
    setHoveredItem(null);
  };
  //  xử lý scroll phim
  const handlerScrollLeft = () => {
    contentRef.current.scrollLeft = scrollPosition - 500;
    setScrollPosition(!(scrollPosition <= 0) ? scrollPosition - 500 : 3500);
    console.log(scrollPosition);
  };
  const handlerScrollRight = () => {
    contentRef.current.scrollLeft = scrollPosition + 500;
    setScrollPosition(scrollPosition < 4000 ? scrollPosition + 500 : -500);
  };
  // Xử lý việc hiện chi tiết phim
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

  // Xử lý render filmList
  const dataRender = props.data.map((el) => {
    return (
      <>
        <div
          key={el.id}
          className={`${
            props.valid ? styles["original-section"] : styles["orther-section"]
          } 
        ${styles["movie-element"]}
        `}
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
          <div className={`${hoveredItem === el.id ? styles.active : ""}`}>
            <img
              src={
                props.valid
                  ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${el.backdrop_path}`
              }
            />
          </div>
        </div>
      </>
    );
  });
  // return
  return (
    <>
      <div className={styles["movieslist-component"]}>
        <button className={styles["btn-left"]} onClick={handlerScrollLeft}>
          <LeftOutlined style={{ color: "#fff", fontSize: "36px" }} />
        </button>
        <div
          className={`${styles["container-movies"]} ${
            props.valid
              ? styles["original-sections"]
              : styles["orther-sections"]
          }`}
          ref={contentRef}
        >
          {dataRender}
        </div>
        <button className={styles["btn-right"]} onClick={handlerScrollRight}>
          <RightOutlined style={{ color: "#fff", fontSize: "36px" }} />
        </button>
      </div>
      {movieDetail}
    </>
  );
});

export default MoviesListComponent;
