import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

const SinglePlayerEasy = () => {
  const [displayWord, setDisplayWord] = useState('');
  const [displayColor, setDisplayColor] = useState('');
  const [gridColors, setGridColors] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const { seconds, ms, milliseconds, resetTimer } = useTimer();

  useEffect(() => {
    const generateNewWord = () => {
      const newDisplayWord = getRandomColor(); // The word (text) to display
      let newDisplayColor = getRandomColor(); // Assign a random color to the word

      // Ensure the color and the word are different
      while (newDisplayColor === newDisplayWord) {
        newDisplayColor = getRandomColor();
      }

      setDisplayWord(newDisplayWord); // Set the word text
      setDisplayColor(newDisplayColor); // Set the color of the word

      // Generate grid options where word and color match (for easy mode)
      const correctAnswer = newDisplayColor; // Correct answer is based on the color of the target word
      const remainingColors = colors.filter(color => color !== correctAnswer); // Exclude correct answer from other options

      let gridSize = 3;
      if (level >= 7 && level <= 10) gridSize = 6;
      else if (level >= 11) gridSize = 9;

      // Shuffle remaining colors and select gridSize - 1 random colors, then add the correct answer
      const shuffledRemainingColors = remainingColors.sort(() => Math.random() - 0.5).slice(0, gridSize - 1);
      const newGridColors = [...shuffledRemainingColors, correctAnswer].map(color => ({
        word: color, // Word text
        color: color, // Word color (same as the word)
      })).sort(() => Math.random() - 0.5); // Shuffle final grid

      setGridColors(newGridColors); // Set the grid colors
    };

    generateNewWord();
  }, [level]);

  const calculateScore = (timeInMilliseconds) => {
    const scoreMultiplier = 1000;
    const timeInSeconds = timeInMilliseconds / 1000;
    return Math.floor(scoreMultiplier / (timeInSeconds + 1));
  };

  const handleColorSelection = (selectedWord) => {
    // The correct answer is the literal word that matches the color of the target word
    if (selectedWord === displayColor) {
      const scoreIncrement = calculateScore(milliseconds);
      setScore(score + scoreIncrement);
      setLevel(level + 1);
      resetTimer();
    }
  };

  const renderGrid = () => {
    let gridCols = 3;
    if (level >= 7 && level <= 10) gridCols = 6;
    else if (level >= 11) gridCols = 9;

    return (
      <motion.div 
        className="grid grid-cols-3 gap-5 max-w-lg"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 }}  // Stagger grid items
      >
        {gridColors.map((colorObj, index) => (
          <motion.div
            key={index}
            className="bg-gray-700 text-white p-10 text-2xl text-center rounded-lg border-2 border-gray-600 hover:bg-gray-600 cursor-pointer"
            onClick={() => handleColorSelection(colorObj.word)}
            style={{ color: colorObj.color }}
            whileHover={{ scale: 1.1 }}  // Scale up on hover
            whileTap={{ scale: 0.95 }}   // Scale down on tap
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}  // Add entry animation for each grid item
          >
            {colorObj.word}
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-screen text-white"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.8 }}  // Fade in and out for the entire screen
    >
      {/* Animate the word display */}
      <motion.div
        className="text-4xl border-4 rounded-lg p-5 mb-10 text-center"
        style={{ color: displayColor }}
        key={displayWord} // Key helps restart animation when the word changes
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {displayWord}
      </motion.div>

      {renderGrid()}

      <div className="text-2xl mt-10">
        Level: {level} | Score: {score}
      </div>
      <div className="text-2xl mt-5">
        Timer: {seconds}:{ms}
      </div>
    </motion.div>
  );
};

export default SinglePlayerEasy;