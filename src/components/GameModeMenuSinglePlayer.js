import React from 'react';
import { Link } from 'react-router-dom';

const GameModeMenuSinglePlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">Single Player Game Modes</h1>
      <Link to="/single-player-easy" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        Beginner Friendly
      </Link>
      <Link to="/single-player-hard" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Challenging
      </Link>
    </div>
  );
};

export default GameModeMenuSinglePlayer;