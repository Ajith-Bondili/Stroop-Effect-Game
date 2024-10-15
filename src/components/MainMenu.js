import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">Stroop Test</h1>
      <Link to="/single-player-menu" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        1-Player
      </Link>
      <Link to="/two-player-menu" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
        2-Player
      </Link>
      <Link to="/how-to-play" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
        How to Play
      </Link>
    </div>
  );
};

export default MainMenu;