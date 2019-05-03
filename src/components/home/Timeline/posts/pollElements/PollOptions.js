import React, { Component } from "react";

import PollOption from "./PollOption";

export class PollOptions extends Component {
  componentDidMount() {
    let is_any_option_opted = false,
      last_option_opted = {},
      last_option_opted_index = null,
      count_of_previous_option_opted = 0,
      actions_are_ready = true,
      total_option_count = 0;

    const { options } = this.props.post;

    for (let i = 0; i < options.length; i++) {
      total_option_count += options[i].count;
    }

    if (this.props.post.option_opted_by_current_user.length > 0) {
      is_any_option_opted = true;
      last_option_opted = this.props.post.option_opted_by_current_user[0];

      this.props.post.options.map((option, index) => {
        if (option.id === last_option_opted.posts_option) {
          last_option_opted_index = index;
          count_of_previous_option_opted = option.count;
        }
        return option;
      });
    }

    this.setState({
      is_any_option_opted,
      last_option_opted,
      last_option_opted_index,
      count_of_previous_option_opted,
      actions_are_ready,
      total_option_count
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      let is_any_option_opted = false,
        last_option_opted = {},
        last_option_opted_index = null,
        count_of_previous_option_opted = 0,
        actions_are_ready = true,
        total_option_count = 0;

      const { options } = this.props.post;

      for (let i = 0; i < options.length; i++) {
        total_option_count += options[i].count;
      }

      if (this.props.post.option_opted_by_current_user.length > 0) {
        is_any_option_opted = true;

        last_option_opted = this.props.post.option_opted_by_current_user[0];
        this.props.post.options.map((option, index) => {
          if (option.id === last_option_opted.posts_option) {
            last_option_opted_index = index;
            count_of_previous_option_opted = option.count;
          }
          return option;
        });
      }
      this.setState({
        is_any_option_opted,
        last_option_opted,
        last_option_opted_index,
        count_of_previous_option_opted,
        actions_are_ready,
        total_option_count
      });
    }
  }

  handle_option_opted = (
    option_id,
    post_id,
    count,
    post_index,
    option_index
  ) => {
    if (this.state.actions_are_ready) {
      let {
        is_any_option_opted,
        last_option_opted,
        last_option_opted_index,
        count_of_previous_option_opted,
        total_option_count
      } = this.state;
      let actions_are_ready = false;

      let {
        decrement_then_increment,
        decrementOption,
        incrementOption,
        notify,
        post
      } = this.props;

      if (is_any_option_opted) {
        // optedby id to use in decrement action
        let opted_by_id = last_option_opted.id,
          last_option_opted_id = last_option_opted.posts_option;

        if (last_option_opted_id === option_id) {
          this.setState({ actions_are_ready }, () => {
            decrementOption(
              last_option_opted_id,
              opted_by_id,
              count_of_previous_option_opted,
              post_index,
              last_option_opted_index
            );
            notify(
              post.post_vote_notification.id,
              post.post_type,
              post.author_id,
              post.id,
              total_option_count - 1,
              total_option_count
            );
          });
        } else {
          // decrement must always be done before increment
          this.setState(
            { actions_are_ready },
            decrement_then_increment(
              last_option_opted_id,
              opted_by_id,
              count_of_previous_option_opted,
              post_index,
              last_option_opted_index,
              option_id,
              post_id,
              count,
              option_index
            )
          );
        }
      } else {
        this.setState({ actions_are_ready }, () => {
          incrementOption(option_id, post_id, count, post_index, option_index);
          notify(
            post.post_vote_notification.id,
            post.post_type,
            post.author_id,
            post.id,
            total_option_count + 1,
            total_option_count
          );
        });
      }
    }
  };

  render() {
    let { post, post_index, option_opted_by_current_user } = this.props;
    return (
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
              post_index={post_index}
              option_index={option_index}
              handle_option_opted={this.handle_option_opted}
              post_id={post.id}
              option_count={option.count}
              option_opted_by_current_user={option_opted_by_current_user}
            />
          );
        })}
      </div>
    );
  }
}

export default PollOptions;
