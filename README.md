# 🌈 RainbowJack 🌈

Welcome to 🌈 **RainbowJack** 🌈, a colorful and exciting command-line card game! This README will guide you through the installation, rules, and how to play the game. 
Test your luck against the dealer in this classic card game and reach 21 without going bust to win!

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [How to Play](#how-to-play)
  - [Game Rules](#game-rules)
  - [Gameplay](#gameplay)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction

🌈 **RainbowJack** 🌈 is a fun and interactive card game you can play directly from your command line. Inspired by Blackjack, this game adds a splash of color and excitement to your terminal.

## Features

- 🎨 Colorful and interactive ASCII art
- 🃏 Randomized deck shuffling
- 🤖 Dealer AI to play against
- 🔄 Replayability with multiple rounds
- 🎉 Fun and engaging messages

## Installation

To play 🌈 RainbowJack 🌈, you need to have Node.js and npm installed on your system. Follow these steps to install and start the game:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/rainbowjack.git
   cd rainbowjack
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the game:**

   ```bash
   node index.js
   ```

## How to Play

### Game Rules

1. Both you and the dealer are dealt two cards.
2. You can choose to 'hit' for another card or 'stand' to keep your current hand.
3. The goal is to get as close to 21 without exceeding it.
4. If your hand exceeds 21, you bust and lose the round.
5. The dealer must draw until they reach at least 17.
6. The player with the highest hand value that does not exceed 21 wins the round.

### Gameplay

1. Start the game and enter your name.
2. Follow the prompts to play each round:
   - **[h]it**: Draw another card.
   - **[s]tand**: Keep your current hand.
3. The game will automatically handle the dealer's turn.
4. After each round, you can choose to play again or exit the game.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [chalk](https://www.npmjs.com/package/chalk) for terminal string styling
- [readline-sync](https://www.npmjs.com/package/readline-sync) for interactive user input
- [boxen](https://www.npmjs.com/package/boxen) for creating stylish terminal boxes
- [figlet](https://www.npmjs.com/package/figlet) for ASCII art

## Contributing

We welcome contributions to 🌈 RainbowJack 🌈! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch with your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Open a pull request to the main repository.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

🌈 RainbowJack 🌈 is open-source software licensed under the [MIT License](LICENSE).

---

Thank you for checking out 🌈 **RainbowJack** 🌈! I hope you enjoy playing the game as much as we enjoyed creating it. 🌈✨
