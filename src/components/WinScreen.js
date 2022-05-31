import React from "react";

export default function WinScreen(props) {

    const { handleNewGame, gameControls, word } = props;

    let winMsg = "";

    if (gameControls.tries === 10) {
        winMsg = `You guessed the word ${word} correctly! Well done, you did it without any mistakes!`;
    } else if (gameControls.tries < 10 && gameControls.tries > 0) {
        winMsg = `You guessed the word ${word} correctly! You had ${gameControls.tries} tries left!`;
    }

    return (
        <div className="gamescreen-overlay absolute bg-[rgba(0,0,0,0.15)] w-screen h-[90%] flex items-center justify-center">
            <div className="gamescreen-container grid items-center bg-primary-900 w-fit h-1/2 rounded-xl p-8 text-primary-50">
                <h1 className="text-4xl text-center">You Won!</h1>
                <p className="text-center">{winMsg} </p>
                <button className='border-2 px-8 py-4 rounded-lg border-secondary-900 text-secondary-900 bg-primary-200'
                    onClick={handleNewGame}>New Game</button>
            </div>
        </div>
    );
}