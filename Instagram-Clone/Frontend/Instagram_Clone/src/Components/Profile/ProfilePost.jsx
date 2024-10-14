import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import DeletePost from "../DeletePostModal/DeletePostModal";

const ProfilePosts = ({ posts, updateNewPost, user }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const currentUserId = localStorage.getItem("id");

  const handleDeleteClick = (postId) => {
    setSelectedPost(postId);
    openDeleteModal();
  };

  const deletePost = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/posts/delete/${selectedPost}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      closeDeleteModal();
      updateNewPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="p-4 grid grid-cols-3 gap-4">
        {posts.map((item) => (
          <div key={item.id} className="relative group flex flex-col items-left justify-center">
            <img
              key={item.id}
              src={item.image}
              alt={`Post ${item.id}`}
              className="lg:w-60 lg:h-60 md:w-48 md:h-48 sm:w-40 sm:h-40 object-contain justify-center items-center"
              />
            {user.id === parseInt(currentUserId) ? (
              <div
                className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => handleDeleteClick(item.id)}
              >
                <AiOutlineDelete className="text-white w-6 h-6"></AiOutlineDelete>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {isDeleteModalOpen && (
        <DeletePost
          onClose={closeDeleteModal}
          onConfirm={deletePost}
        ></DeletePost>
      )}
    </>
  );
};

export default ProfilePosts;
