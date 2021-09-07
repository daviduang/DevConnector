import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  // Construct formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  // Destructure the formData (Now can use name instead of formData.name)
  const { name, email, password, confirmedPassword } = formData;

  // When any field changes(Typing), make a copy of formData(...formData), then set key:value (name:value)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // When onSubmit action triggered
  const onSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmedPassword) {
      console.log("Passwords do not match");
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>
        Create Your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text"> This site supports Gravatar</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            minLength="6"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary"
          onSubmit={(e) => onSubmit(e)}
        />
      </form>
      <p className="my-1">
        Aready have an account?
        <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};
