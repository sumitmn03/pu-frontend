import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// import actions
import { getCurrentUser } from "../../actions/currentuser";
import {
  getPosts,
  incrementOption,
  decrementOption,
  decrement_then_increment
} from "../../actions/posts";

import { notify } from "../../actions/notifications";

import Poll from "./Timeline/posts/Poll";

export class HomePage extends Component {
  static propTypes = {
    // current_user: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    getCurrentUser: PropTypes.func.isRequired,
    incrementOption: PropTypes.func.isRequired,
    decrementOption: PropTypes.func.isRequired,
    decrement_then_increment: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getPosts();
    this.props.getCurrentUser();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="timeline">
        {posts.map((post, post_index) => {
          return (
            <Poll
              key={post_index}
              post={post}
              post_index={post_index}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // current_user: state.current_user.current_user,
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    getPosts,
    incrementOption,
    decrementOption,
    decrement_then_increment,
    notify
  }
)(HomePage);
