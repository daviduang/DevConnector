import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register }) => {
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
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmedPassword) {
      // Trigger setAlert action, passing down: alert msg, alert type, timemout(in ms)
      setAlert("Passwords do not match", "danger", 3000);
    } else {
      register({ name, email, password });
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
            //required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            //required
          />
          <small className="form-text"> This site supports Gravatar</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            //minLength="6"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            //required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            //minLength="6"
            name="confirmedPassword"
            value={confirmedPassword}
            onChange={(e) => onChange(e)}
            //required
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

Register.propTypes = {
  // snippet: ptfr
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

// connect ( STATE, {ACTIONs} ) ()
export default connect(null, { setAlert, register })(Register);
