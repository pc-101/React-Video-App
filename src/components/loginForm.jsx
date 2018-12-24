import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") {
        return "Username is required.";
      }
    }
    if (name === "Password") {
      if (value.trim() === "") {
        return "Password is required.";
      }
    }
  };
  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) {
      return;
    }

    // Send to server
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    const fields = [
      {
        name: "username",
        label: "Username"
      },
      {
        name: "password",
        label: "Password"
      }
    ];
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {fields.map((field) => (
            <Input
              onChange={this.handleChange}
              name={field.name}
              label={field.label}
              value={account[field]}
              error={errors[field.name]}
              key={fields.indexOf(field)}
            />
          ))}
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
