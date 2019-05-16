import React, { Component, Fragment } from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/privateRoute/PrivateRoute";

// import Form from "./posts/create/Form";

// import components

import TopNavbar from "./components/layout/TopNavbar";

// import unauthorised components

import Login from "./components/authentication/login/Login";
import MainRegister from "./components/authentication/register/MainRegister";

// import authorised components
import Homepage from "./components/home/HomePage";
import CreateForm from "./components/home/createPost/CreateForm";
import FindPeoples from "./components/home/peoples/find/FindPeoples";
import OthersProfile from "./components/home/peoples/othersProfile/OthersProfile";
// import Profile from "./peoples/profile/Profile";
// import UpdateForm from "./update/update_poll/UpdateForm";
// import Stats from "./stats/stats";
import NotificationList from "./components/home/notification/NotificationList";
import Search from "./components/home/search/Search";
import PollDetailView from "./components/home/pollDetailView/PollDetailView";
// import EditMyProfile from "./myprofile/EditMyProfile";
// import UpdatePassword from "./updatePasswordFolder/UpdatePassword";
// import UpdateEmail from "./updateEmailFolder/UpdateEmail";
import Setting from "./components/home/setting/Setting";
import VotePage from "./components/home/vote/VotePage";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { getCurrentUser } from "./actions/currentuser";
import { get_notifications } from "./actions/notifications";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getCurrentUser());
    store.dispatch(get_notifications());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <TopNavbar />
            <br /> <br />
            <div className="app ms-no-gutter">
              <Switch>
                <PrivateRoute exact path="/" component={Homepage} />
                <PrivateRoute exact path="/post" component={CreateForm} />
                <PrivateRoute
                  exact
                  path="/notifications"
                  component={NotificationList}
                />
                <PrivateRoute exact path="/setting" component={Setting} />
                <PrivateRoute exact path="/peoples" component={FindPeoples} />
                <PrivateRoute exact path="/search" component={Search} />
                <PrivateRoute
                  exact
                  path="/polldetail/:post_id"
                  component={PollDetailView}
                />
                <PrivateRoute exact path="/vote" component={VotePage} />
                <PrivateRoute
                  exact
                  path="/profile/:user_id"
                  component={OthersProfile}
                />
                {/* 
                  <PrivateRoute
                    exact
                    path="/findpeoples"
                    component={FindPeoples}
                  />
                  <PrivateRoute exact path="/profile" component={Profile} />
                  <PrivateRoute
                    exact
                    path="/updatepost"
                    component={UpdateForm}
                  />
                  <PrivateRoute exact path="/stats" component={Stats} />
                  <PrivateRoute
                    exact
                    path="/notifications"
                    component={NotificationList}
                  />
                  <PrivateRoute exact path="/myprofile" component={MyProfile} />

                  <PrivateRoute exact path="/setting" component={Setting} />

                  <PrivateRoute
                    exact
                    path="/editmyprofile"
                    component={EditMyProfile}
                  />

                  <PrivateRoute
                    exact
                    path="/updatepassword"
                    component={UpdatePassword}
                  />

                  <PrivateRoute
                    exact
                    path="/updateemail"
                    component={UpdateEmail}
                  /> */}
                {/* for non-authenticated user */}
                <Route exact path="/register" component={MainRegister} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
