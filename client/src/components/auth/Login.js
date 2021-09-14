import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

// Destructure the props
const Login = ({ login, isAuthenticated }) => {
  // Construct formData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure the formData (Now can use name instead of formData.name)
  const { email, password } = formData;

  // When any field changes(Typing), make a copy of formData(...formData), then set key:value (name:value)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // When onSubmit action triggered
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Sign Into Your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary"
          onSubmit={(e) => onSubmit(e)}
        />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  // snippet: ptfr
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// For logged in redirect
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
