import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Animate the heading with a drop-in effect */}
      <motion.h1
        className="text-5xl mb-16 font-bold"
        initial={{ opacity: 0, y: -100 }}  // Start off-screen above
        animate={{ opacity: 1, y: 0 }}    // Drop into position
        transition={{ type: 'spring', stiffness: 100, damping: 20, duration: 1 }}
      >
        Stroop Test
      </motion.h1>

      {/* Animate the buttons with a staggered bouncing effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 100 },  // Start off-screen below
          visible: {
            opacity: 1, y: 0,
            transition: {
              type: 'spring', stiffness: 200, damping: 15, delayChildren: 0.2, staggerChildren: 0.2,
            },
          },
        }}
        className="flex flex-col items-center"
      >
        {/* 1-Player Button */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5, backgroundColor: '#4a90e2' }}  // Cool hover effect: scale, rotate and change color
          whileTap={{ scale: 0.95, rotate: 0 }}   // Tap effect to make it feel responsive
          className="mb-8"
        >
          <Link
            to="/single-player-menu"
            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            1-Player
          </Link>
        </motion.div>

        {/* 2-Player Button */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: -5, backgroundColor: '#50c878' }}  // Scale, rotate, and change color
          whileTap={{ scale: 0.95, rotate: 0 }}
          className="mb-8"
        >
          <Link
            to="/two-player-menu"
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            2-Player
          </Link>
        </motion.div>

        {/* How to Play Button */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5, backgroundColor: '#ffcc00' }}  // Scale, rotate, and change color
          whileTap={{ scale: 0.95, rotate: 0 }}
          className="mb-8"
        >
          <Link
            to="/how-to-play"
            className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            How to Play
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainMenu;