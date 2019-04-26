import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class MyProfile extends Component {
  static propTypes = {
    current_user: PropTypes.object.isRequired
  };

  render() {
    const { current_user } = this.props;
    return (
      <Fragment>
        {/* <span className="btn btn-primary">
          <Link to="/editmyprofile" className="text-light nounderline">
            Edit Profile
          </Link>
        </span> */}
        <div className="ms-profile-page">
          <div className="ms-profile-header">{current_user.name}</div> <br />
          {current_user.date_of_birth != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label"> Date of birth</span>
                <span className="ms-profile-value">
                  {" "}
                  {current_user.date_of_birth}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.occupation != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Occupation</span>
                <span className="ms-profile-value">
                  {" "}
                  {current_user.occupation}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.contact_no != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Contact number</span>{" "}
                <span className="ms-profile-value">
                  {current_user.contact_no}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.email != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">Email address</span>{" "}
                <span className="ms-profile-value"> {current_user.email}</span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.current_city != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label">current city </span>{" "}
                <span className="ms-profile-value">
                  {" "}
                  {current_user.current_city}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {current_user.hometown != null ? (
            <Fragment>
              <div className="ms-profile-item">
                <span className="ms-profile-label"> Hometown </span>
                <span className="ms-profile-value">
                  {" "}
                  {current_user.hometown}
                </span>
              </div>
              <br />
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user.current_user
});

export default connect(
  mapStateToProps,
  {}
)(MyProfile);
