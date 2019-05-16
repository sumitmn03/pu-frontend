import React, { Component, Fragment } from "react";

import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// import actions
import { navigate } from "../../actions/navigation";
import { logout } from "../../actions/auth";
import { search } from "../../actions/search";
import { setProfilePollsToNormal } from "../../actions/users";

// logos

import outlinedHome from "../../logos/home_logos/outlinedHome.png";

import outlinedNotification from "../../logos/notification_logos/outlinedNotification.png";

import outlinedSearch from "../../logos/search_logos/outlinedSearch.png";

import outlinedSetting from "../../logos/setting_logos/outlinedSetting.png";

// not for phones, devices larger than phones, medium size and larger devices

import outlinedProfile from "../../logos/myprofile_logo/outlinedProfile.png";

import outlinedUsersgroup from "../../logos/usersgroup_logos/outlinedUsersgroup.png";

import outlinedAddPost from "../../logos/add_post_logos/outlinedAddPost.svg";

export class TopNavbar extends Component {
  state = {
    searched_value: ""
  };

  static propTypes = {
    current_user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    setProfilePollsToNormal: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    navigation: PropTypes.string.isRequired,
    search: PropTypes.func.isRequired
    //   get_notifications: PropTypes.func.isRequired
  };

  handle_navigation = navigate_to => {
    this.props.navigate(navigate_to);
  };

  handle_onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { navigation } = this.props;
    const { searched_value } = this.state;

    if (navigation === "searched") return <Redirect to="/search" />;

    const authLinks = (
      <Fragment>
        <li className="ms-top-navbar-item setting-list-item">
          <Link to="/setting" className="ms-nav-link">
            <img
              src={outlinedSetting}
              alt="setting"
              className="ms-setting-logo"
            />
          </Link>
        </li>
        <li className="ms-top-navbar-item">
          <Link to="/" className="ms-nav-link">
            <img src={outlinedHome} alt="Home" className="ms-home-logo" />
          </Link>
        </li>
        <li className="ms-top-navbar-item">
          <Link to="/notifications" className="ms-nav-link">
            <img
              src={outlinedNotification}
              alt="notification"
              className="ms-notification-logo"
            />
          </Link>
        </li>
        <div className="ms-medium-and-up">
          <li className="ms-top-navbar-item">
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
          <li className="ms-top-navbar-item">
            <Link to="/peoples" className="ms-nav-link">
              <img
                src={outlinedUsersgroup}
                alt="users_group"
                className="ms-usersgroup-logo"
              />
            </Link>
          </li>
          <li className="ms-top-navbar-item">
            <Link to="/post" className="ms-nav-link">
              <img
                src={outlinedAddPost}
                alt="users_group"
                className="ms-addPost-logo"
              />
            </Link>
          </li>
          <li className="ms-top-navbar-item">
            <Link to="/vote" className="ms-nav-link">
              <span className="ms-vote-button">Vote</span>
            </Link>
          </li>
        </div>
        <li className="ms-top-navbar-item">
          {navigation === "search" ? (
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.search(searched_value);
              }}
            >
              <input
                autoFocus
                type="text"
                name="searched_value"
                value={searched_value}
                onChange={this.handle_onChange}
                className="search-bar"
                placeholder="Search"
                onBlur={() => {
                  this.handle_navigation("");
                }}
              />
            </form>
          ) : (
            <Link
              to="/search"
              className="ms-nav-link"
              name="search"
              onClick={() => {
                this.handle_navigation("search");
              }}
            >
              <img
                src={outlinedSearch}
                alt="search"
                className="ms-search-logo"
              />
            </Link>
          )}
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="ms-top-navbar-item unauthorised-navbar-item">
          <Link to="/login" className="ms-nav-link nounderline">
            <span className="ms-register-button">Login</span>
          </Link>
        </li>
        <li className="ms-top-navbar-item unauthorised-navbar-item">
          <Link to="/register" className="ms-nav-link nounderline">
            <span className="ms-register-button">Register</span>
          </Link>
        </li>
      </Fragment>
    );

    return (
      <nav className="ms-top-navbar">
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user,
  auth: state.auth,
  navigation: state.navigation.navigation
});

export default connect(
  mapStateToProps,
  {
    logout,
    navigate,
    search,
    setProfilePollsToNormal
    // get_notifications
  }
)(TopNavbar);
