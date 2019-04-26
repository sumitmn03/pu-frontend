import React, { Component, Fragment } from "react";

export class Option extends Component {
  state = {
    option: ""
  };

  handleOptions = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.handleOptions({
      newOption: e.target.value,
      id: this.props.id
    });
  };

  render() {
    return (
      <Fragment>
        <input
          type="text"
          name="option"
          className="post-option-input"
          placeholder={"option " + (this.props.id + 1)}
          value={this.state.option}
          onChange={this.handleOptions}
        />
      </Fragment>
    );
  }
}

export default Option;
