import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroller";

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
    notify: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    has_more_posts: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.getCurrentUser();
  }

  loadMorePolls = () => {
    this.props.getPosts(this.props.page);
  };

  render() {
    const { posts } = this.props;

    return (
      <div className="timeline">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMorePolls}
          hasMore={this.props.has_more_posts}
          loader={
            <div key={0} className="ms-timeline-loading-page">
              Loading ...
            </div>
          }
        >
          {/* {items}  */}
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
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // current_user: state.current_user.current_user,
  posts: state.posts.posts,
  page: state.posts.page,
  has_more_posts: state.posts.has_more_posts
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
