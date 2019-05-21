import React, { Component } from "react";

// import poll post elements
import PollHeader from "./pollElements/PollHeader";

import PollContent from "./pollElements/PollContent";

import PollMainOptions from "./pollElements/PollMainOptions";

import PollFooter from "./pollElements/PollFooter";

export class Poll extends Component {
  state = {
    poll_expired: false
  };

  componentDidMount() {
    let { expiry_date } = this.props.post;

    let today_time = new Date(),
      expiry_date_time = new Date(expiry_date);

    today_time = today_time.getTime();
    expiry_date_time = expiry_date_time.getTime();

    if (expiry_date !== null && expiry_date_time <= today_time) {
      this.setState({ poll_expired: true });
    }
  }

  render() {
    const { post } = this.props;

    const { poll_expired } = this.state;

    return (
      <div className="post">
        <PollHeader
          author_id={post.author_id}
          author_name={post.author_name}
          created_at={post.created_at}
          expiry_date={post.expiry_date}
          poll_expired={poll_expired}
        />

        <PollContent post_id={post.id} content={post.posts} />

        <PollMainOptions {...this.props} poll_expired={poll_expired} />
        <hr className="ms-hrline-afteroptions" />
        <PollFooter post_id={post.id} />
      </div>
    );
  }
}

export default Poll;
