firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        document.querySelector('.user-1').textContent = currentUser.displayName;

        document.querySelector('.ready').addEventListener('click', function() {
            readyUser(currentUser.displayName);
        });
        document.querySelector('.play-btn').addEventListener('click', function() {
            startGame(currentUser.displayName);
        });

        showUser(currentUser.displayName);
    } else {
        window.location.href = "login.html";
    }
});

function toRoomlist() {
    window.location.href = "Lobby4x4.html";
}

// Function to display user data including readiness
function showUser(displayName) {
    const roomId = new URLSearchParams(window.location.search).get('roomId');
    const roomsRef = firebase.database().ref('rooms');
    roomsRef.on('value', (snapshot) => {
        const rooms = snapshot.val();
        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                document.querySelector('.passwordroom').textContent = roomData.password;
                if (roomData.roomId === roomId) {
                    if (roomData.gameStart) {
                        window.location.href = "game_play_4x4.html?roomId=" + roomId;
                        return;
                    }
                    if (roomData.player1 && roomData.player1.displayName === displayName) {

                        document.querySelector('.user-1').textContent = roomData.player1.displayName + (roomData.player1.ready ? " (Ready)" : "");
                        document.querySelector('.user-2').textContent = roomData.player2.displayName + (roomData.player2.ready ? " (Ready)" : "");
                    } else if (roomData.player2 && roomData.player2.displayName === displayName) {

                        document.querySelector('.user-1').textContent = roomData.player2.displayName + (roomData.player2.ready ? " (Ready)" : "");
                        document.querySelector('.user-2').textContent = roomData.player1.displayName + (roomData.player1.ready ? " (Ready)" : "");
                    } else {
                        document.querySelector('.user-1').textContent = "wait....";
                        document.querySelector('.user-2').textContent = "wait....";
                    }
                    break;
                }
            }
        }
    }, (error) => {
        console.error("Error retrieving room data: ", error);
    });
}



function toLobby(displayName) {
    const roomsRef = firebase.database().ref('rooms');
    roomsRef.on('value', (snapshot) => {
        const rooms = snapshot.val();

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                if (roomData.player1 && roomData.player1.displayName === displayName) {
                    delete roomData.player1;
                }
                if (roomData.player2 && roomData.player2.displayName === displayName) {
                    delete roomData.player2;
                }
                roomsRef.child(key).set(roomData);
            }
        }
        // Redirect to lobby.html or any other page after updating player names
        window.location.href = "Lobby4x4.html";
    }).catch((error) => {
        console.error("Error deleting players: ", error);
    });
}

function readyUser(displayName) {
    const roomId = new URLSearchParams(window.location.search).get('roomId');
    const roomsRef = firebase.database().ref('rooms');

    roomsRef.once('value').then((snapshot) => {
        const rooms = snapshot.val();

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                if (roomData.roomId === roomId) {
                    if (roomData.player1 && roomData.player1.displayName === displayName) {
                        roomData.player1.ready = !roomData.player1.ready;
                    }
                    if (roomData.player2 && roomData.player2.displayName === displayName) {
                        roomData.player2.ready = !roomData.player2.ready;
                    }
                    roomsRef.child(key).set(roomData);
                    break;
                }
            }
        }
    }).catch((error) => {
        console.error("Error toggling user readiness: ", error);
    });
}

function startGame(displayName) {
    const roomId = new URLSearchParams(window.location.search).get('roomId');
    const roomsRef = firebase.database().ref('rooms');

    roomsRef.once('value').then((snapshot) => {
        const rooms = snapshot.val();
        let bothPlayersReady = false;

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                if (roomData.roomId === roomId) {
                    if (roomData.player1.displayName === displayName) {
                        bothPlayersReady = roomData.player1.ready && roomData.player2.ready;
                    }
                    if (roomData.player2.displayName === displayName) {
                        bothPlayersReady = roomData.player1.ready && roomData.player2.ready;
                    }
                    break;
                }
            }
        }

        if (bothPlayersReady) {
            for (const key in rooms) {
                if (rooms.hasOwnProperty(key)) {
                    const roomData = rooms[key];
                    if (roomData.roomId === roomId && roomData.player1.displayName === displayName) {
                        roomsRef.child(key).update({
                            gameStart: true
                        });
                        break;
                    }
                }
            }
        } else {
            alert("Both players need to be ready to start the game.");
        }
    }).catch((error) => {
        console.error("Error starting the game: ", error);
    });
}

function toHome() {
    window.location = "Lobby_4x4.html";
}