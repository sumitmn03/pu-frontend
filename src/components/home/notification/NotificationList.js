import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import actions
import { get_notifications } from "../../../actions/notifications";

// import components
import SingleNotificationElement from "./SingleNotificationElement";

export class NotificationList extends Component {
  static propTypes = {
    notifications: PropTypes.array.isRequired,
    get_notifications: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.get_notifications();
  }

  render() {
    return (
      <div className="ms-notification-page">
        {this.props.notifications.map((notification, index) => {
          return (
            <SingleNotificationElement
              key={index}
              notification={notification}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
});

export default connect(
  mapStateToProps,
  { get_notifications }
)(NotificationList);
