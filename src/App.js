import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import GameModeMenuSinglePlayer from './components/GameModeMenuSinglePlayer';
import GameModeMenuTwoPlayer from './components/GameModeMenuTwoPlayer';
import HowToPlay from './components/HowToPlay';
import SinglePlayerEasy from './components/SinglePlayerEasy';
import SinglePlayerHard from './components/SinglePlayerHard';
import TwoPlayerEasy from './components/TwoPlayerEasy';
import TwoPlayerHard from './components/TwoPlayerHard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-800 text-white">
        <Routes>
          {/* Define routes for each menu and game mode */}
          <Route path="/" element={<MainMenu />} />
          <Route path="/single-player-menu" element={<GameModeMenuSinglePlayer />} />
          <Route path="/two-player-menu" element={<GameModeMenuTwoPlayer />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/single-player-easy" element={<SinglePlayerEasy />} />
          <Route path="/single-player-hard" element={<SinglePlayerHard />} />
          <Route path="/two-player-easy" element={<TwoPlayerEasy />} />
          <Route path="/two-player-hard" element={<TwoPlayerHard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;