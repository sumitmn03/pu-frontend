import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// icons

import outlinedProfile from "../../logos/myprofile_logo/outlinedProfile.png";

import outlinedUsersgroup from "../../logos/usersgroup_logos/outlinedUsersgroup.png";

import outlinedAddPost from "../../logos/add_post_logos/outlinedAddPost.svg";

export class BottomNavbar extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired
  };

  render() {
    return (
      <nav className="ms-bottom-navbar">
        <li className="ms-bottom-navbar-item">
          <Link
            to={{
              pathname: "/profile/:user_id".replace(
                ":user_id",
                this.props.current_user.id
              )
            }}
            className="ms-nav-link"
          >
            <img
              src={outlinedProfile}
              alt="profile"
              className="ms-profile-logo"
            />
          </Link>
        </li>
        <li className="ms-bottom-navbar-item">
          <Link to="/peoples" className="ms-nav-link">
            <img
              src={outlinedUsersgroup}
              alt="users_group"
              className="ms-usersgroup-logo"
            />
          </Link>
        </li>
        <li className="ms-bottom-navbar-item">
          <Link to="/post" className="ms-nav-link">
            <img
              src={outlinedAddPost}
              alt="users_group"
              className="ms-addPost-logo"
            />
          </Link>
        </li>
        <li className="ms-bottom-navbar-item">
          <Link to="/vote" className="ms-nav-link">
            <span className="ms-vote-button">Vote</span>
          </Link>
        </li>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
});

export default connect(
  mapStateToProps,
  {}
)(BottomNavbar);
