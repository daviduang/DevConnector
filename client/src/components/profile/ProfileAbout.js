import React, { Fragment } from "react";
import PropTypes from "prop-types";
/**
 * About component in profile page: Middle block
 */
const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          {/* Split the name string, take the first name */}
          <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <div className="line"></div>
      <div className="text-primary">Skill Set</div>
      <div className="skills">
        {/* Maping the skills list to present them */}
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check"></i>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
