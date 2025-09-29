import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-600 mb-4">404</h1>
          <p className="text-xl text-gray-500 mb-8">Page not found</p>
          <a
            href="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
