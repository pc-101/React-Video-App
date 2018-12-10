import React, { Component } from "react";
import Like from "./common/like";
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
    this.setState({ movies: getMovies(), genres: getGenres() });
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
    this.setState({ currentGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, pageSize, movies: allMovies } = this.state;
    // console.log(currentPage);

    if (count === 0) {
      return <p className="p-2">There are no movies in the database!</p>;
    }

    const movies = paginate(allMovies, currentPage, pageSize);
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
          <p className="p-2">Showing {this.state.movies.length} movies in the database:</p>
          <table className="table table-striped table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id} className="text-center">
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(movie)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={count}
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
