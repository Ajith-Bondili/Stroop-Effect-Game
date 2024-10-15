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

const SinglePlayerHard = ({ mode }) => {
  const [displayWord, setDisplayWord] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { seconds, ms, milliseconds, resetTimer } = useTimer();

  useEffect(() => {
    const generateNewWord = () => {
      // Randomly select a display word and a display color for the word
      let newDisplayWord = getRandomColor();
      let newDisplayColor = getRandomColor();

      // Ensure the color doesn't match the word (for hard mode)
      if (mode === 'hard') {
        do {
          newDisplayColor = getRandomColor();
        } while (newDisplayColor === newDisplayWord);
      }

      setDisplayWord(newDisplayWord);
      setDisplayColor(newDisplayColor);

      // Set up grid size based on level
      let gridSize = 3;
      if (level >= 7 && level <= 10) {
        gridSize = 6;
      } else if (level >= 11) {
        gridSize = 9;
      }

      // Get remaining colors, shuffle them, and remove the displayed word
      const remainingColors = colors.filter(color => color !== newDisplayWord);

      // Shuffle the remaining colors and pick gridSize - 1 random colors
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, gridSize - 1);

      // Correct answer should be based on the color of the displayed word, but displayed in a random color
      const correctAnswer = colors.find(color => color === newDisplayColor); // Word that matches the color

      // Now, generate randomized colors for the grid, ensuring the correct answer is not displayed in the same color as its meaning
      const generateRandomizedColorSet = (word) => {
        let randomColor;
        do {
          randomColor = getRandomColor();
        } while (randomColor === word); // Ensure word's color doesn't match its text
        return randomColor;
      };

      // Generate the final grid with randomized color assignments
      const finalGrid = [...shuffledRemainingColors, correctAnswer].map((word) => ({
        word,
        color: generateRandomizedColorSet(word),
      })).sort(() => Math.random() - 0.5); // Shuffle the final grid

      setGridColors(finalGrid);
    };

    generateNewWord();
  }, [level, mode]);

  // Function to calculate score based on the time taken to answer
  const calculateScore = (timeInMilliseconds) => {
    const scoreMultiplier = 1000;
    const timeInSeconds = timeInMilliseconds / 1000;
    return Math.floor(scoreMultiplier / (timeInSeconds + 1));
  };

  // Handle the player's selection
  const handleColorSelection = (selectedWord) => {
    const correctAnswer = colors.find(color => color === displayColor); // The correct answer is the word that matches the displayed color

    if (selectedWord === correctAnswer) {
      const scoreIncrement = calculateScore(milliseconds);
      setScore(score + scoreIncrement);
      setLevel(level + 1);
      resetTimer();
    }
  };

  // Render the grid of color-word options
  const renderGrid = () => {
    let gridCols = 3;
    if (level >= 7 && level <= 10) gridCols = 6;
    if (level >= 11) gridCols = 9;

    return (
      <div className={`grid grid-cols-${Math.min(gridCols, 3)} gap-5 max-w-lg`}>
        {gridColors.map((item, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 border-gray-600 hover:bg-gray-600 cursor-pointer"
            onClick={() => handleColorSelection(item.word)}
            style={{ color: item.color }} // Randomized color for the word
          >
            {item.word} {/* Display the word */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Display the word with its random color */}
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

export default SinglePlayerHard;