// Importing necessary packages for styling and user interaction
import chalk from "chalk";
import readlineSync from "readline-sync";
import boxen from "boxen";
import figlet from "figlet";

//Display the name, welcome message(title), game rules with colors, ASCII art and a colored box
const displayWelcomeMessage = () => {
  // Generate the welcome message in ASCII art format
  const welcomeMessage = figlet.textSync("RainbowJack", {
    horizontalLayout: "full",
  });
  // Create a styled box around the welcome message
  const boxedMessage = boxen(chalk.bold.magentaBright(welcomeMessage), {
    padding: 1,
    borderColor: "red",
  });
  // Display the boxed welcome message in the console
  console.log(boxedMessage);
};

// Display the game header with a colorful title and separator lines
const displayHeader = () => {
  console.log(
    chalk.bold.green(
      "\n           🎉       Get ready for a colorful adventure with RainbowJack!         🎉            "
    )
  );
  console.log(
    chalk.bold.yellow(
      "---------------------------------------------------------------------------------------------"
    )
  );
  console.log(
    chalk.bold.yellow(
      "|                          🌈   Welcome to RainbowJack!   🌈                                |"
    )
  );
  console.log(
    chalk.bold.yellow(
      "---------------------------------------------------------------------------------------------"
    )
  );
};

// Display the game rules and prompt the user to start the game
const displayGameRules = () => {
  console.log(chalk.bold.cyan("\nRules of the Game:"));
  console.log("- Both you and the dealer will be dealt two cards.");
  console.log(
    "- You can choose to 'hit' for another card or 'stand' to keep your current hand."
  );
  console.log("- Be careful not to exceed 21 or you'll bust!\n");
  console.log(chalk.bold.magenta("🌟  Press ENTER to start playing! 🌟\n"));
  readlineSync.question("");
};

// Create a standard deck of 52 playing cards
const createDeck = () => {
  // Define the suits and ranks for the cards
  const suits = ["♥", "♦", "♠", "♣"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  let deck = [];
  // Generate the deck by combining each suit with each rank
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

// Shuffle the deck of cards using the Fisher-Yates algorithm
const shuffleDeck = (deck) => {
  // Shuffle the deck using the Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the cards at indices i and j
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

// Calculate the value of a hand of cards
const calculateHandValue = (hand) => {
  let value = 0;
  let numAces = 0;
  // Calculate the initial value of the hand
  for (let card of hand) {
    if (card.rank === "A") {
      numAces++;
      value += 11;
    } else if (["J", "Q", "K"].includes(card.rank)) {
      value += 10;
    } else {
      value += parseInt(card.rank);
    }
  }
  // Adjust the value for aces if the total value exceeds 21
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
};

// Display a hand of cards as a string
const displayHand = (hand) => {
  return hand.map((card) => `${card.rank} of ${card.suit}`).join(", ");
};

// Check the deck and reshuffle if necessary
const checkDeck = (deck) => {
  // If there are fewer than 10 cards left in the deck, create and shuffle a new deck
  if (deck.length < 10) {
    console.log(
      chalk.bold.red(`Deck is low on card., Reshuffling new deck...`)
    );
    deck = createDeck();
    shuffleDeck(deck);
  }
  return deck;
};

// Play a single round of RainbowJack
const playRound = (deck, playerName) => {
  // Check and reshuffle the deck if necessary
  deck = checkDeck(deck);
// Initial hands for player and dealer
  let playerHand = [deck.pop(), deck.pop()];
  let dealerHand = [deck.pop(), deck.pop()];
  console.log(
    `\nDealer's hand: [${dealerHand[0].rank} of ${dealerHand[0].suit}], [Hidden]`
  );
  console.log(`Your hand: ${displayHand(playerHand)}`);

  // Player's turn: Continue until the player chooses to stand or busts
  while (calculateHandValue(playerHand) < 21) {
    let choice = readlineSync
      .question("\nDo you want to [h]it or [s]tand?")
      .toLowerCase();
    if (choice === "h") {
      // Check and reshuffle the deck if necessary
      deck = checkDeck(deck);
      playerHand.push(deck.pop());
      console.log(`Your hand: ${displayHand(playerHand)}`);
    } else if (choice === "s") {
      break;
    } else {
      console.log(
        chalk.red("Invalid choice. Please enter 'h' to hit or 's' to stand.")
      );
    }
  }

  let playerValue = calculateHandValue(playerHand);
  if (playerValue > 21) {
    console.log(chalk.bold.red(`Bust! Your hand value is ${playerValue}.`));
    return false;
  }

  // Dealer's turn: Dealer must draw until their hand value is at least 17
  console.log(`\nDealer's hand: ${displayHand(dealerHand)}`);
  while (calculateHandValue(dealerHand) < 17) {
    // Check and reshuffle the deck if necessary
    dealerHand.push(deck.pop());
    console.log(
      `Dealer draws a card. Dealer's hand: ${displayHand(dealerHand)}`
    );
  }

  let dealerValue = calculateHandValue(dealerHand);
  console.log(
    `\nFinal hands - ${playerName}: ${playerValue}, Dealer: ${dealerValue}`
  );

// Compare final hand values to determine the winner
  if (dealerValue > 21 || playerValue > dealerValue) {
    console.log(chalk.bold.green(`🌈 Congratulations! You win! 🌈`));
    return true;
  } else if (playerValue < dealerValue) {
    console.log(chalk.bold.red(`Sorry, you lose. Better luck next time!`));
    return false;
  } else {
    console.log(chalk.yellow(`It's a tie. Your bet is returned.`));
    return null;
  }
};

// Defining the game start 
const playRainbowJack = () => {
  displayWelcomeMessage();
  displayHeader();
  displayGameRules();
};

// Main game loop: Get the player's name, create and shuffle the deck, and handle multiple rounds
let deck = createDeck();
shuffleDeck(deck);


// Initial welcome and game rules display
displayWelcomeMessage();
displayHeader();
displayGameRules();

// Get the player's name
let playerName = readlineSync.question("What is your name? ");
console.log(
  chalk.bold.green(`Welcome, ${playerName}! 🌈 Let's get started. 🌈`)
);

// Game loop to play multiple rounds
while (true) {
  playRound(deck, playerName);
  let playAgain = readlineSync
    .question("Do you want to play another round? (y/n): ")
    .toLowerCase();
  if (playAgain !== "y") {
    console.log(chalk.bold.green(`Thanks for playing 🌈 RainbowJack 🌈!`));
    break;
  }
}

// Start the game of RainbowJack
playRainbowJack();
