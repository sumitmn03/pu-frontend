import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { udpatecurrentuser } from "../../../actions/currentuser";

export class EditMyProfile extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired,
    udpatecurrentuser: PropTypes.func.isRequired
  };

  state = {
    name: "",
    date_of_birth: "",
    contact_no: "",
    current_city: "",
    hometown: "",
    occupation: "",
    date_or_text: "text",
    submitted: false,
    no_current_user: false
  };

  componentDidMount() {
    const { current_user } = this.props;
    if (current_user.name == null) {
      this.setState({ no_current_user: true });
    }
    this.setState({
      name: current_user.name != null ? current_user.name : "",
      date_of_birth:
        current_user.date_of_birth != null ? current_user.date_of_birth : "",
      contact_no:
        current_user.contact_no != null ? current_user.contact_no : "",
      current_city:
        current_user.current_city != null ? current_user.current_city : "",
      hometown: current_user.hometown != null ? current_user.hometown : "",
      occupation: current_user.occupation != null ? current_user.occupation : ""
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation
    } = this.state;

    this.props.udpatecurrentuser({
      name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation
    });
    this.setState({ submitted: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handle_on_change = (target, value) => {
    this.setState({ [target]: value });
  };

  render() {
    if (this.state.no_current_user) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    } else if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: "/profile/:user_id".replace(
              ":user_id",
              this.props.current_user.id
            )
          }}
        />
      );
    }
    const {
      name,
      date_of_birth,
      contact_no,
      current_city,
      hometown,
      occupation,
      date_or_text
    } = this.state;

    return (
      <div className="ms-notification-page">
        <form onSubmit={this.onSubmit} className="ms-form ms-profile-edit-form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.onChange}
            value={name}
            className="ms-form-input"
          />
          <br />
          <input
            name="date_of_birth"
            placeholder="Date of birth"
            type={date_or_text}
            onFocus={() => {
              this.handle_on_change("date_or_text", "date");
            }}
            onBlur={() => {
              this.handle_on_change("date_or_text", "text");
            }}
            value={date_of_birth}
            onChange={this.onChange}
            className="ms-form-input"
          />
          <br />
          <input
            type="number"
            placeholder="Contact no."
            className="ms-form-input"
            name="contact_no"
            onChange={this.onChange}
            value={contact_no}
          />
          <br />
          <input
            type="text"
            placeholder="Current city"
            className="ms-form-input"
            name="current_city"
            onChange={this.onChange}
            value={current_city}
          />
          <br />
          <input
            type="text"
            placeholder="Hometown"
            className="ms-form-input"
            name="hometown"
            onChange={this.onChange}
            value={hometown}
          />
          <br />
          <input
            type="text"
            placeholder="Occupation"
            className="ms-form-input"
            name="occupation"
            onChange={this.onChange}
            value={occupation}
          />
          <br />
          <br /> <br /> <br />
          <input
            value="Save"
            type="submit"
            className="ms-form-button"
          /> <br /> <br />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
});

export default connect(
  mapStateToProps,
  { udpatecurrentuser }
)(EditMyProfile);
