import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Option from "./Option";
import DropdownOptions from "./DropdownOptions";

import { addPost } from "../../../actions/posts";

export class CreateForm extends Component {
  state = {
    post: "",
    no_of_options: 0,
    optionArray: [],
    options: [],
    isSubmitted: false
  };

  static propTypes = {
    addPost: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleOptions = ({ newOption, id }) => {
    let options = [...this.state.options];
    options[id] = newOption;
    this.setState({ options });
  };

  handle_no_of_options = no_of_options => {
    let optionArray = [],
      options = [];

    for (let i = 0; i < no_of_options; i++) {
      options.push("");
      optionArray.push(
        <Option key={i} id={i} handleOptions={this.handleOptions} />
      );
    }
    this.setState({ no_of_options, optionArray, options });
  };

  componentDidMount() {
    this.handle_no_of_options(2);
  }

  onSubmit = e => {
    e.preventDefault();
    const { post, no_of_options, options } = this.state;
    this.props.addPost({ posts: post, no_of_options }, options);
    this.setState({
      post: "",
      no_of_options: 0,
      optionArray: [],
      options: [],
      isSubmitted: true
    });
  };

  // Close the dropdown if the user clicks outside of it
  hideDropdown = () => {
    if (document.getElementById("myDropdown").classList.contains("show")) {
      document.getElementById("myDropdown").classList.remove("show");
    }
  };

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to="/" />;
    }
    const { post, optionArray, no_of_options } = this.state;
    return (
      <div className="ms-addpost" onClick={this.hideDropdown}>
        <form className="ms-addpost-form" onSubmit={this.onSubmit}>
          <textarea
            type="text"
            name="post"
            placeholder="Write something here..."
            value={post}
            onChange={this.onChange}
            className="ms-addpost-input"
          />
          <br /> <br />
          <DropdownOptions
            handle_no_of_options={this.handle_no_of_options}
            no_of_options={no_of_options}
          />
          <br /> <br />
          <div
            className={
              optionArray.length > 0
                ? "post-option-input-container"
                : "post-option-input-container ms-display-none"
            }
          >
            {optionArray}
            <br />
          </div>
          <br />
          <button type="submit" className="ms-addpost-button">
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    addPost
  }
)(CreateForm);
