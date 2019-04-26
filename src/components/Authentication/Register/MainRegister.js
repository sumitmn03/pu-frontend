import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { send_otp } from "../../../actions/auth";
import { register } from "../../../actions/auth";

import RegisterForm from "./RegisterForm";
import RegisterOtp from "./RegisterOtp";

export class MainRegister extends Component {
  state = {
    name: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
    date_or_text: "text",
    otp_sent: false,
    otp: "",
    wrong_otp: false,
    password_doesnt_match: false
  };

  static propTypes = {
    send_otp: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  check_otp_and_register = () => {
    const { name, email, date_of_birth, password, otp } = this.state;
    this.props.register(name, email, date_of_birth, password, otp);
    this.setState({ wrong_otp: true });
  };

  handle_otp_sent = () => {
    const { password, confirm_password, email } = this.state;
    if (password !== confirm_password) {
      this.setState({ password_doesnt_match: true });
    } else {
      this.props.send_otp(email);
      this.setState({ otp_sent: true });
    }
  };

  handle_on_change = (target, value) => {
    this.setState({ [target]: value });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { otp_sent } = this.state;

    return (
      <div className="ms-mainregister">
        {otp_sent ? (
          <RegisterOtp
            handle_on_change={this.handle_on_change}
            check_otp_and_register={this.check_otp_and_register}
            {...this.state}
          />
        ) : (
          <RegisterForm
            handle_otp_sent={this.handle_otp_sent}
            handle_on_change={this.handle_on_change}
            {...this.state}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { send_otp, register }
)(MainRegister);
