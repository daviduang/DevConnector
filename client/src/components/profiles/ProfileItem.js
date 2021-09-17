import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
/**
 * Inidividial profile item presented in /profiles page
 */
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Fragment>
      {" "}
      <div className="profile bg-light">
        <img className="round-img" src={avatar} alt="gravatarImg" />
        <div>
          <h2>{name}</h2>
          <p>
            {status} {company && <span>{company}</span>}
          </p>
          <p className my-1>
            {location && <span>{location}</span>}
          </p>
          <Link to={`/profile/${_id}`} className="btn btn-primary">
            View Profile
          </Link>
        </div>

        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="text-primary">
              <i className="fas fa-check"> {skill}</i>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

// Initialize props
ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
