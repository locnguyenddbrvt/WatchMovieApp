import { useState } from "react";
import styles from "./SearchForm.module.css";

const SearchForm = (props) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [error, setError] = useState({});

  //   Xử lý các hàm
  const inputChangeHandler = (value) => {
    setEnteredInput(value.target.value);
  };
  const searchMovieHandler = (event) => {
    event.preventDefault();
    if (enteredInput.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "You need Enter key Word",
      });
    } else {
      props.inputData(enteredInput);
    }
  };
  return (
    <>
      <form className={styles["search-form"]} onSubmit={searchMovieHandler}>
        <div className={styles["content"]}>
          <div className={styles["input"]}>
            <input
              type="text"
              id="search"
              onChange={inputChangeHandler}
              value={enteredInput}
            />
            <button>
              {" "}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="search-icon"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
          <div className={styles["display-error"]}>
            <h5>{error.title}</h5>
            <p>{error.message}</p>
          </div>
          <div className={styles.actions}>
            <button className={styles["reset-btn"]} type="reset">
              Reset
            </button>
            <button className={styles["search-btn"]} type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
      <div></div>
    </>
  );
};

export default SearchForm;
