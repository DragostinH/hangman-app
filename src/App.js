import './App.css';
import React, { useState } from 'react';
import randomWords from 'random-words';
import shuffleArray from './scripts/shuffleArray';

export default function App() {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const [word, setWord] = useState("");

  const [board, setBoard] = useState([]);

  const [guesses, setGuesses] = useState([]);


  // console.log(state);

  // Find API for random words
  // https://www.npmjs.com/package/random-words



  const getWord = () => {
    const guessArr = [];
    const randWord = randomWords();
    setWord(randWord);
    setBoard(randWord.split("").map(() => "_ "));

    for (let i = 0; i < randWord.length; i++) {
      guessArr.push(randWord[i]);
    };

    if (randWord.length <= 5) {
      while (guessArr.length < 10) {
        const guess = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!guessArr.includes(guess) && !randWord.includes(guess)) {
          guessArr.push(guess);
        };
      };
    } else {
      while (guessArr.length < randWord.length * 2) {
        const guess = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!guessArr.includes(guess) && !randWord.includes(guess)) {
          guessArr.push(guess);
        };
      };
    }

    console.log(guessArr);

    shuffleArray(guessArr);
    setGuesses(guessArr);
  };



  const generateGuesses = () => {
    // If the word is less than 5 letters, generate 10 guesses
    // If the word is greater than 5 letters, generate twice the number of letters as guesses

  }


  return (
    <div className="App bg-secondary-500">
      <h1 className='text-primary-100'>Hangman App</h1>
      <button className='border-2 text-primary-100'
        onClick={getWord}>New Game</button>
      <p>{word}</p>
      <p>{board}</p>
      <div className="guesses-container flex gap-4 justify-center">
        {guesses.map((guess, index) => {
          return <button key={index}>{guess}</button>
        })}
      </div>
    </div>
  );
}

