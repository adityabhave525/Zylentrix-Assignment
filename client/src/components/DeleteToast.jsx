import React from 'react';
import toast from 'react-hot-toast';
import { Trash2, Check } from 'lucide-react';

// Custom toast component
const DeleteToast = ({ t, message }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">Post Deleted</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <Check className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

// Function to show the delete toast
export const showDeleteToast = (message = "The post has been successfully deleted") => {
  return toast.custom(
    (t) => <DeleteToast t={t} message={message} />,
    {
      duration: 3000,
      position: 'bottom-right',
    }
  );
};