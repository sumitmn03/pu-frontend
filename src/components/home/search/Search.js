import React, { Component } from "react";

// import { Link } from "react-router-dom";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getSingleUser,
  following,
  follow,
  unfollow
} from "../../../actions/users";

// import components
import ProfileItem from "../peoples/find/ProfileItem";
import SearchedPoll from "./searchedItem/SearchedPoll";
// import Poll from "../Timeline/posts/Poll";

export class Search extends Component {
  static propTypes = {
    search_result: PropTypes.array,
    getSingleUser: PropTypes.func.isRequired,
    following_user_array: PropTypes.array.isRequired,
    following: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    current_user: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.following();
  }

  render() {
    const { search_result } = this.props;
    return (
      <div className="ms-search-page">
        {search_result.map((elem, index) => {
          return elem.email ? (
            <div key={index} className="ms-searched-profile">
              <ProfileItem host_user={elem} {...this.props} />
            </div>
          ) : (
            <SearchedPoll
              key={index}
              post={elem}
              post_index={index}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search_result: state.search.search_result,
  current_user: state.current_user.current_user,
  following_user_array: state.users.following
});

export default connect(
  mapStateToProps,
  {
    getSingleUser,
    following,
    follow,
    unfollow
  }
)(Search);
