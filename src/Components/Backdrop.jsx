import React from 'react';

const Backdrop = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed h-screen inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex items-center justify-center space-x-2 animate-bounce">
        <h1 className='font-bold text-2xl text-white'>LOADING</h1>
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default Backdrop;
