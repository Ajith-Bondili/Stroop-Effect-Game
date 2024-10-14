import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

// Function to get a random color from the colors array
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const useTimer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setMilliseconds(Date.now() - startTime);
    }, 10);

    return () => clearInterval(timer);
  }, [startTime]);

  const resetTimer = () => {
    setStartTime(Date.now());
  };

  const seconds = Math.floor(milliseconds / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');

  return { seconds, ms, milliseconds, resetTimer };
};

const SinglePlayer = () => {
  const [displayWord, setDisplayWord] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { seconds, ms, milliseconds, resetTimer } = useTimer();

  useEffect(() => {
    const generateNewWord = () => {
      const newDisplayWord = getRandomColor();
      let newDisplayColor = newDisplayWord;

      if (level >= 4 && level <= 7) {
        do {
          newDisplayColor = getRandomColor();
        } while (newDisplayColor === newDisplayWord);
      }
      setDisplayWord(newDisplayWord);
      setDisplayColor(newDisplayColor);

      let gridSize = 3;
      if (level >= 7 && level <= 10) {
        gridSize = 6;
      } else if (level >= 11) {
        gridSize = 9;
      }

      const remainingColors = colors.filter(color => color !== newDisplayWord);
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, gridSize - 1);
      const newGridColors = [...shuffledRemainingColors, newDisplayWord].sort(() => Math.random() - 0.5);

      setGridColors(newGridColors);
    };

    generateNewWord();
  }, [level]);

  const calculateScore = (timeInMilliseconds) => {
    const scoreMultiplier = 1000;
    const timeInSeconds = timeInMilliseconds / 1000;
    return Math.floor(scoreMultiplier / (timeInSeconds + 1));
  };

  const handleColorSelection = (selectedWord) => {
    if (selectedWord === displayWord) {
      const scoreIncrement = calculateScore(milliseconds);
      setScore(score + scoreIncrement);
      setLevel(level + 1);
      resetTimer();
    }
  };

  const renderGrid = () => {
    let gridCols = 3;
    if (level >= 7 && level <= 10) gridCols = 6;
    if (level >= 11) gridCols = 9;

    return (
      <div className={`grid grid-cols-${Math.min(gridCols, 3)} gap-5 max-w-lg`}>
        {gridColors.map((color, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 border-gray-600 hover:bg-gray-600 cursor-pointer"
            onClick={() => handleColorSelection(color)}
            style={{ color: color }}
          >
            {color}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="text-4xl border-4 rounded-lg p-5 mb-10 text-center" style={{ color: displayColor }}>
        {displayWord}
      </div>
      {renderGrid()}
      <div className="text-2xl mt-10">
        Level: {level} | Score: {score}
      </div>
      <div className="text-2xl mt-5">
        Timer: {seconds}:{ms}
      </div>
    </div>
  );
};

export default SinglePlayer;