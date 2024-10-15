import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const HowToPlay = ({ setMenuState }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      {/* Animate the heading with a fun drop-in effect */}
      <motion.h1
        className="text-5xl mb-12 font-bold"
        initial={{ opacity: 0, y: -100 }} // Drop in from above
        animate={{ opacity: 1, y: 0 }}    // Moves into position
        transition={{ type: 'spring', stiffness: 80, damping: 12, duration: 0.8 }}
      >
        How to Play
      </motion.h1>

      {/* Instructional content, animated with staggered effect */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 }, // Start off-screen below
          visible: {
            opacity: 1, y: 0,
            transition: { delayChildren: 0.3, staggerChildren: 0.2 }, // Staggered animations
          },
        }}
        className="text-xl max-w-2xl text-center mb-10"
      >
        <motion.p className="mb-5" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
          In each round, a word will be displayed in the center. Your task is to match the <strong>color</strong> of the word to its <strong>literal word</strong>.
        </motion.p>

        <motion.div
          className="flex flex-col items-center mb-5"
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
        >
          {/* Visual explanation */}
          <div className="border p-4 bg-gray-600 text-4xl rounded-lg mb-3" style={{ color: 'red' }}>
            Green
          </div>
          <div className="text-2xl">⬇️ Match it to the literal color ⬇️</div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="p-4 bg-red-700 rounded-lg" style={{ color: 'green' }}>Black ❌</div>
            <div className="p-4 bg-green-700 rounded-lg" style={{ color: 'blue' }}>Red ✅</div>
            <div className="p-4 bg-red-700 rounded-lg" style={{ color: 'yellow' }}>Pink ❌</div>
          </div>
        </motion.div>

        <motion.p className="mb-5" variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
          This example shows the word <strong>"Green"</strong> written in red. The correct answer would be to select the word <strong>"Red"</strong> regardless of the color.
        </motion.p>

        <motion.p className= " mb-5" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
        <div className="text-3xl">2 Player: </div>
        </motion.p>
        
        <motion.p className="mb-5" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
          - Player 1 uses <strong>WASD</strong> keys and <strong>'Q'</strong> to confirm the answer.
        </motion.p>

        <motion.p className="mb-5" variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}>
          - Player 2 uses <strong>Arrow</strong> keys and <strong>'Enter'</strong> to confirm the answer.
        </motion.p>

        <motion.p className="mb-5" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}>
          - Score points by selecting the correct answer faster than your opponent!
        </motion.p>
      </motion.div>

      {/* Animate the "Back to Main Menu" button with a fun hover effect */}
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
    </div>
  );
};

export default HowToPlay;