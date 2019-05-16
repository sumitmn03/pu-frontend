import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";

export class ProfileItem extends Component {
  render() {
    let follow_or_following_value = "Follow",
      following_id = null,
      following_index = null;
    const { host_user, following_user_array } = this.props;

    // check if the current user is following the other user

    following_user_array.map((following, index) => {
      // if host user id(following.following) found in the following list of current user, show the "following" text and set the following id

      if (host_user.id === following.following) {
        follow_or_following_value = "Following";
        following_id = following.id;
        following_index = index;
      }
      return 0;
    });

    const follow_button = (
      // follow or unfollow button
      <button
        onClick={() => {
          follow_or_following_value === "Follow"
            ? this.props.follow(host_user.id)
            : this.props.unfollow(following_id, following_index);
        }}
        className="ms-findpeoples-button"
      >
        {follow_or_following_value}
      </button>
    );

    return (
      <Fragment>
        {this.props.current_user.id !== host_user.id ? (
          <div className="ms-findpeoples-item">
            {/* host user detail view */}{" "}
            <Link
              to={{
                pathname: "/profile/:user_id".replace(":user_id", host_user.id)
              }}
              className="ms-link ms-findpeoples-name"
            >
              {host_user.name}{" "}
            </Link>
            {/* follow button */}
            {follow_button}
          </div>
        ) : (
          <Fragment />
        )}
      </Fragment>
    );
  }
}

export default ProfileItem;
