import React from 'react';

const HowToPlay = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl mb-10">How to Play</h1>
      
      <div className="text-lg leading-8 max-w-2xl">
        <h2 className="text-2xl mb-5">Game Objective:</h2>
        <p>The goal of the Stroop Test game is to match the color of the word displayed in the center of the screen with the literal word of the color in a grid of options.</p>

    
        <h2 className="text-2xl mt-8 mb-5">Two Player Mode:</h2>
        <ul className="list-disc list-inside">
          <li>Player 1 uses the <strong>WASD</strong> keys to move and <strong>'Q'</strong> to confirm their selection.</li>
          <li>Player 2 uses the <strong>arrow keys</strong> to move and <strong>'Enter'</strong> to confirm their selection.</li>
          <li>Both players compete to select the correct answer first and earn points.</li>
        </ul>

        <h2 className="text-2xl mt-8 mb-5">How to Play Example:</h2>
        <p>In each round, a word will be displayed in the center. Your task is to match the color of the word to its literal word. For example:</p>

        {/* Visual explanation (can be replaced with an image or diagram) */}
        <div className="flex flex-col items-center mt-5 mb-5">
          <div className="border p-4 bg-gray-600 text-4xl rounded-lg mb-3" style={{ color: 'red' }}>
            Green
          </div>
          <div className="text-2xl">⬇️ Match it to the literal color ⬇️</div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="p-4 bg-red-700 rounded-lg" style={{ color: 'green' }}>Black ❌</div>
            <div className="p-4 bg-red-700 rounded-lg" style={{ color: 'orange' }}>Green ❌</div>
            <div className="p-4 bg-green-700 rounded-lg" style={{ color: 'blue' }}>Red ✅</div>
          </div>
        </div>

        <p>This example shows the word "Green" written in red. The correct answer would be to select the word "Red" regardless of it's color</p>
      </div>
    </div>
  );
};

export default HowToPlay;