import React from "react";
import { FiEdit3, FiUsers, FiLock, FiShare2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                PostsApp
              </h1>
            </motion.div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md hover:opacity-90 transition-opacity"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 lg:pt-32">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                <span className="block text-gray-900">Share your thoughts</span>
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2">
                  with the world
                </span>
              </h2>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl mx-auto">
                Create, share, and engage with posts from people around the
                globe. Join our community of creators and start sharing your
                story today.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <motion.button
                  onClick={() => navigate("/signup")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  Get started for free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 text-indigo-600 bg-white border-2 border-indigo-100 rounded-lg font-medium hover:border-indigo-200 transition-colors"
                >
                  Learn more
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" {...fadeIn}>
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to express yourself
            </p>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
            {[
              {
                icon: <FiEdit3 className="h-6 w-6" />,
                title: "Create and Edit Posts",
                description:
                  "Write, edit, and manage your posts with our intuitive editor. Express yourself freely with rich text formatting.",
              },
              {
                icon: <FiUsers className="h-6 w-6" />,
                title: "Multi-User Support",
                description:
                  "Connect with other users, follow their content, and build your own community of followers.",
              },
              {
                icon: <FiLock className="h-6 w-6" />,
                title: "Secure Access",
                description:
                  "Your content is protected with state-of-the-art security. Control who can view and interact with your posts.",
              },
              {
                icon: <FiShare2 className="h-6 w-6" />,
                title: "Easy Sharing",
                description:
                  "Share your posts across various platforms and reach a wider audience with just one click.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block mt-2">Start your journey today.</span>
            </h2>
            <motion.button
              onClick={() => navigate("/signup")}
              className="mt-8 px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started for free
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Company
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Team
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="" className="text-gray-500 hover:text-gray-700">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-gray-500">
              &copy; 2025 PostsApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
