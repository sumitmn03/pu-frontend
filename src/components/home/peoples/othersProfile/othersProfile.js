import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroller";

import {
  setProfilePollsToNormal,
  getSingleUser,
  getProfilePollsOfOtherUser
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
    posts: PropTypes.array.isRequired,
    next: PropTypes.string
  };

  componentDidMount() {
    const { setProfilePollsToNormal, getSingleUser } = this.props;
    setProfilePollsToNormal();
    let get_numb = /\d+/;
    let target_post_id = this.props.location.pathname.match(get_numb)[0];
    getSingleUser(target_post_id);
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
    const { host_user, posts } = this.props;

    return (
      <Fragment>
        <div className="ms-profile-page">
          <div className="ms-profile-header">{host_user.name}</div> <br />
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
          {host_user.occupation != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Occupation</span>
                <span className="ms-profile-value">
                  {" "}
                  {host_user.occupation}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {host_user.contact_no != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Contact number</span>{" "}
                <span className="ms-profile-value">{host_user.contact_no}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
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
          {host_user.current_city != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">current city </span>{" "}
                <span className="ms-profile-value">
                  {" "}
                  {host_user.current_city}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {host_user.hometown != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label"> Hometown </span>
                <span className="ms-profile-value"> {host_user.hometown}</span>
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
  posts: state.users.posts,
  next: state.users.next
});

export default connect(
  mapStateToProps,
  {
    setProfilePollsToNormal,
    getSingleUser,
    getProfilePollsOfOtherUser
  }
)(OthersProfile);
