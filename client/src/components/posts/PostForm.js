import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";

const PostForm = ({ createPost }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say sth....</h3>
      </div>

      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          createPost({ text });
          setText("");
        }}
      >
        <textarea
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
};

export default connect(null, { createPost })(PostForm);
