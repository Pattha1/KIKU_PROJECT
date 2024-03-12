// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsW08DIwebcxd86TD975uiD1XC9GiLph4",
    authDomain: "web-design-javascript-la-eef5f.firebaseapp.com",
    databaseURL: "https://web-design-javascript-la-eef5f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-design-javascript-la-eef5f",
    storageBucket: "web-design-javascript-la-eef5f.appspot.com",
    messagingSenderId: "1031435415549",
    appId: "1:1031435415549:web:4bc391bed0fdcaa5d63394",
    measurementId: "G-C9F8J3J5H8"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        loadGame(currentUser);
    } else {
        window.location.href = "login.html";
    }
});

function loadGame(currentUser) {
    const roomId = new URLSearchParams(window.location.search).get('roomId');
    const roomsRef = firebase.database().ref('rooms');

    roomsRef.on('value', (snapshot) => {
        const rooms = snapshot.val();

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                if (roomData.roomId === roomId) {
                    const player1 = roomData.player1;
                    const player2 = roomData.player2;
                    document.querySelector('.user-1').textContent = player1.displayName;
                    document.querySelector('.user-2').textContent = player2.displayName;
                    const gameBoard = document.querySelector('.board');

                    if (Array.isArray(roomData.gameBoard)) {
                        const cells = gameBoard.querySelectorAll('.table-col');
                        cells.forEach((cell, index) => {
                            cell.querySelector('p').textContent = roomData.gameBoard[index];
                        });

                        cells.forEach(cell => {
                            cell.addEventListener('click', () => {
                                makeMove(currentUser, cell, roomId);
                            });
                        });
                    } else {
                        console.error("Invalid game board data:", roomData.gameBoard);
                    }
                    break;
                }
            }
        }
    }, (error) => {
        console.error("Error retrieving room data: ", error);
    });
}

let isMakingMove = false;
let alertedCell = false;

function makeMove(currentUser, cell, roomId) {
    if (isMakingMove) {
        return;
    }
    isMakingMove = true;

    const row = parseInt(cell.id.split("-")[1]);
    const col = parseInt(cell.id.split("-")[3]);
    const cellIndex = 3 * (row - 1) + (col - 1);

    const roomsRef = firebase.database().ref('rooms');

    roomsRef.once('value').then((snapshot) => {
        const rooms = snapshot.val();

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                if (roomData.roomId === roomId) {
                    const gameBoard = roomData.gameBoard || Array(9).fill('');

                    if (gameBoard[cellIndex] === '') {
                        const isPlayer1Turn = roomData.currentTurn === roomData.player1.uid;

                        if ((isPlayer1Turn && currentUser.uid === roomData.player1.uid) ||
                            (!isPlayer1Turn && currentUser.uid === roomData.player2.uid)) {

                            const symbol = isPlayer1Turn ? 'X' : 'O';
                            const updatedGameBoard = [...gameBoard];
                            updatedGameBoard[cellIndex] = symbol;

                            cell.querySelector('p').textContent = symbol;

                            roomsRef.child(key).update({
                                gameBoard: updatedGameBoard,
                                currentTurn: isPlayer1Turn ? roomData.player2.uid : roomData.player1.uid
                            }).then(() => {
                                const winner = checkWinner(updatedGameBoard);
                                if (winner) {
                                    if (winner === 'draw') {
                                        alert("You draw!");
                                        deleteRoomFromFirebase(key);
                                        toLobby();
                                    } else {
                                        const popup = document.getElementById('popupw');
                                        const playerWin = document.querySelector('.player_win');
                                        playerWin.textContent = symbol + " Name";
                                        popup.style.display = "block";
                                        deleteRoomFromFirebase(key);
                                    }
                                }

                                isMakingMove = false;
                                alertedCell = false;
                            }).catch((error) => {
                                console.error("Error updating game board: ", error);
                                isMakingMove = false;
                                alertedCell = false;
                            });
                        } else {
                            alert("It's not your turn!");
                            isMakingMove = false;
                            alertedCell = false;
                        }
                    } else {
                        if (!alertedCell) {
                            alert("Cell filled!");
                            alertedCell = true;
                        }
                        isMakingMove = false;
                    }
                    break;
                }
            }
        }
    }).catch((error) => {
        console.error("Error making move: ", error);
        isMakingMove = false;
        alertedCell = false;
    });
}

function deleteRoomFromFirebase(roomKey) {
    const roomsRef = firebase.database().ref('rooms');
    roomsRef.child(roomKey).remove()
        .then(() => {
            console.log("Room deleted successfully!");
        })
        .catch((error) => {
            console.error("Error deleting room: ", error);
        });
}







function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes('')) {
        return 'draw';
    }

    return null;
}

function checkTie(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}




function toLobby() {
    window.location.href = "lobby3x3.html";
}