import React, { Component } from "react";

// import poll post elements
import PollHeader from "../../Timeline/posts/pollElements/PollHeader";

import PollContent from "../../Timeline/posts/pollElements/PollContent";

import SearchedMainPollOptions from "./SearchedMainPollOptions";

import PollFooter from "../../Timeline/posts/pollElements/PollFooter";

export class SearchedPoll extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="post">
        <PollHeader
          author_id={post.author_id}
          author_name={post.author_name}
          created_at={post.created_at}
        />
        <PollContent post_id={post.id} content={post.posts} />
        <SearchedMainPollOptions {...this.props} />{" "}
        <hr className="ms-hrline-afteroptions" />
        <PollFooter post_id={post.id} />
      </div>
    );
  }
}

export default SearchedPoll;
