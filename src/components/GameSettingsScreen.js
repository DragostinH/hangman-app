import React, { useState } from "react";

export default function GameSettingsScreen(props) {
    const [gameSettings, setGameSettings] = useState({
        difficulty: "easy",
    });

    const { handleNewGame, resumeGame, } = props;

    const handleDifficulty = (e) => {
        setGameSettings({
            ...gameSettings,
            difficulty: e.target.id,
        })
    };

    const handleStartGame = () => {
        handleNewGame(gameSettings.difficulty);
    }


    return (
        <div className="gamescreen-overlay z-10 absolute bg-[rgba(0,0,0,0.15)] w-screen h-[90%] flex items-center justify-center">
            <div className="gamescreen-container border-4 border-primary-500 grid grid-cols-2 items-center bg-primary-900 w-fit h-fit rounded-xl p-8 text-primary-50">
                <h1 className="text-4xl">Game Settings</h1>
                <div className="border-[1px] p-6 rounded-lg">
                    <form action="" className="grid gap-4">
                        <p className="text-center uppercase">Difficulty</p>
                        <label className="uppercase grid gap-4 grid-cols-2 items-center" htmlFor="easy">Easy
                            <input type="radio" onClick={handleDifficulty} name="difficulty" id="easy" defaultChecked />
                        </label>
                        <label className="uppercase grid gap-4 grid-cols-2 items-center" htmlFor="hard">Hard
                            <input type="radio" onClick={handleDifficulty} name="difficulty" id="hard" />
                        </label>
                    </form>
                </div>
                <button className='uppercase border-2 px-8 py-4 rounded-lg border-secondary-900 text-secondary-900 bg-primary-200'
                    onClick={handleStartGame}>Start Game</button>
                <button className='uppercase border-2 px-8 py-4 rounded-lg border-secondary-900 text-secondary-900 bg-primary-200'
                    onClick={resumeGame}>cancel</button>
            </div>
        </div>
    );
}