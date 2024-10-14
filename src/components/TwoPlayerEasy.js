import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const TwoPlayerEasy = () => {
  const [displayWord, setDisplayWord] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [level, setLevel] = useState(1); // Added level state to track levels
  const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 }); // Track Player 1 position
  const [player2Position, setPlayer2Position] = useState({ x: 0, y: 0 }); // Track Player 2 position
  const [winnerDeclared, setWinnerDeclared] = useState(false); // To prevent double scoring

  useEffect(() => {
    const generateNewWord = () => {
      const newDisplayWord = getRandomColor();
      let newDisplayColor = newDisplayWord;

      // For easy mode, make sure the display word color matches the text
      setDisplayWord(newDisplayWord);
      setDisplayColor(newDisplayColor);

      let gridSize = 3; // Default to 3 for the first few levels

      if (level >= 7 && level <= 10) {
        gridSize = 6; // Two rows of 3 colors
      } else if (level >= 11) {
        gridSize = 9; // Three rows of 3 colors each
      }

      const remainingColors = colors.filter(color => color !== newDisplayWord);
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, gridSize - 1);
      setGridColors([...shuffledRemainingColors, newDisplayWord].sort(() => Math.random() - 0.5)); // Shuffle grid colors

      setWinnerDeclared(false); // Reset winner state for the new round
    };

    generateNewWord();
  }, [scorePlayer1, scorePlayer2, level]); // Trigger on level change as well

  const handlePlayerMovement = (event) => {
    if (winnerDeclared) return; // Disable movement during the pause between rounds

    switch (event.key) {
      // Player 1 controls (WASD)
      case 'w':
        setPlayer1Position(pos => ({ ...pos, y: Math.max(pos.y - 1, 0) }));
        break;
      case 's':
        setPlayer1Position(pos => ({ ...pos, y: Math.min(pos.y + 1, 2) }));
        break;
      case 'a':
        setPlayer1Position(pos => ({ ...pos, x: Math.max(pos.x - 1, 0) }));
        break;
      case 'd':
        setPlayer1Position(pos => ({ ...pos, x: Math.min(pos.x + 1, 2) }));
        break;
      case 'q': // Confirm Player 1 selection
        checkWinner(1);
        break;

      // Player 2 controls (Arrow keys)
      case 'ArrowUp':
        setPlayer2Position(pos => ({ ...pos, y: Math.max(pos.y - 1, 0) }));
        break;
      case 'ArrowDown':
        setPlayer2Position(pos => ({ ...pos, y: Math.min(pos.y + 1, 2) }));
        break;
      case 'ArrowLeft':
        setPlayer2Position(pos => ({ ...pos, x: Math.max(pos.x - 1, 0) }));
        break;
      case 'ArrowRight':
        setPlayer2Position(pos => ({ ...pos, x: Math.min(pos.x + 1, 2) }));
        break;
      case 'Enter': // Confirm Player 2 selection
        checkWinner(2);
        break;
      default:
        break;
    }
  };

  // Function to check if the selected box is correct
  const checkWinner = (player) => {
    if (winnerDeclared) return; // Prevent multiple winners for the same round

    const correctAnswer = displayWord; // The correct word to match
    const player1Selected = gridColors[player1Position.y * 3 + player1Position.x];
    const player2Selected = gridColors[player2Position.y * 3 + player2Position.x];

    if (player === 1 && player1Selected === correctAnswer) {
      setScorePlayer1(scorePlayer1 + 1);
      setLevel(level + 1); // Increment level on correct answer
      setWinnerDeclared(true);
    } else if (player === 2 && player2Selected === correctAnswer) {
      setScorePlayer2(scorePlayer2 + 1);
      setLevel(level + 1); // Increment level on correct answer
      setWinnerDeclared(true);
    }

    if (winnerDeclared) {
      setTimeout(() => {
        setWinnerDeclared(false); // Start new round after 3 seconds
      }, 3000); // Pause for 3 seconds between rounds
    }
  };

  // Add event listener for key presses
  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);

    return () => {
      window.removeEventListener('keydown', handlePlayerMovement);
    };
  }, [player1Position, player2Position, gridColors]);

  const renderGrid = () => {
    let gridCols = 3; // Default grid columns for 3 colors

    if (level >= 7 && level <= 10) gridCols = 6; // Two rows
    if (level >= 11) gridCols = 9; // Three rows

    return (
      <div className={`grid grid-cols-${Math.min(gridCols, 3)} gap-5 max-w-lg`}>
        {gridColors.map((color, index) => {
          const isPlayer1Here = player1Position.y * 3 + player1Position.x === index;
          const isPlayer2Here = player2Position.y * 3 + player2Position.x === index;

          return (
            <div
              key={index}
              className={`bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 ${
                isPlayer1Here && isPlayer2Here
                  ? 'border-red-500 border-double border-4' // Outer red, inner blue for both players
                  : isPlayer1Here
                  ? 'border-blue-500 border-4'
                  : isPlayer2Here
                  ? 'border-red-500 border-4'
                  : ''
              }`}
              style={{
                color: color.toLowerCase(), // Apply the correct color for the text (based on the word)
                outline: isPlayer1Here && isPlayer2Here ? '4px solid blue' : '' // Inner outline blue if both players are here
              }}
            >
              {color}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Display the target word */}
      <div className="text-4xl border-4 rounded-lg p-5 mb-10 text-center" style={{ color: displayColor }}>
        {displayWord}
      </div>

      {/* Render the grid based on the level */}
      {renderGrid()}

      {/* Display scores for both players */}
      <div className="text-2xl mt-10">
        <span className="text-blue-500">Player 1 - Score: {scorePlayer1}</span> |{' '}
        <span className="text-red-500">Player 2 - Score: {scorePlayer2}</span>
      </div>

      {/* Display the current level */}
      <div className="text-2xl mt-5">Level: {level}</div>
    </div>
  );
};

export default TwoPlayerEasy;