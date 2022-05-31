import React from "react";

export default function LoseScreen(props) {

    const { handleNewGame, word } = props;

    return (
        <div className="gamescreen-overlay absolute bg-[rgba(0,0,0,0.15)] w-screen h-[90%] flex items-center justify-center">
            <div className="gamescreen-container grid items-center bg-primary-900 w-1/2 h-1/2 rounded-xl p-8 text-primary-50">
                <h1 className="text-4xl text-center">You Lost :(</h1>
                <p className="text-center">Your word was: "{word}"</p>
                <button className='border-2 px-8 py-4 rounded-lg border-secondary-900 text-secondary-900 bg-primary-200'
                    onClick={handleNewGame}>New Game</button>
            </div>
        </div>
    );
}