import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

function PostDetailPage({
  isPostDetailModal,
  onClose,
  feed,
  handleAddComment,
  newComment,
  setNewComment,
  updateNewComment,
}) {
  const [comments, setComments] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchComments = async () => {
      if (isPostDetailModal) {
        try {
          const response = await fetch(
            `${API_URL}/api/posts/getComments/${feed.id}`
          );
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const data = await response.json();
          console.log(data);
          setComments(data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchComments();
  }, [isPostDetailModal, updateNewComment]);

  return (
    <Modal
      isOpen={isPostDetailModal}
      onRequestClose={onClose}
      className="flex items-center justify-center h-full w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg p-4 md:p-6 h-2/3 w-11/12 md:w-4/5 lg:p-8 mx-4 relative flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-4xl"
        >
          &times;
        </button>
        <div className="hidden md:flex w-full md:w-1/2 h-full justify-center items-center bg-gray-100 p-4 rounded-lg">
          <img
            src={feed.postImg}
            alt={feed.caption}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 h-full flex flex-col px-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-x-3">
              <a href="#" className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={feed.profileImg}
                    alt={feed.username}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
              <div className="flex items-center gap-x-2">
                <p className="text-black text-sm font-medium">
                  {feed.username}
                </p>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <div
            className="mb-2 overflow-y-auto flex-1"
            style={{ maxHeight: '300px' }}
          >
            {comments &&
              comments.map((comment) => (
                <div key={comment.id} className="flex items-center mb-2 gap-3">
                  <p className="font-bold">{comment.postedBy.username}</p>
                  <p>{comment.comment}</p>
                </div>
              ))}
          </div>
          <div className="w-full flex items-center justify-between border-b border-gray-300 pt-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-gray-600 py-2"
              placeholder="Add a Comment ...."
            />
            <div className="text-black">
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white py-1 px-1 text-sm rounded"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>                                                                                                                                                                                                                                                                
    </Modal>
  );
}

export default PostDetailPage;