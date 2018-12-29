import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import { paginate } from "./utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  getPagedData = () => {
    const {
      currentPage,
      selectedGenre,
      sortColumn,
      pageSize,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, items: movies };
  };
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = (query) => {
    this.setState({ selectedGenre: null, searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const { currentPage, sortColumn, pageSize, searchQuery } = this.state;
    const { totalCount, items: movies } = this.getPagedData();

    if (count === 0) {
      return <p className="p-2">There are no movies in the database!</p>;
    }

    return (
      <div className="row">
        <div className="col-3 mt-1">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelected={this.handleGenreClick}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database:</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
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
