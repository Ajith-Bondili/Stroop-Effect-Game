import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GameModeMenuSinglePlayer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Animate the heading */}
      <motion.h1
        className="text-4xl mb-12"  // Increased bottom margin for more spacing
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Single Player Game Modes
      </motion.h1>

      {/* Animate the buttons with staggered animations */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
        className="flex flex-col items-center"
      >
        <motion.div
          className="mb-6"  // Increased bottom margin for spacing between buttons
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/single-player-easy"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Beginner Friendly
          </Link>
        </motion.div>

        <motion.div
          className="mb-6"  // Increased bottom margin for spacing between buttons
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/single-player-hard"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Challenging
          </Link>
        </motion.div>

        <motion.div
          className="mb-6"  // Increased bottom margin for spacing between buttons
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to="/"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Main Menu
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameModeMenuSinglePlayer;