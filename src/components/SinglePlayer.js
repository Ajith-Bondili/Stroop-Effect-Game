import React, { useState, useEffect } from 'react';

// Array of available color names
const colors = ['Pink', 'Red', 'Purple', 'Yellow', 'White', 'Black', 'Green', 'Blue', 'Orange'];

// Function to get a random color from the colors array
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// Function to start and manage the timer
const useTimer = () => {
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    const startTimer = Date.now();
    const timer = setInterval(() => {
      setMilliseconds(Date.now() - startTimer);
    }, 10);

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format the time to seconds:milliseconds
  const seconds = Math.floor(milliseconds / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');

  return { seconds, ms };
};

const SinglePlayer = () => {
  const [displayWord, setDisplayWord] = useState(''); // Word to display
  const [displayColor, setDisplayColor] = useState(''); // Color of the word
  const [gridColors, setGridColors] = useState([]); // Store colors for the grid words
  const [score, setScore] = useState(0); // Score state
  const { seconds, ms } = useTimer(); // Get timer values from useTimer function

  // Function to generate the word and color for the main display
  const generateNewWord = () => {
    setDisplayWord(getRandomColor());  // Set a random word for the display
    setDisplayColor(getRandomColor()); // Set a random color for the word display

    // Generate random colors for each word in the grid
    const newGridColors = colors.map(() => getRandomColor());
    setGridColors(newGridColors); // Update the grid colors only once when generating a new word
  };

  // Initialize the game state
  useEffect(() => {
    generateNewWord();
  }, []);

  // Handle player's selection of color
  const handleColorSelection = (selectedWord) => {
    if (selectedWord === displayWord) {
      setScore(score + 1); // Increment score if the correct word is selected
    }
    generateNewWord(); // Generate a new word and color after submission
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Display the word with its random color */}
      <div className="text-4xl border-4 rounded-lg p-5 mb-10 text-center" style={{ color: displayColor }}>
        {displayWord}
      </div>
      
      {/* Timer Display */}
      <div className="text-2xl border-2 rounded-lg p-3 mb-10">
        {seconds}:{ms}
      </div>

      {/* Display current score */}
      <div className="text-2xl mb-5">
        Score: {score}
      </div>

      {/* 3x3 Grid with color names */}
      <div className="grid grid-cols-3 gap-5 max-w-lg">
        {colors.map((color, index) => (
          <div
            key={color}
            className="bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 border-gray-600 hover:bg-gray-600 cursor-pointer"
            onClick={() => handleColorSelection(color)} // Handle word selection
            style={{ color: gridColors[index] }} // Use the static color for this word
          >
            {color}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePlayer;