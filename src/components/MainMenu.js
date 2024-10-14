import React, { useState } from 'react';
import GameModeMenu from './GameModeMenu.js'; // Import the Game Mode menu for 1-player
import GameModeMenuTwoPlayer from './GameModeMenuTwoPlayer.js';

const MainMenu = () => {
  const [menuState, setMenuState] = useState('main'); // Controls which menu to show

  if (menuState === '1-player') {
    // Show the Game Mode menu when 1-Player is selected
    return <GameModeMenu />;
  }

  // Placeholder for 2-Player (can be added later)
  if (menuState === '2-player') {
    return <GameModeMenuTwoPlayer />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">Stroop Test</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setMenuState('1-player')}
      >
        1-Player
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setMenuState('2-player')}
      >
        2-Player
      </button>
    </div>
  );
};

export default MainMenu;