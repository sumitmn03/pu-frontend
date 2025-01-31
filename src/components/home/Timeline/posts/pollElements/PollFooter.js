import React, { Component } from "react";

import { Link } from "react-router-dom";

// import icons

import outlinedComment from "../../../../../logos/comment_logos/outlinedComment.png";

import outlinedStatistics from "../../../../../logos/statistics_logos/outlinedStatistics.svg";

export class PollFooter extends Component {
  render() {
    return (
      <div className="ms-post-footer">
        <li className="ms-post-footer-item">
          <Link
            to={{
              pathname: "/polldetail/:post_id".replace(
                ":post_id",
                this.props.post_id
              )
            }}
            className="ms-link"
          >
            <img
              src={outlinedComment}
              alt="profile"
              className="ms-comment-logo"
            />{" "}
          </Link>
        </li>
        <li className="ms-post-footer-item">
          <img
            src={outlinedStatistics}
            alt="profile"
            className="ms-statistics-logo"
          />
        </li>
      </div>
    );
  }
}

export default PollFooter;
