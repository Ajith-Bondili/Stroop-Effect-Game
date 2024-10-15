import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const TwoPlayerEasy = () => {
  const [displayWord, setDisplayWord] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [level, setLevel] = useState(1);
  const [player1Position, setPlayer1Position] = useState({ x: 0, y: 0 });
  const [player2Position, setPlayer2Position] = useState({ x: 0, y: 0 });
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const generateNewWord = () => {
      const newDisplayWord = getRandomColor();
      setDisplayWord(newDisplayWord);

      let gridSize = 3; // Default to 3 options for levels 1-3

      if (level >= 7 && level <= 10) {
        gridSize = 6; // Two rows of 3 colors
      } else if (level >= 11) {
        gridSize = 9; // Three rows of 3 colors each
      }

      const remainingColors = colors.filter(color => color !== newDisplayWord);
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, gridSize - 1);

      const gridOptions = shuffledRemainingColors.map(color => ({
        word: color,
        color: color,
      }));

      const correctAnswerItem = { word: newDisplayWord, color: newDisplayWord };
      gridOptions.splice(Math.floor(Math.random() * gridSize), 0, correctAnswerItem);

      setGridColors(gridOptions);
      setWinnerDeclared(false);

      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 200);
    };

    generateNewWord();
  }, [scorePlayer1, scorePlayer2, level]);

  const handlePlayerMovement = (event) => {
    if (winnerDeclared) return;

    // Determine the maximum x and y positions based on level
    let gridCols = 3;
    if (level >= 7 && level <= 10) gridCols = 6;
    if (level >= 11) gridCols = 9;

    let maxY = Math.floor((gridCols - 1) / 3); // Max Y is determined by the number of rows (3 items per row)
    let maxX = (gridCols % 3 === 0 ? 2 : (gridCols % 3) - 1); // Max X is determined by the last row

    switch (event.key) {
      // Player 1 controls (WASD)
      case 'w':
        setPlayer1Position(pos => ({ ...pos, y: Math.max(pos.y - 1, 0) }));
        break;
      case 's':
        setPlayer1Position(pos => ({ ...pos, y: Math.min(pos.y + 1, maxY) }));
        break;
      case 'a':
        setPlayer1Position(pos => ({ ...pos, x: Math.max(pos.x - 1, 0) }));
        break;
      case 'd':
        setPlayer1Position(pos => ({ ...pos, x: Math.min(pos.x + 1, maxX) }));
        break;
      case 'q':
        checkWinner(1);
        break;

      // Player 2 controls (Arrow keys)
      case 'ArrowUp':
        setPlayer2Position(pos => ({ ...pos, y: Math.max(pos.y - 1, 0) }));
        break;
      case 'ArrowDown':
        setPlayer2Position(pos => ({ ...pos, y: Math.min(pos.y + 1, maxY) }));
        break;
      case 'ArrowLeft':
        setPlayer2Position(pos => ({ ...pos, x: Math.max(pos.x - 1, 0) }));
        break;
      case 'ArrowRight':
        setPlayer2Position(pos => ({ ...pos, x: Math.min(pos.x + 1, maxX) }));
        break;
      case 'Enter':
        checkWinner(2);
        break;
      default:
        break;
    }
  };

  // Function to check if the selected box is correct
  const checkWinner = (player) => {
    if (winnerDeclared) return;

    const correctAnswer = displayWord;
    const player1Selected = gridColors[player1Position.y * 3 + player1Position.x];
    const player2Selected = gridColors[player2Position.y * 3 + player2Position.x];

    if (player === 1 && player1Selected && player1Selected.word === correctAnswer) {
      setScorePlayer1(scorePlayer1 + 1);
      setLevel(level + 1);
      setWinnerDeclared(true);
    } else if (player === 2 && player2Selected && player2Selected.word === correctAnswer) {
      setScorePlayer2(scorePlayer2 + 1);
      setLevel(level + 1);
      setWinnerDeclared(true);
    }

    if (winnerDeclared) {
      setTimeout(() => {
        setWinnerDeclared(false);
      }, 3000);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handlePlayerMovement);

    return () => {
      window.removeEventListener('keydown', handlePlayerMovement);
    };
  }, [player1Position, player2Position, gridColors]);

  const renderGrid = () => {
    let gridCols = 3;

    if (level >= 7 && level <= 10) gridCols = 6;
    if (level >= 11) gridCols = 9;

    return (
      <div className={`grid grid-cols-${Math.min(gridCols, 3)} gap-5 max-w-lg`}>
        {gridColors.map((colorObj, index) => {
          const isPlayer1Here = player1Position.y * 3 + player1Position.x === index;
          const isPlayer2Here = player2Position.y * 3 + player2Position.x === index;

          return (
            <div
              key={index}
              className={`bg-gray-700 p-10 text-2xl text-center rounded-lg border-2 ${
                isPlayer1Here && isPlayer2Here
                  ? 'border-red-500 border-double border-4'
                  : isPlayer1Here
                  ? 'border-blue-500 border-4'
                  : isPlayer2Here
                  ? 'border-red-500 border-4'
                  : ''
              }`}
              style={{
                color: colorObj.color.toLowerCase(),
                outline: isPlayer1Here && isPlayer2Here ? '4px solid blue' : ''
              }}
            >
              {colorObj.word}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div
        className={`text-4xl border-4 rounded-lg p-5 mb-10 text-center transition-opacity duration-2000 ${
          blink ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ color: displayWord }}
      >
        {displayWord}
      </div>

      {renderGrid()}

      <div className="text-2xl mt-10">
        <span className="text-blue-500">Player 1 - Score: {scorePlayer1}</span> |{' '}
        <span className="text-red-500">Player 2 - Score: {scorePlayer2}</span>
      </div>

      <div className="text-2xl mt-5">Level: {level}</div>
    </div>
  );
};

export default TwoPlayerEasy;