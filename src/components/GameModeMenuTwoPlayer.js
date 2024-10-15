import React from 'react';
import { Link } from 'react-router-dom';

const GameModeMenuTwoPlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">Two Player Game Modes</h1>
      <Link to="/two-player-easy" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Easy Mode
      </Link>
      <Link to="/two-player-hard" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Hard Mode
      </Link>
    </div>
  );
};

export default GameModeMenuTwoPlayer;