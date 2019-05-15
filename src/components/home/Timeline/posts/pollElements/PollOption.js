import React, { Component } from "react";

export class PollOption extends Component {
  handle_option = e => {
    e.preventDefault();
    const { post_index, option_index, post_id } = this.props;
    const { id, count } = this.props.option;

    this.props.handle_option_opted(
      id,
      post_id,
      count,
      post_index,
      option_index
    );
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
    const { option, count } = this.props.option;

    return (
      <span
        className={
          this.checkOptionOpted()
            ? "option-display highlight_option"
            : "option-display"
        }
        onClick={this.handle_option}
      >
        {option} {count}
      </span>
    );
  }
}

export default PollOption;
