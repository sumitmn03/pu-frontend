import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import layout bars
import BottomNavbar from "../layout/BottomNavbar";
import Sidebar from "../layout/Sidebar";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      } else if (!auth.isAuthenticated) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { target_component: props.location.pathname }
            }}
          />
        );
      } else {
        return (
          <Fragment>
            {/* only for authenticated users */}
            <Sidebar />

            <div className="grid-container">
              <div className="item1" />

              <div className="item2  ms-no-gutter">
                <Component {...props} />
                {/* <Timeline posts={this.props.posts} /> */}
              </div>

              <div className="item3 ms-no-gutter">
                <BottomNavbar />
              </div>
            </div>
          </Fragment>
        );
      }
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PrivateRoute);
