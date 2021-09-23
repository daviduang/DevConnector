import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { removeComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment,
}) => (
  <div className="post bg-white my-1 p-1">
    {/* Gravatar & name */}
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img my-1" src={avatar} alt="gravatarImg" />
        <h4>{name}</h4>
      </Link>
    </div>

    {/* Comment content */}
    <div>
      <p className="my-1">{text}</p>
    </div>

    {/* Comment date */}
    <p className="post-date">
      {" "}
      Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
    </p>

    {!auth.loading && user === auth.user._id && (
      <button
        onClick={(e) => removeComment(postId, _id)}
        type="button"
        className="btn btn-danger"
      >
        <i className="fas fa-times" />
      </button>
    )}
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
