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
  render() {
    const { option, count } = this.props.option;

    return (
      <span className="option-display" onClick={this.handle_option}>
        {option} {count}
      </span>
    );
  }
}

export default PollOption;
