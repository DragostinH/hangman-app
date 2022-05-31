import './App.css';
import React, { useEffect, useState } from 'react';
import randomWords from 'random-words';
import shuffleArray from './scripts/shuffleArray';
import uniqid from 'uniqid';
import GameSettingsScreen from './components/GameSettingsScreen';
import WinScreen from './components/WinScreen';
import LoseScreen from './components/LoseScreen';
import createLocalStorageStructure from './scripts/createLocalStorageStructure';
import updateLocalStorage from './scripts/updateLocalStorage';
import hangmanPics from './scripts/hangmanPics';



export default function App() {
  const hangmanPicts = hangmanPics();

  let shuffledAlphabet = shuffleArray('abcdefghijklmnopqrstuvwxyz'.split(''));

  let gameSettingsScreen;

  let winLoseScreen;

  const [word, setWord] = useState("");

  const [board, setBoard] = useState([]);

  const [clickedGuesses, setClickedGuesses] = useState([]);

  const [guesses, setGuesses] = useState([]);

  const [gameControls, setGameControls] = useState({
    difficulty: '',
    tries: 10,
    gameOver: false,
    gameWon: false,
    gameStarted: false,
    gamePaused: true,
  });

  const [hangmanPicture, setHangmanPicture] = useState(hangmanPicts[0]);

  const getWord = () => {
    // When game loads, get a random word based on difficulty and set the board.
    // Show first and last letter of the word. If they appear elsewhere in the word, show them.
    // If they don't appear, show an underscore.
    const guessArr = [];
    const randWord = gameControls.difficulty === 'easy' ? randomWords({ maxLength: 10, exactly: 1 })[0] : randomWords({ maxLength: 20, exactly: 1 })[0];
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
    setGameControls({
      tries: 10,
      gameOver: false,
      gameWon: false,
      gameStarted: true,
      gamePaused: false,
    });

    setHangmanPicture(hangmanPicts[0]);

    getWord();

    setClickedGuesses([]);
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
    } else {


      // Add the guess to the clicked guesses array
      setClickedGuesses(
        clickedGuesses.concat(guess),
      );

      // Reduce the number of tries by 1 and change picture
      setGameControls({
        ...gameControls,
        tries: gameControls.tries - 1,
      });
    }
    // if the guess is not in the word, remove the guess from the guesses array
    setGuesses(
      guesses.filter(letter => letter !== guess),
    );


    setHangmanPicture(hangmanPicts[10 - gameControls.tries]);
  };

  // Check if there is local storage structure set. If there is update states to match
  useEffect(() => {
    const parsedStorage = JSON.parse(localStorage.getItem('hangman'));
    if (parsedStorage) {
      setGameControls(parsedStorage.gameSettings);
      setWord(parsedStorage.word);
      setBoard(parsedStorage.board);
      setGuesses(parsedStorage.guesses);
      setClickedGuesses(parsedStorage.clickedGuesses);
      setHangmanPicture(parsedStorage.hangmanPicture);
    }
  }, []);

  // Track changes to the game and update game settings
  useEffect(() => {
    if (gameControls.gameStarted) {
      if (gameControls.tries === 0 && board.join('') === word) {
        setGameControls({
          ...gameControls,
          gameWon: true,
          gameOver: true,
        });
      } else if (gameControls.tries === 0 && board.join('') !== word) {
        setGameControls({
          ...gameControls,
          gameOver: true,
          gameStarted: false,
        });
      } else if (board.join('') === word) {
        setGameControls({
          ...gameControls,
          gameWon: true,
          gameOver: true,
          gameStarted: false,
        });
      }
    }
  }, [board, gameControls, gameControls.gameStarted, gameControls.tries, word, clickedGuesses]);


  // Update local storage when game settings change
  useEffect(() => {
    const data = {
      gameSettings: gameControls,
      word: word,
      board: board,
      guesses: guesses,
      clickedGuesses: clickedGuesses,
      hangmanPicture: hangmanPicture,
    };
    const parsedStorage = JSON.parse(localStorage.getItem('hangman'));
    if (!parsedStorage) {
      createLocalStorageStructure();
    } else {
      updateLocalStorage(data);
    }
  }, [gameControls, word, board, guesses, hangmanPicture, clickedGuesses]);




  const pauseGame = (e) => {
    setGameControls({
      ...gameControls,
      gamePaused: true,
    });
  };

  const resumeGame = (e) => {
    setGameControls({
      ...gameControls,
      gamePaused: false,
    })
  }


  if (gameControls.gamePaused) {
    gameSettingsScreen = <GameSettingsScreen
      handleNewGame={handleNewGame}
      gameControls={gameControls}
      pauseGame={pauseGame}
      resumeGame={resumeGame}
    />
  }

  if (gameControls.gameOver) {
    if (gameControls.gameWon) {
      winLoseScreen = <WinScreen
        handleNewGame={handleNewGame}
        word={word}
        gameControls={gameControls}
        openGameSettings={pauseGame}
      />
    } else {
      winLoseScreen = <LoseScreen
        handleNewGame={handleNewGame}
        word={word}
      />
    }
  }



  return (
    <div className="App grid grid-cols-3 grid-rows-1 bg-secondary-200">
      {gameSettingsScreen}
      {winLoseScreen}
      <div className="hangman-picture-container grid items-center justify-center col-span-3">
        <img src={hangmanPicture} alt="hangman" className="hangman-picture" />
        <p className='text-4xl text-center'>{board}</p>
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
      <div className='game-buttons-container col-span-3 justify-center text-center p-12'>
        <div className='game-buttons-container-inner'>
          <button className='uppercase border-2 px-8 py-4 rounded-lg border-secondary-900 text-secondary-900 bg-primary-200'
            onClick={pauseGame}>Game Settings</button>
        </div>
      </div>
      <div className="game-container col-span-3 flex justify-center items-center gap-12">
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


      </div>
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

