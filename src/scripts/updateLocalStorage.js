export default function updateLocalStorage(data) {
    let parsedStorage = JSON.parse(localStorage.getItem('hangman'));

    const { gameSettings, word, board, guesses, hangmanPicture, clickedGuesses } = data;

    parsedStorage.gameSettings = gameSettings;
    parsedStorage.word = word;
    parsedStorage.board = board;
    parsedStorage.guesses = guesses;
    parsedStorage.hangmanPicture = hangmanPicture;
    parsedStorage.clickedGuesses = clickedGuesses;



    localStorage.setItem('hangman', JSON.stringify(parsedStorage));

}