const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

/**
 * @route    POST api/posts
 * @desc     Create a post
 * @access   Private
 */
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      // save and return the post as response
      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    GET api/posts
 * @desc     Get all posts
 * @access   Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route    GET api/posts/:id
 * @desc     Get post by ID
 * @access   Private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // If no post found
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    // If the Object Id is not valid
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found!" });
    }

    res.status(500).send("Server Error");
  }
});

/**
 * @route    DELETE api/posts/:id
 * @desc     Delete post by ID
 * @access   Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not Authourized" });
    }

    await post.remove();
    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);

    // If the Object Id is not valid
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found!" });
    }

    res.status(500).send("Server Error");
  }
});

/**
 * @route    PUT api/posts/like/:id
 * @desc     Like a post
 * @access   Private
 */
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post is already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already been liked" });
    }

    // add the userId to the 'likes' array in target 'post'
    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }
});

/**
 * @route    PUT api/posts/unlike/:id
 * @desc     Unlike a post
 * @access   Private
 */
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    // get the corresponding post by the request post id
    const post = await Post.findById(req.params.id);

    // check if post is not liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length == 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    // get the index of removed the user
    // convert 'likes' array's user into string, then get the index of the request user in 'likes' array
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // from remove index, remove  1 element
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send();
  }
});

/**
 * @route    POST api/posts/comment/:id
 * @desc     Create a comment on a post
 * @access   Private
 */
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      // create a new comment
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      // add the new comment to comments list
      post.comments.unshift(newComment);

      // save and return the comments list as response
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route    DELETE api/posts/comment/:id/:comment_id
 * @desc     Delete a comment on a post
 * @access   Private
 */
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // check if comment exist
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // prevent from deleting other user's comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User unauthorized" });
    }

    // Get the index of the comments:
    // 1. map through the whole list of comments object, take out comment id
    // 2. get the index of removed comment id
    const removeIndex = post.comments
      .map((comment) => comment._id.toString())
      .indexOf(req.params.comment_id);

    // from remove index, remove 1 element
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
