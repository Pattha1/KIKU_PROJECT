// // Assume the user is authenticated
// const user = firebase.auth().currentUser;
// let gameId = null;

// // Function to create or join a game
// function createOrJoinGame() {
//     const gamesRef = firebase.database().ref('games');

//     // Look for an available game
//     gamesRef.once('value', (snapshot) => {
//         const games = snapshot.val();

//         if (games) {
//             const availableGameId = Object.keys(games).find((id) => games[id].players.length === 1);

//             if (availableGameId) {
//                 joinGame(availableGameId);
//             } else {
//                 createGame();
//             }
//         } else {
//             createGame();
//         }
//     });
// }

// // Function to create a new game
// function createGame() {
//     const gamesRef = firebase.database().ref('games');
//     const newGameRef = gamesRef.push({
//         players: [user.uid],
//         currentPlayer: user.uid,
//         board: ["", "", "", "", "", "", "", "", ""],
//         status: "waiting"
//     });

//     gameId = newGameRef.key;
//     // Add a listener to watch for changes in the game state
//     watchGame();
// }

// // Function to join an existing game
// function joinGame(gameId) {
//     const gamesRef = firebase.database().ref(`games/${gameId}`);
//     gamesRef.transaction((game) => {
//         if (game) {
//             game.players.push(user.uid);
//             game.status = "in_progress";
//         }
//         return game;
//     });

//     gameId = gameId;
//     // Add a listener to watch for changes in the game state
//     watchGame();
// }

// // Function to watch for changes in the game state
// function watchGame() {
//     const gameRef = firebase.database().ref(`games/${gameId}`);

//     gameRef.on('value', (snapshot) => {
//         const game = snapshot.val();
//         // Update the UI with the game state (board, players, etc.)
//     });

//     // Implement the game logic (handling moves, checking for a winner, etc.)
// }