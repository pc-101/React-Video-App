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
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    // If there's an error, we want to just list the first error message rather than all of them
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);

    // If there are no errors, we don't have to do anything else
    if (!error) {
      return null;
    }

    // Else, let's fill up our error object with the errors for the user
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

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
          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
