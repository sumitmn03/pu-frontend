import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

// websocket actions
import { connect as websocket_connect } from "@giantmachines/redux-websocket";
import { send, disconnect } from "@giantmachines/redux-websocket";

import {
  getSinglePost,
  getComments,
  setCommentsToNormal,
  incrementOptionOfDetailedPost,
  decrementOptionOfDetailedPost,
  decrement_then_incrementOfDetailedPost
} from "../../../actions/post";

import { notify } from "../../../actions/notifications";

// import {
//   incrementOptionOfDetailedPost,
//   decrementOptionOfDetailedPost,
//   decrement_then_incrementOfDetailedPost
// } from "../../../actions/posts";

import { addComment } from "../../../actions/Comment";

import PollHeader from "../Timeline/posts/pollElements/PollHeader";
import PollContent from "../Timeline/posts/pollElements/PollContent";
import DetailViewPollMainOptions from "./pollDetailViewElements/DetailViewPollMainOptions";
import PollFooter from "../Timeline/posts/pollElements/PollFooter";
import PollComments from "../Timeline/posts/pollElements/PollComments";

export class PollDetailView extends Component {
  state = {
    target_post_id: "",
    poll_expired: false
  };
  static propTypes = {
    getSinglePost: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    setCommentsToNormal: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    current_user: PropTypes.object.isRequired,
    websocket_connect: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    incrementOptionOfDetailedPost: PropTypes.func.isRequired,
    decrementOptionOfDetailedPost: PropTypes.func.isRequired,
    decrement_then_incrementOfDetailedPost: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    comment_next_page: PropTypes.string,
    detail_option_opted_loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.setCommentsToNormal();
    let get_numb = /\d+/;
    let target_post_id = this.props.location.pathname.match(get_numb)[0];
    this.setState({ target_post_id });
    this.props.getSinglePost(target_post_id);
    this.props.websocket_connect(
      `ws://localhost:8000/ws/comments/${target_post_id}/`
    );

    let { expiry_date } = this.props.post;

    let today_time = new Date(),
      expiry_date_time = new Date(expiry_date);

    today_time = today_time.getTime();
    expiry_date_time = expiry_date_time.getTime();

    if (expiry_date !== null && expiry_date_time <= today_time) {
      this.setState({ poll_expired: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      let { expiry_date } = this.props.post;
      let today_time = new Date(),
        expiry_date_time = new Date(expiry_date);
      today_time = today_time.getTime();
      expiry_date_time = expiry_date_time.getTime();
      if (expiry_date !== null && expiry_date_time <= today_time) {
        this.setState({ poll_expired: true });
      }
    }
  }

  componentWillUnmount() {
    this.props.disconnect();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { post } = this.props;

    const { poll_expired } = this.state;

    return (
      <Fragment>
        {post.author_name ? (
          <div className="ms-post-detailview">
            <div className="post">
              <PollHeader
                author_id={post.author_id}
                author_name={post.author_name}
                created_at={post.created_at}
                expiry_date={post.expiry_date}
                poll_expired={poll_expired}
              />

              <PollContent content={post.posts} />

              <DetailViewPollMainOptions
                {...this.props}
                poll_expired={poll_expired}
              />
              <hr className="ms-hrline-afteroptions" />
              <PollFooter />
            </div>
            <PollComments {...this.props} />
          </div>
        ) : (
          <div className="ms-detailedPoll-loading-page">Loading...</div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.post,
  current_user: state.current_user.current_user,
  comments: state.post.comments,
  comment_next_page: state.post.comment_next_page,
  detail_option_opted_loading: state.post.detail_option_opted_loading
});

export default connect(
  mapStateToProps,
  {
    getSinglePost,
    getComments,
    addComment,
    websocket_connect,
    send,
    disconnect,
    setCommentsToNormal,
    incrementOptionOfDetailedPost,
    decrementOptionOfDetailedPost,
    decrement_then_incrementOfDetailedPost,
    notify
  }
)(PollDetailView);
