import React, { useState } from 'react';
import SinglePlayerEasy from './SinglePlayerEasy'; // Import your Easy mode
import SinglePlayerHard from './SinglePlayerHard'; // Import your Challenging mode

const GameModeMenu = () => {
  const [gameMode, setGameMode] = useState(null);

  if (gameMode === 'easy') {
    return <SinglePlayerEasy />; // Link to Easy mode
  }

  if (gameMode === 'hard') {
    return <SinglePlayerHard />; // Link to Challenging mode
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">Single Player Game Modes</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setGameMode('easy')}
      >
        Beginner Friendly
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setGameMode('hard')}
      >
        Challenging
      </button>
    </div>
  );
};

export default GameModeMenu;