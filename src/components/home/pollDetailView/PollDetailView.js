import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSinglePost } from "../../../actions/post";
import { addComment } from "../../../actions/Comment";
import { getComments } from "../../../actions/Comment";

import PollHeader from "../Timeline/posts/pollElements/PollHeader";
import PollContent from "../Timeline/posts/pollElements/PollContent";
import PollMainOptions from "../Timeline/posts/pollElements/PollMainOptions";
import PollFooter from "../Timeline/posts/pollElements/PollFooter";
import PollComments from "../Timeline/posts/pollElements/PollComments";

export class PollDetailView extends Component {
  state = {
    target_post_id: ""
  };
  static propTypes = {
    getSinglePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    current_user: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired,
    getComments: PropTypes.func.isRequired
  };

  componentDidMount() {
    let get_numb = /\d+/;
    let target_post_id = this.props.location.pathname.match(get_numb)[0];
    this.setState({ target_post_id });
    this.props.getSinglePost(target_post_id);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.comments);

    // console.log(this.props.post);
  }

  render() {
    const { post } = this.props;
    return (
      <Fragment>
        {post.author_name ? (
          <div className="ms-post-detailview">
            <div className="post">
              <PollHeader
                author_name={post.author_name}
                created_at={post.created_at}
              />

              <PollContent content={post.posts} />

              <PollMainOptions {...this.props} />
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
  comments: state.comment.comments
});

export default connect(
  mapStateToProps,
  {
    getSinglePost,
    addComment,
    getComments
  }
)(PollDetailView);
