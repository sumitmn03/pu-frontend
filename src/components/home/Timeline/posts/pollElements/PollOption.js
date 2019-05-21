import React, { Component } from "react";

export class PollOption extends Component {
  handle_option = e => {
    e.preventDefault();
    const { post_index, option_index, post_id, poll_expired } = this.props;
    if (!poll_expired) {
      const { id, count } = this.props.option;

      this.props.handle_option_opted(
        id,
        post_id,
        count,
        post_index,
        option_index
      );
    }
  };

  checkOptionOpted = () => {
    const { option_opted_by_current_user, option } = this.props;

    if (option_opted_by_current_user.length > 0) {
      if (option_opted_by_current_user[0].posts_option === option.id) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { option } = this.props.option;
    let { count_percent } = this.props;
    if (isNaN(count_percent)) count_percent = 0;

    return (
      <span
        className={
          this.checkOptionOpted()
            ? "option-display ms-highlight-option"
            : "option-display"
        }
        onClick={this.handle_option}
      >
        {option} <span className="ms-option-count">{count_percent} %</span>
      </span>
    );
  }
}

export default PollOption;
