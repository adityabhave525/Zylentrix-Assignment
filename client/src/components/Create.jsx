import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Send, Image } from 'lucide-react';

const Create = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    content: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { title: '', content: '' };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      valid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
      valid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      valid = false;
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
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
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('You must be logged in to create a post');
        navigate('/login');
        return;
      }
      
      // Make API request
      const response = await axios.post(
        `${process.env.BACKEND_URL}/posts`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      toast.success('Post created successfully!');
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create post. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <Image className="mr-2" size={24} />
            Create New Post
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Enter a captivating title..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Post Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              className={`w-full px-4 py-3 rounded-md border ${errors.content ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
              placeholder="Write your thoughts here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Creating...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;