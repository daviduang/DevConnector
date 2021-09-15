import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
/**
 * Check if user is authenticated, if not, then redirect to login page
 */
const privateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  ></Route>
);

// Get auth from current state
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Declare the auth var in props
privateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

// Connect the state to the props
export default connect(mapStateToProps)(privateRoute);
