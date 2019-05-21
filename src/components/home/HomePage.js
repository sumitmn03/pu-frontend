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
  decrement_then_increment,
  setTimelineToNormal
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
    setTimelineToNormal: PropTypes.func.isRequired,
    next: PropTypes.string,
    option_opted_loading: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.getCurrentUser();
    this.props.setTimelineToNormal();
  }

  loadMorePolls = () => {
    const { next, getPosts } = this.props;
    if (next !== "") getPosts(next);
  };

  render() {
    const { posts, next } = this.props;

    return (
      <div className="timeline">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMorePolls}
          hasMore={next !== null}
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
  next: state.posts.next,
  option_opted_loading: state.posts.option_opted_loading
});

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    getPosts,
    incrementOption,
    decrementOption,
    decrement_then_increment,
    notify,
    setTimelineToNormal
  }
)(HomePage);
