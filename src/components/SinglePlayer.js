import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

// Function to get a random color from the colors array
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// Function to start and manage the timer, with reset capability
const useTimer = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [startTime, setStartTime] = useState(Date.now()); // Track the starting time of the timer

  useEffect(() => {
    const timer = setInterval(() => {
      setMilliseconds(Date.now() - startTime);
    }, 10);

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, [startTime]); // Re-run the timer when `startTime` changes (i.e., when it's reset)

  // Function to reset the timer by updating the start time
  const resetTimer = () => {
    setStartTime(Date.now());
  };

  // Format the time to seconds:milliseconds
  const seconds = Math.floor(milliseconds / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');

  return { seconds, ms, resetTimer, milliseconds };
};

const SinglePlayer = () => {
  const [displayWord, setDisplayWord] = useState(''); // Word to display
  const [displayColor, setDisplayColor] = useState(''); // Color of the word
  const [gridColors, setGridColors] = useState([]); // Store colors for the grid words
  const [score, setScore] = useState(0); // Score state
  const [level, setLevel] = useState(1); // Level state
  const { seconds, ms, resetTimer, milliseconds } = useTimer(); // Get timer values from useTimer function

  // Function to generate the word and color for the main display
  const generateNewWord = () => {
    const newDisplayWord = getRandomColor(); // Select the word to display
    const newDisplayColor = getRandomColor(); // Set a random color for the word display
    setDisplayWord(newDisplayWord);
    setDisplayColor(newDisplayColor);

    // Generate the grid colors
    const remainingColors = colors.filter(color => color !== newDisplayWord); // Remove the displayed word from the color pool
    const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, 8); // Shuffle and take 8 random colors

    // Insert the correct color (meaning of the displayed word) in a random position
    const correctAnswerIndex = Math.floor(Math.random() * 9); // Pick a random position for the correct answer
    const newGridColors = [...shuffledRemainingColors]; // Start with the 8 shuffled colors
    newGridColors.splice(correctAnswerIndex, 0, newDisplayWord); // Insert the correct word at the random position

    setGridColors(newGridColors); // Update the grid colors with unique values
  };

  // Function to calculate score based on speed (in milliseconds)
  const calculateScore = (timeInMilliseconds) => {
    const scoreMultiplier = 1000; // You can adjust this multiplier for larger scores
    const timeInSeconds = timeInMilliseconds / 1000;
    return Math.floor(scoreMultiplier / (timeInSeconds + 1)); // Prevents division by zero and keeps the score large
  };

  // Initialize the game state
  useEffect(() => {
    generateNewWord();
  }, []);

  // Handle player's selection of color
  const handleColorSelection = (selectedWord) => {
    if (selectedWord === displayWord) {
      const scoreIncrement = calculateScore(milliseconds); // Calculate score increment
      setScore(score + scoreIncrement); // Update score with large whole number
      setLevel(level + 1); // Increment the level if the correct word is selected
      resetTimer(); // Reset the timer if the guess is correct
    }
    generateNewWord(); // Generate a new word and color after submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Layout: score on the left, timer and level on the right */}
      <div className="absolute top-1/4 left-20">
        <div className="text-4xl md:text-5xl lg:text-6xl mb-2">Score</div> {/* Responsive text size */}
        <div className="text-4xl md:text-5xl lg:text-6xl mb-2">{score}</div> {/* Responsive text size */}
      </div>

      <div className="absolute top-1/4 right-20">
        <div className="text-4xl md:text-5xl lg:text-6xl mb-10">{seconds}:{ms}</div>
        <div className="text-3xl md:text-4xl lg:text-5xl">Level - {level}</div> {/* Responsive level */}
      </div>

      {/* Display the word with its random color */}
      <div className="text-4xl border-4 rounded-lg p-5 mb-10 text-center" style={{ color: displayColor }}>
        {displayWord}
      </div>

      {/* 3x3 Grid with color names */}
      <div className="grid grid-cols-3 gap-5 w-full max-w-xl">
        {gridColors.map((color, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 border-gray-600 hover:bg-gray-600 cursor-pointer"
            onClick={() => handleColorSelection(color)} // Handle word selection
            style={{ color: color }} // Use the correct color for this word
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePlayer;