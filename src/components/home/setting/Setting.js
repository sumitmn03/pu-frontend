import React, { Component } from "react";

export class Setting extends Component {
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
        <li className="ms-setting-item" onClick={this.props.logout}>
          Logout
        </li>
      </div>
    );
  }
}

export default Setting;
