//Importing packages (npm)
import chalk from "chalk";
import readlineSync from "readline-sync";
import boxen from "boxen";
import figlet from "figlet";

//Display the name, welcome message, game rules with colors, ASCII art and a colored box

const displayWelcomeMessage = () => {
  const welcomeMessage = figlet.textSync("RainbowJack", {
    horizontalLayout: "full",
  });
  const boxedMessage = boxen(chalk.bold.magentaBright(welcomeMessage), {
    padding: 1,
    borderColor: "red",
  });
  console.log(boxedMessage);
};

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

displayWelcomeMessage();
displayHeader();
displayGameRules();
//Create a deck of cards

const createDeck = () => {
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
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
};

//Shuffle the deck of cards

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

//Calculate the value of a hand

const calculateHandValue = (hand) => {
  let value = 0;
  let numAces = 0;
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
  while (value > 21 && numAces > 0) {
    value -= 10;
    numAces--;
  }
  return value;
};

//Display a hand

const displayHand = (hand) => {
  return hand.map((card) => `${card.rank} of ${card.suit}`).join(", ");
};

//Play a round of RainbowJack

const playRound = (deck, playerName) => {
  let playerHand = [deck.pop(), deck.pop()];
  let dealerHand = [deck.pop(), deck.pop()];
  console.log(
    `\nDealer's hand: [${dealerHand[0].rank} of ${dealerHand[0].suit}], [Hidden]`
  );
  console.log(`Your hand: ${displayHand(playerHand)}`);

  //Player's turn

  while (calculateHandValue(playerHand) < 21) {
    let choice = readlineSync
      .question("\nDo you want to [h]it or [s]tand?")
      .toLowerCase();
    if (choice === "h") {
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

  //Dealer's turn

  console.log(`\nDealer's hand: ${displayHand(dealerHand)}`);
  while (calculateHandValue(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    console.log(
      `Dealer draws a card. Dealer's hand: ${displayHand(dealerHand)}`
    );
  }

  let dealerValue = calculateHandValue(dealerHand);
  console.log(
    `\nFinal hands - ${playerName}: ${playerValue}, Dealer: ${dealerValue}`
  );

  if (dealerHand > 21 || playerValue > dealerValue) {
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

//Start the game

const playRainbowJack = () => {
  displayWelcomeMessage();
  displayHeader();
  displayGameRules();
};

let playerName = readlineSync.question("What is your name? ");
console.log(chalk.bold.green(`Welcome, ${playerName}! 🌈 Let's get started. 🌈`));

let deck = createDeck();
shuffleDeck(deck);

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

playRainbowJack();
