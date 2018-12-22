import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;

    this.setState({ account });
  };

  render() {
    const { account } = this.state;
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
