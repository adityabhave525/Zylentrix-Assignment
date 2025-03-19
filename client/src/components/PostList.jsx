import { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { showDeleteToast } from "./DeleteToast";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/posts`)
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));
  }, [posts]);

  const onUpdate = (id) => {
    try {
      navigate(`/posts/edit/${id}`);      
    } catch (e) {
      console.log(e);
      toast.error('Could Not Update Post')
    }
  };

  const onDelete = async (id) => {
    try {

      const token = localStorage.getItem('token')
      const response = await axios.delete(`${process.env.BACKEND_URL}/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const message = response.data

      showDeleteToast(`Post #${id} has been deleted`);
      console.log(message);
      console.log(`Delete post with ID: ${id}`);
    } catch (e) {
      console.log(e);
      toast.error('Could Not Delete Post')
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="max-w-screen mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Latest Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                    By: {post.author.email}
                  </span>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => onUpdate(post._id)}
                    className="flex items-center px-3 py-2 bg-amber-50 text-amber-600 rounded-md hover:bg-amber-100 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(post._id)}
                    className="flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts available</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostList;
