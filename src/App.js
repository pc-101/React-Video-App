import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import "./App.css";

const Movies = lazy(() => import("./components/movies"));
const Customers = lazy(() => import("./components/customers"));
const Rentals = lazy(() => import("./components/rentals"));
const NotFound = lazy(() => import("./components/notFound"));
const MovieForm = lazy(() => import("./components/movieForm"));
const LoginForm = lazy(() => import("./components/loginForm"));
const RegisterForm = lazy(() => import("./components/registerForm"));
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/movies/:id" component={MovieForm} />
              <Route path="/movies" component={Movies} />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
            {/* <Movies /> */}
          </Suspense>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
