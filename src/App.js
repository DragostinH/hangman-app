import './App.css';
import React, { useEffect, useState } from 'react';
import randomWords from 'random-words';
import shuffleArray from './scripts/shuffleArray';
import uniqid from 'uniqid';
import GameScreen from './components/GameScreen';

export default function App() {
  let shuffledAlphabet = shuffleArray('abcdefghijklmnopqrstuvwxyz'.split(''));

  let gameScreen;

  const [word, setWord] = useState("");

  const [board, setBoard] = useState([]);

  const [clickedGuesses, setClickedGuesses] = useState([]);

  const [guesses, setGuesses] = useState([]);

  const [gameControls, setGameControls] = useState({
    difficulty: '',
    round: 1,
    gameOver: false,
    gameWon: false,
    gameStarted: false,
  })

  const getWord = () => {
    // When game loads, get a random word and set the board.
    // Show first and last letter of the word. If they appear elsewhere in the word, show them.
    // If they don't appear, show an underscore.
    const guessArr = [];
    const randWord = randomWords();
    const firstLetter = randWord[0];
    const lastLetter = randWord[randWord.length - 1];

    const finalArr = randWord.split('').map((letter, index) => {
      if (letter === firstLetter || letter === lastLetter) {
        return letter;
      } else {
        return ' _ ';
      }
    });

    setWord(randWord);
    setBoard(finalArr);

    for (let i = 0; i < randWord.length; i++) {
      if (randWord[i] !== firstLetter && randWord[i] !== lastLetter) {
        guessArr.push(randWord[i]);
      }
    };


    createAvailableGuesses(randWord, guessArr);
    shuffleArray(guessArr);
    setGuesses(guessArr);
  };

  const handleNewGame = () => {
    getWord();
    setClickedGuesses([]);
    setGameControls({
      difficulty: '',
      round: 1,
      gameOver: false,
      gameWon: false,
      gameStarted: true,
    });
  }

  useEffect(() => {
    // handleNewGame();
  }, []);

  const checkWin = () => {
    if (board.join('') === word) {
      alert('You win!');
      setGameControls({
        ...gameControls,
        gameWon: true,
        gameOver: true,
      });
    } else if (gameControls.round === 10 || clickedGuesses.length === 9) {
      alert('You lost!');
      setGameControls({
        ...gameControls,
        gameOver: true,
      });
    }
  }





  const handleGuess = (e) => {
    // if the guess is in the word, replace the _ with the letter
    // Remove the guess from the guesses array
    const guess = e.target.textContent;

    if (word.includes(guess)) {
      const newBoard = board.map((letter, index) => {
        return word[index] === guess ? letter = guess : letter;
      });
      setBoard(newBoard);
    }

    // if the guess is not in the word, remove the guess from the guesses array
    setGuesses(
      guesses.filter(letter => letter !== guess),
    );

    // Add the guess to the clicked guesses array
    setClickedGuesses(
      clickedGuesses.concat(guess),
    );

    // Increase the round by 1 for every guess
    setGameControls({
      ...gameControls,
      round: gameControls.round + 1,
    });

    checkWin();
  };


  if (!gameControls.gameStarted) {
    gameScreen = <GameScreen
      handleNewGame={handleNewGame}
    />
  }


  return (
    <div className="App grid grid-cols-2 items-center justify-around bg-secondary-200">
      <div className="game-container flex flex-col items-center gap-12">
        <p className='text-4xl'>{board}</p>
        <div className="guesses-container grid border-[1px] border-primary-400 bg-secondary-900 p-8 rounded-lg gap-4 justify-center">
          <div className="available-guesses flex items-center justify-center flex-wrap gap-4">
            {guesses.map((guess) => {
              return <button onClick={handleGuess}
                className="text-3xl p-2 border-2
                border-primary-50 rounded-md
                bg-primary-700
                text-secondary-200"
                key={uniqid()}>{guess}
              </button>
            })}
          </div>
        </div>

        <div className="clicked-guesses-container bg-slate-800 grid border-[1px] border-primary-50 p-8 rounded-lg gap-4 justify-center">
          <h2 className='text-secondary-200 font-bold uppercase '>Clicked Guesses</h2>
          <div className="clicked-guesses">
            {clickedGuesses.map((guess) => {
              return <button key={uniqid()} className="text-3xl text-purple-400 p-2 border-2
              border-primary-50 rounded-md">{guess}</button>
            })}
          </div>
        </div>
      </div>

      <div className="hangman-picture-container flex items-center justify-center">
        <p>Round: {gameControls.round}</p>
      </div>
      {gameScreen}
    </div>
  );

  function createAvailableGuesses(randWord, guessArr) {
    if (randWord.length <= 5) {
      while (guessArr.length < 10) {
        const guess = shuffledAlphabet[Math.floor(Math.random() * shuffledAlphabet.length)];
        if (!guessArr.includes(guess) && !randWord.includes(guess)) {
          guessArr.push(guess);
        };
      };
    } else {
      while (guessArr.length < randWord.length * 2) {
        const guess = shuffledAlphabet[Math.floor(Math.random() * shuffledAlphabet.length)];
        if (!guessArr.includes(guess) && !randWord.includes(guess)) {
          guessArr.push(guess);
        };
      };
    }
  }
}

