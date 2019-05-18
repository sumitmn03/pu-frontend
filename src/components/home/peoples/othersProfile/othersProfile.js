import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroller";

import {
  setProfilePollsToNormal,
  getSingleUser,
  getProfilePollsOfOtherUser,
  following,
  follow,
  unfollow
} from "../../../../actions/users";

import SearchedPoll from "../../search/searchedItem/SearchedPoll";

export class OthersProfile extends Component {
  state = {
    target_post_id: 0
  };

  static propTypes = {
    setProfilePollsToNormal: PropTypes.func.isRequired,
    getSingleUser: PropTypes.func.isRequired,
    getProfilePollsOfOtherUser: PropTypes.func.isRequired,
    host_user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    next: PropTypes.string,
    following: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    current_user: PropTypes.object.isRequired,
    following_user_array: PropTypes.array.isRequired
  };

  componentDidMount() {
    const { setProfilePollsToNormal, getSingleUser, following } = this.props;
    setProfilePollsToNormal();
    let get_numb = /\d+/;
    let target_post_id = this.props.location.pathname.match(get_numb)[0];
    getSingleUser(target_post_id);
    following();
    this.setState({ target_post_id });
    // getProfilePollsOfOtherUser(next, target_post_id);
  }

  componentDidUpdate() {
    let get_numb = /\d+/;
    if (this.props.location.pathname.match(get_numb)) {
      const { setProfilePollsToNormal, getSingleUser } = this.props;
      let target_post_id = this.props.location.pathname.match(get_numb)[0];
      if (target_post_id !== this.state.target_post_id) {
        setProfilePollsToNormal();
        getSingleUser(target_post_id);
        this.setState({ target_post_id });
      }
    }
  }

  loadMorePolls = () => {
    const { next, host_user, getProfilePollsOfOtherUser } = this.props;
    if (next !== null && next !== "") {
      if (host_user.id !== undefined) {
        getProfilePollsOfOtherUser(next);
      }
    }
  };

  render() {
    const {
      host_user,
      profile,
      posts,
      following_user_array,
      current_user,
      follow,
      unfollow
    } = this.props;

    let follow_or_following_value = "Follow",
      following_id = null,
      following_index = null;

    // check if the current user is following the other user

    following_user_array.map((following, index) => {
      // if host user id(following.following) found in the following list of current user, show the "following" text and set the following id

      if (host_user.id === following.following) {
        follow_or_following_value = "Following";
        following_id = following.id;
        following_index = index;
      }
      return 0;
    });

    const follow_button = (
      // follow or unfollow button
      <button
        onClick={() => {
          follow_or_following_value === "Follow"
            ? follow(host_user.id)
            : unfollow(following_id, following_index);
          // following();
        }}
        className="ms-profile-follow-button"
      >
        {follow_or_following_value}
      </button>
    );

    return (
      <Fragment>
        <div className="ms-profile-page">
          <div className="ms-profile-header">
            {host_user.name}
            {host_user.id !== current_user.id ? (
              follow_button
            ) : (
              <Link to="/editprofile" className="ms-nav-link">
                <span className="ms-profile-follow-button">Edit Profile</span>
              </Link>
            )}
          </div>{" "}
          <br />
          {host_user.email != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Email address</span>{" "}
                <span className="ms-profile-value"> {host_user.email}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {profile.occupation != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Occupation</span>
                <span className="ms-profile-value"> {profile.occupation}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {profile.current_city != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">current city </span>{" "}
                <span className="ms-profile-value">
                  {" "}
                  {profile.current_city}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {profile.hometown != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label"> Hometown </span>
                <span className="ms-profile-value"> {profile.hometown}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {host_user.date_of_birth != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label"> Date of birth</span>
                <span className="ms-profile-value">
                  {" "}
                  {host_user.date_of_birth}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {profile.contact_no != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Contact number</span>{" "}
                <span className="ms-profile-value">{profile.contact_no}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
        </div>
        <div className="ms-profile-poll-page">
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMorePolls}
            hasMore={this.props.next !== null ? true : false}
            loader={
              <div key={0} className="ms-timeline-loading-page">
                Loading ...
              </div>
            }
          >
            {posts.map((post, post_index) => {
              return (
                <SearchedPoll
                  key={post_index}
                  post={post}
                  post_index={post_index}
                  {...this.props}
                />
              );
            })}
          </InfiniteScroll>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  host_user: state.users.host_user,
  profile: state.users.profile,
  posts: state.users.posts,
  next: state.users.next,
  current_user: state.current_user.current_user,
  following_user_array: state.users.following
});

export default connect(
  mapStateToProps,
  {
    setProfilePollsToNormal,
    getSingleUser,
    getProfilePollsOfOtherUser,
    following,
    follow,
    unfollow
  }
)(OthersProfile);
