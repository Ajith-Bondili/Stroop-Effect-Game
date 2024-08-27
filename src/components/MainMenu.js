import React from 'react';

const MainMenu = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl mb-8">Stroop Test</h1>
      <div className="flex gap-5">
        <button
          className="bg-gray-700 text-white py-3 px-6 text-lg rounded hover:bg-gray-600"
          onClick={() => onModeSelect('single-player')}
        >
          1-Player
        </button>
        <button
          className="bg-gray-700 text-white py-3 px-6 text-lg rounded hover:bg-gray-600"
          onClick={() => onModeSelect('two-player')}
        >
          2-Player <br /> Local
        </button>
      </div>
      <div className="mt-8">
        <button className="bg-gray-700 text-white py-2 px-5 text-lg rounded hover:bg-gray-600">
          How to Play
        </button>
      </div>
    </div>
  );
};

export default MainMenu;