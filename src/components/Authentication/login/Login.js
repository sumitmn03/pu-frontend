import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../../actions/auth";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  login = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    // const{}
    if (this.props.isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: this.props.location.state
              ? this.props.location.state.target_component
              : "/"
          }}
        />
      );
    }
    const { email, password } = this.state;
    return (
      <div className="ms-form-align ms-loginform">
        <form onSubmit={this.login} className="ms-exactloginform">
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={this.onChange}
            className="ms-form-input"
          />{" "}
          <br />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={this.onChange}
            className="ms-form-input"
          />
          <br /> <br /> <br />
          <input value="Log in" type="submit" className="ms-form-button" />{" "}
          <br /> <br />
          <p>
            {" "}
            <strong>Don't have an account?</strong>
            <Link to="/register" className="nounderline">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
