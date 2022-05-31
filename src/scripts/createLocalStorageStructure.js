
export default function createLocalStorageStructure() {
    let parsedStorage = JSON.parse(localStorage.getItem('hangman'));

    if (!parsedStorage) {
        parsedStorage = {
            gameSettings: {
                difficulty: 'easy',
                tries: 10,
                gameOver: false,
                gameWon: false,
                gameStarted: false,
                gamePaused: true,
            },
            word: '',
            board: [],
            guesses: [],
            hangmanPicture: '',
            clickedGuesses: [],
        };
    };

    localStorage.setItem('hangman', JSON.stringify(parsedStorage));

}