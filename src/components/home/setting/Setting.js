import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { logout } from "../../../actions/auth";

export class Setting extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="ms-setting-page">
        <li className="ms-setting-item" href="#about">
          About
        </li>
        <li className="ms-setting-item" href="#services">
          Services
        </li>
        <li className="ms-setting-item" href="#clients">
          Settings & Privacy
        </li>
        <li className="ms-setting-item" href="#contact">
          Contact
        </li>
        <Link to="/editprofile" className="ms-link">
          <li className="ms-setting-item" href="#contact">
            <span>Edit Profile</span>{" "}
          </li>
        </Link>{" "}
        <li className="ms-setting-item" onClick={this.props.logout}>
          Logout
        </li>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { logout }
)(Setting);
