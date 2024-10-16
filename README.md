# Stroop Effect Game

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Game Modes](#game-modes)
- [Features](#features)

## Overview

The **[Stroop Effect Game](https://stroop-effect-game.vercel.app)** is a brain challenge game based on the Stroop Effect, a psychological test where players must process conflicting information between text and color. The game is built to be fun, competitive, and challenging, offering different levels of difficulty for solo or for local two-player versus type games. The layout of the game was inspired by the minigame design in Outlast Trials.

## Technologies Used

- **React**: Frontend framework for building dynamic interfaces.
- **React Router**: For seamless back navigation between different game modes and menus.
- **Framer Motion**: For adding smooth, interactive animations.
- **Tailwind CSS**: For a responsive and modern design.

## Game Modes

### 1. Single Player Mode
- **Easy**: The grid options match the word's color, making it easier for players to select the correct answer.
- **Hard**: The words and their colors don’t match, requiring players to select the literal word corresponding to the color of the target word.

### 2. Two Player Mode
- **Easy**: Players compete to match the color of the word to its literal word. The first to select the correct answer wins.
- **Hard**: The difficulty increases with randomized color-word combinations, requiring sharper focus and quicker responses.

## Features

- **Single Player and Two Player Modes**: Play solo or against a friend.
- **Multiple Difficulty Levels**: Grid sizes increase as the level progresses, making the game more challenging.
- **Real-time Animations**: Uses Framer Motion for smooth and engaging animations.
- **Keyboard Controls**: Player 1 uses **WASD** keys and **Q** to confirm answers, while Player 2 uses **Arrow keys** and **Enter**.
- **Dynamic Scoring**: The faster you answer, the higher your score. Timers track the speed of each correct answer.
- **Clean User Interface**: The UI is responsive and designed to offer a seamless experience.

