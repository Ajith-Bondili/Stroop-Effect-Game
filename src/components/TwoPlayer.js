import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const TwoPlayer = () => {
  const [displayWord, setDisplayWord] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 }); // Track Player 1 position
  const [player2Position, setPlayer2Position] = useState({ x: 0, y: 0 }); // Track Player 2 position
  const [winnerDeclared, setWinnerDeclared] = useState(false); // To prevent double scoring

  useEffect(() => {
    const generateNewWord = () => {
      const newDisplayWord = getRandomColor();
      let newDisplayColor = newDisplayWord;

      do {
        newDisplayColor = getRandomColor();
      } while (newDisplayColor === newDisplayWord); // Make sure color doesn't match word

      setDisplayWord(newDisplayWord);
      setDisplayColor(newDisplayColor);

      const remainingColors = colors.filter(color => color !== newDisplayWord);
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, 8); // Show 9 choices in total
      setGridColors([...shuffledRemainingColors, newDisplayWord].sort(() => Math.random() - 0.5));
      setWinnerDeclared(false); // Reset winner state for the new round
    };

    generateNewWord();
  }, [scorePlayer1, scorePlayer2]);

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
      setWinnerDeclared(true);
    } else if (player === 2 && player2Selected === correctAnswer) {
      setScorePlayer2(scorePlayer2 + 1);
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

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Display the target word */}
      <div className="text-4xl border-4 rounded-lg p-5 mb-10 text-center" style={{ color: displayColor }}>
        {displayWord}
      </div>

      {/* Display grid where players can move and select */}
      <div className="grid grid-cols-3 gap-5 max-w-lg">
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

      {/* Display scores for both players */}
      <div className="text-2xl mt-10">
        <span className="text-blue-500">Player 1 - Score: {scorePlayer1}</span> |{' '}
        <span className="text-red-500">Player 2 - Score: {scorePlayer2}</span>
      </div>
    </div>
  );
};

export default TwoPlayer;