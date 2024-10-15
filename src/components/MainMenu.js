import React, { useState } from 'react';
import GameModeMenuSinglePlayer from './GameModeMenuSinglePlayer.js'; // Import the Game Mode menu for 1-player
import GameModeMenuTwoPlayer from './GameModeMenuTwoPlayer.js';
import HowToPlay from './HowToPlay'; // Import the How to Play component


const MainMenu = () => {
  const [menuState, setMenuState] = useState('main'); // Controls which menu to show

  if (menuState === '1-player') {
    // Show the Game Mode menu when 1-Player is selected
    return <GameModeMenuSinglePlayer />;
  }

  // Placeholder for 2-Player (can be added later)
  if (menuState === '2-player') {
    return <GameModeMenuTwoPlayer />;
  }

  if (menuState === 'how-to-play') {
    return <HowToPlay onBack={() => setMenuState('main')} />;
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
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setMenuState('2-player')}
      >
        2-Player
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setMenuState('how-to-play')}
      >
        How to Play
      </button>
    </div>
  );
};

export default MainMenu;