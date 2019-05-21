import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

export class RegisterForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.handle_otp_sent();
  };

  onChange = e => {
    this.props.handle_on_change(e.target.name, e.target.value);
  };

  render() {
    const {
      name,
      email,
      date_of_birth,
      password,
      confirm_password,
      date_or_text,
      password_doesnt_match
    } = this.props;

    return (
      <Fragment>
        <div className="ms-form-align ms-register-form">
          {password_doesnt_match ? (
            <Fragment>
              <div className="text-danger">
                {" "}
                <strong> Enter the same password twice to confirm it</strong>
              </div>{" "}
              <br />
            </Fragment>
          ) : (
            <Fragment />
          )}
          <form onSubmit={this.onSubmit} className="ms-form">
            <input
              name="name"
              placeholder="Name"
              type="text"
              value={name}
              onChange={this.onChange}
              className="ms-form-input"
            />{" "}
            <br />
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
              name="date_of_birth"
              placeholder="Date of birth"
              type={date_or_text}
              onFocus={() => {
                this.props.handle_on_change("date_or_text", "date");
              }}
              onBlur={() => {
                this.props.handle_on_change("date_or_text", "text");
              }}
              value={date_of_birth}
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
            />{" "}
            <br />
            <input
              name="confirm_password"
              placeholder="Re-enter Password"
              type="password"
              value={confirm_password}
              onChange={this.onChange}
              className="ms-form-input"
            />{" "}
            <br />
            <br /> <br /> <br />
            <input
              value="Sign up"
              type="submit"
              className="ms-form-button"
            />{" "}
            <br /> <br />
            <p>
              {" "}
              <strong>Already have an account?</strong>
              <Link to="/login" className="nounderline">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default RegisterForm;
