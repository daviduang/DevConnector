import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
/**
 * Entry file of Profile page
 */
const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {/* If profile is loading or there is no profile, show spinner */}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>

          {/* If logged in and loaded, show this button */}
          {auth.isAuthenticated && auth.loading === false && auth.user._id && (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit Your Profile
            </Link>
          )}

          <div class="profile-grid my-1">
            {/* Top block */}
            <ProfileTop profile={profile} />
            {/* Middle block */}
            <ProfileAbout profile={profile} />

            {/* Experience block */}
            <div class="profile-exp bg-white p-2">
              <h2 class="text-primary">Experiences</h2>
              {/* If the user has experience */}
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience.id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4> No experience </h4>
              )}
            </div>

            {/* Education block */}
            <div class="profile-edu bg-white p-2">
              <h2 class="text-primary">Educations</h2>
              {/* If the user has education */}
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education.id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4> No education </h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
