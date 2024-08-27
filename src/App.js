import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import SinglePlayer from './components/SinglePlayer';

function App() {
  const [gameMode, setGameMode] = useState(null); // Track selected game mode

  const handleModeSelect = (mode) => {
    setGameMode(mode); // Set game mode based on user selection
  };

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
      {/* Conditionally render based on the selected game mode */}
      {gameMode === null && <MainMenu onModeSelect={handleModeSelect} />}
      {gameMode === 'single-player' && <SinglePlayer />}
      {gameMode === 'two-player' && (
        <div>
          {/* Placeholder for future two-player implementation */}
          <h1 className="text-2xl mb-4">Two-Player Mode (Coming Soon)</h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setGameMode(null)}
          >
            Back to Main Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default App;