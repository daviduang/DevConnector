import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    studyfield: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  // Destructure the formData
  const { school, degree, studyfield, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };

  return (
    <Fragment>
      <h1 class="large text-primary">Add your Education</h1>
      <p class="lead">
        <i class="fas fa-user"></i>
        Add any School you have attended
      </p>
      <small> * = required fields</small>
      <form class="form" onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            value={degree}
            onChange={(e) => onChange(e)}
            name="degree"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            value={studyfield}
            onChange={(e) => onChange(e)}
            name="studyfield"
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
            Current School
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
            placeholder="Program Description"
            cols="30"
            rows="5"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small class="form-text"> Tell us about your program </small>
        </div>

        <input type="submit" class="btn btn-primary my-1" />

        <Link to="/dashboard" className="btn my-1">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
