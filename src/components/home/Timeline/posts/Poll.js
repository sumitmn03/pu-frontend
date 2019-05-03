import React, { Component } from "react";

// import poll post elements
import PollHeader from "./pollElements/PollHeader";

import PollContent from "./pollElements/PollContent";

import PollMainOptions from "./pollElements/PollMainOptions";

import PollFooter from "./pollElements/PollFooter";

export class Poll extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="post">
        <PollHeader
          author_name={post.author_name}
          created_at={post.created_at}
        />

        <PollContent post_id={post.id} content={post.posts} />

        <PollMainOptions {...this.props} />
        <hr className="ms-hrline-afteroptions" />
        <PollFooter post_id={post.id} />
      </div>
    );
  }
}

export default Poll;
