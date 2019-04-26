import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  getAllUsers,
  getSingleUser,
  following,
  follow,
  unfollow
} from "../../../../actions/users";

import ProfileItem from "./ProfileItem";

export class FindPeoples extends Component {
  static propTypes = {
    getAllUsers: PropTypes.func.isRequired,
    getSingleUser: PropTypes.func.isRequired,
    all_users: PropTypes.array.isRequired,
    following_user_array: PropTypes.array.isRequired,
    following: PropTypes.func.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow: PropTypes.func.isRequired,
    current_user: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getAllUsers();
    this.props.following();
  }

  render() {
    const { all_users } = this.props;
    return (
      <div className="ms-findpeoples-page">
        {all_users.map(host_user => (
          <ProfileItem
            key={host_user.id}
            host_user={host_user}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user,
  all_users: state.users.all_users,
  following_user_array: state.users.following
});

export default connect(
  mapStateToProps,
  { getAllUsers, getSingleUser, following, follow, unfollow }
)(FindPeoples);
