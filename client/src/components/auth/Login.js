import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  // Construct formData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure the formData (Now can use name instead of formData.name)
  const { name, email, password, confirmedPassword } = formData;

  // When any field changes(Typing), make a copy of formData(...formData), then set key:value (name:value)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // When onSubmit action triggered
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    console.log("SUCCESS!");
    /*      
        const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/users", body, config);

        console.log(res.data);
      } catch (error) {
        console.error(error.res.data);
      }*/
  };

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
