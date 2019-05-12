import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import PollOption from "../../Timeline/posts/pollElements/PollOption";

export class SearchedPollOptions extends Component {
  state = {
    user_clicked_something: false
  };
  handle_option_opted = (
    option_id,
    post_id,
    count,
    post_index,
    option_index
  ) => {
    this.setState({ user_clicked_something: true });
  };

  render() {
    let { post } = this.props;
    return this.state.user_clicked_something ? (
      <Redirect
        to={{
          pathname: "/polldetail/:post_id".replace(":post_id", post.id)
        }}
      />
    ) : (
      <div
        className={
          post.options.length > 0
            ? "post-option-display"
            : "post-option-display ms-display-none"
        }
      >
        {" "}
        {post.options.map((option, option_index) => {
          return (
            <PollOption
              key={option_index}
              option={option}
              post_index={option_index}
              option_index={option_index}
              post_id={option_index}
              handle_option_opted={this.handle_option_opted}
            />
          );
        })}
      </div>
    );
  }
}

export default SearchedPollOptions;
