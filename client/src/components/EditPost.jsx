import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Save, ArrowLeft, Loader } from "lucide-react";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get post ID from URL parameters
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  // Fetch post data when component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("You must be logged in to edit a post");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${process.env.BACKEND_URL}/posts/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error("Error fetching post:", error);

        toast.error("Failed to load post data. Please try again.");
        navigate("/posts");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPostData();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", content: "" };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      valid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
      valid = false;
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to update a post");
        navigate("/login");
        return;
      }

      // Make API request
      const response = await axios.put(
        `${process.env.BACKEND_URL}/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Post updated successfully!");
      navigate("/posts");
    } catch (error) {
      console.error("Error updating post:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update post. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading screen while fetching post data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="mt-4 text-gray-600">Loading post data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-400 to-amber-600 p-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              Edit Post
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
                placeholder="Enter a captivating title..."
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Post Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-3 rounded-md border ${
                  errors.content ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors`}
                placeholder="Write your thoughts here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/posts")}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors mr-4 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Posts
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 text-white bg-amber-600 rounded-md hover:bg-amber-700 transition-colors flex items-center ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;
