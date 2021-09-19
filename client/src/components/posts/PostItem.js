import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  addLike,
  removeLike,
  deletePost,
  createPost,
} from "../../actions/post";

/**
 * Present a single post item
 */
const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  deletePost,
  removeLike,
  showActions, // true if shows all button items
}) => (
  <div className="posts">
    <div className="post bg-white my-1 p-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img my-1" src={avatar} alt="gravatarImg" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{text}</p>

        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            {/* Like button */}
            <button onClick={(e) => addLike(_id)} className="btn">
              <i className="fas fa-thumbs-up"></i>
              <span> {likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            {/* Unlike button */}
            <button onClick={(e) => removeLike(_id)} className="btn">
              <i className="fas fa-thumbs-down"></i>
            </button>
            {/* Discuession button */}
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {/* The delete button only shows to the logged in user's post */}
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
  createPost,
})(PostItem);
