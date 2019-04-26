import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/auth";

import Setting from "../home/setting/Setting";

export class Sidebar extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="ms-sidebar">
        <Setting />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { logout }
)(Sidebar);
