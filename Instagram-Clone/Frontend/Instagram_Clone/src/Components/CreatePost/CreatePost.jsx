import React, { useState } from "react";
import Modal from "react-modal";
import { supabase } from "../../Services/SupabaseClient.jsx";

Modal.setAppElement(document.getElementById("root"));

const CreatePost = ({ closeModal, updateNewPost }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [hashtag, setHashtag] = useState("");

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleShare = async () => {
    if (selectedImage && caption && hashtag) {
      try {
        const response = await fetch(`${API_URL}/api/posts/create`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: selectedImage,
            caption,
            hashtags: hashtag,
          }),
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        await response.json();
        updateNewPost()
        closeModal();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Please provide all the fields");
    }
  };

  const handleUpload = async (image) => {
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { data, error } = await supabase.storage
        .from("images")
        .upload(fileName, image);

      if (error) {
        console.error("Upload failed: ", error);
        return;
      }

      console.log("Uploaded data: ", data);

      const urlInfo = supabase.storage
        .from("images")
        .getPublicUrl(data.path);

      setSelectedImage(urlInfo.data.publicUrl);
      console.log("File Link Retrieved Successfully: ", urlInfo.data.publicUrl);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      className="flex items-center justify-center h-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-md mx-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-4xl"
        >
          &times;
        </button>
        <h2 className="text-xl">Create Post</h2>
        <div className="mb-4">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-48 sm:h-64 mb-4 rounded-md object-cover"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 bg-gray-200 flex items-center justify-center mb-4">
              <label className="cursor-pointer">
                <span className="text-gray-600">Selec a Photo</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          )}

          <textarea
            placeholder="Add a caption"
            className="w-full p-2 border border-gay-300 mb-4 rounded"
            id=""
            cols="30"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Add hashtags"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
          />
          <button
            onClick={handleShare}
            className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            Share
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
