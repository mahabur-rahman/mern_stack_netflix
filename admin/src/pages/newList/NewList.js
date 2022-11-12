import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import "./newList.css";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  // movie context
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  //   list context
  const { dispatch } = useContext(ListContext);

  const [list, setList] = useState(null);

  const history = useHistory();

  //   get movies api call
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  //   handleChange
  const handleChange = (e) => {
    const value = e.target.value;

    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    // console.log(e.target.selectedOptions);
    let value = Array.from(e.target.selectedOptions, (option) => option.value);

    setList({ ...list, [e.target.name]: value });
  };

  //   handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // api call
    createList(list, dispatch);

    history.push("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular Movies"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              style={{ height: "280px" }}
              onChange={handleSelect}
            >
              {movies?.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
