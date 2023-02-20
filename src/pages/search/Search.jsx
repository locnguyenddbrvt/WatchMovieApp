import React, { useState } from "react";

import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import ResultsList from "../../components/ResultsList";

const Search = () => {
  const [input, setInput] = useState("");
  const inputDataHandler = (inputValue) => {
    setInput(inputValue);
  };
  return (
    <>
      <div id="movie-detail-root"></div>
      <div className="app">
        <Navbar />
        <SearchForm inputData={inputDataHandler} />
        <ResultsList inputData={input} />
      </div>
    </>
  );
};

export default Search;
