import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  // Destructure the formData
  const { title, company, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Add your experiece</h1>
      <p class="lead">
        <i class="fas fa-user"></i>
        Add any position you have in the past
      </p>
      <small> * = required fields</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => onChange(e)}
            name="company"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => onChange(e)}
            name="location"
          />
        </div>

        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current Job
          </p>
        </div>

        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>

        <div class="form-group">
          <textarea
            name="description"
            placeholder="Job Description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small class="form-text"> Tell us about your job </small>
        </div>

        <input type="submit" class="btn btn-primary my-1" />

        <Link to="/dashboard" className="btn my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
