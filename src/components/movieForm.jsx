import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    const { match, history } = this.props;
    const genres = getGenres();
    this.setState({ genres });

    const movieId = match.params.id;
    if (movieId === "new") {
      return;
    }

    const movie = getMovie(movieId);
    if (!movie) {
      history.replace("/not-found");
    }
    console.log(movie);

    this.setState({ data: this.formatForViewModel(movie) });
  }

  formatForViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

// const MovieForm = ({ match, history }) => {
//   return (
//     <div>
//       <h1>Movie Form {match.params.id}</h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => history.push("/movies")}
//       >
//         Save
//       </button>
//     </div>
//   );
// };

// export default MovieForm;
