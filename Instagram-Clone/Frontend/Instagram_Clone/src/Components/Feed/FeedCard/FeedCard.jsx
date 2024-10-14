import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaRegBookmark,
} from "react-icons/fa";
import PostDetailPage from "../PostDetailPage/PostDetailPage";
import { Link } from "react-router-dom";

const FeedCard = ({ feed, onLike, onUnlike, currentUserId, updateNewPost, setFeeds }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [newComment, setNewComment] = useState("");
  const timeAgo = formatDistanceToNow(new Date(feed.time), { addSuffix: true });
  const isLikedByCurrentUser = feed.likedByUserIds.includes(currentUserId);
  const [isPostDetailModal, setIsPostDetailModal] = useState(false);
  const [updateNewComment, setUpdateNewComment] = useState(false);

  const updateCommentList = () => {
    setUpdateNewComment((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsPostDetailModal(false);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/posts/addComments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: feed.id,
          comment: newComment,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(data);

      // Optimistically update the comment count in the feed
      setFeeds((prevFeeds) =>
        prevFeeds.map((post) =>
          post.id === feed.id ? { ...post, commentCount: post.commentCount + 1 } : post
        )
      );

      setNewComment("");
      updateNewPost(); 
      updateCommentList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full mx-auto mb-6 bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-3">
          <a href="" className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={feed.profileImg}
                alt={feed.username}
                className="w-full h-full object-cover"
              />
            </div>
          </a>
          <div className="flex items-center gap-x-2">
            <Link to={`/profile/${feed.username}`}>
              <p className="text-black text-sm font-medium">{feed.username}</p>
            </Link>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <p className="text-black text-sm">{timeAgo}</p>
          </div>
        </div>
      </div>
      <div className="w-full max-h-[75vh] overflow-hidden rounded-lg mb-3">
        <img
          src={feed.postImg}
          alt={feed.caption}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-3">
          <button
            className="text-black"
            onClick={() => {
              isLikedByCurrentUser ? onUnlike(feed.id) : onLike(feed.id);
            }}
          >
            {isLikedByCurrentUser ? (
              <FaHeart className="text-red-500"></FaHeart>
            ) : (
              <FaRegHeart></FaRegHeart>
            )}
          </button>
          <button className="text-black">
            <FaRegComment></FaRegComment>
          </button>
          <button className="text-black">
            <FaRegPaperPlane></FaRegPaperPlane>
          </button>
        </div>

        <button className="text-black">
          <FaRegBookmark></FaRegBookmark>
        </button>
      </div>
      {/* Like Count */}
      <div className="flex items-center gap-x-2 text-base text-black font-medium my-2">
        {feed.likeCount} likes
      </div>

      {/* Caption */}
      <div className="w-full text-sm text-black font-thin mb-2">
        <a href="" className="text-black font-medium">
          {feed.username}{" "}
        </a>{" "}
        {feed.caption}
      </div>

      {/* Comment Count */}
      <div className="w-full text-sm text-gray-600 font-thin mb-2 cursor-pointer">
        <a
          className="text-gray-600 font-normal"
          onClick={() => setIsPostDetailModal(true)}
        >
          View all {feed.commentCount} comments
        </a>
      </div>

      {/* Add Comment  */}
      <div className="w-full flex items-center justify-between border-b border-gray-300 pt-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
          placeholder="Add a Comment ...."
        />
        <div className="text-black">
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white py-1 px-3 text-sm rounded"
          >
            Post
          </button>
        </div>
      </div>
      {isPostDetailModal && (
        <PostDetailPage
          feed={feed}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          isPostDetailModal={isPostDetailModal}
          onClose={handleModalClose}
          updateNewComment={updateNewComment}
        />
      )}
    </div>
  );
};

export default FeedCard;
