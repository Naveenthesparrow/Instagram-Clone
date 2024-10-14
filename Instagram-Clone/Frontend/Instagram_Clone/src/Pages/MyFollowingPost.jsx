import React from "react";
import { useOutletContext } from "react-router-dom";
import MyFollowingFeed from "../Components/Feed/MyFollowingFeed";

export default function MyFollowingPost() {
  const { newPost, updateNewPost } = useOutletContext();

  return (
    <>
      <MyFollowingFeed
        newPost={newPost}
        updateNewPost={updateNewPost}
      ></MyFollowingFeed>
    </>
  );
}
