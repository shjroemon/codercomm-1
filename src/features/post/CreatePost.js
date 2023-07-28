import React from "react";
import PostForm from "./PostForm";
import { useDispatch } from "react-redux";
import { createPost } from "./postSlice";

function CreatePost() {
  const dispatch = useDispatch();
  const submit = (post) => {
    return dispatch(createPost(post));
  };
  return <PostForm submit={submit} />;
}

export default CreatePost;
