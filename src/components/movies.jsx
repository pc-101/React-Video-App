import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: ""
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);

    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreClick = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, currentGenre, pageSize, movies: allMovies } = this.state;
    // console.log(currentPage);

    if (count === 0) {
      return <p className="p-2">There are no movies in the database!</p>;
    }

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((m) => m.genre._id === currentGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);
    // console.log(movies);

    return (
      <div className="row">
        <div className="col-3 mt-5">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.currentGenre}
            onItemSelected={this.handleGenreClick}
          />
        </div>
        <div className="col">
          <p className="p-2">Showing {filtered.length} movies in the database:</p>
          <MoviesTable movies={movies} onLike={this.handleLike} onDelete={this.handleDelete} />
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
