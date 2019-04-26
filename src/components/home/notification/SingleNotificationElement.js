import React, { Component } from "react";

export class SingleNotificationElement extends Component {
  render() {
    return (
      <li className="ms-notification-item">
        {this.props.notification.notification}
      </li>
    );
  }
}

export default SingleNotificationElement;
