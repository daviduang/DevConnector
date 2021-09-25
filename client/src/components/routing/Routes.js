import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-form/CreateProfile";
import PrivateRoute from "../routing/PrivateRoute";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";
import AddEducation from "../profile-form/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import NotFound from "../layout/NotFound";

const Routes = () => {
  return (
    <Fragment>
      {/* Web contents */}
      <section className="container">
        {/* Alert item on top of container */}
        <Alert />

        {/* Define other routes inside switch */}
        <Switch>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/profiles" component={Profiles}></Route>
          <Route exact path="/profile/:id" component={Profile}></Route>
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/edit-profile"
            component={EditProfile}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          ></PrivateRoute>
          <PrivateRoute
            exact
            path="/add-education"
            component={AddEducation}
          ></PrivateRoute>
          <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
          <PrivateRoute exact path="/post/:id" component={Post}></PrivateRoute>

          {/* If none of them matches, then display not found */}
          <Route component={NotFound}></Route>
        </Switch>
      </section>
    </Fragment>
  );
};

export default Routes;
