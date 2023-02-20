import React from "react";
import Banner from "../../components/Banner";
import MoviesList from "../../components/MoviesList";
import Navbar from "../../components/Navbar";

function Browse(props) {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <MoviesList />
    </div>
  );
}

export default Browse;
