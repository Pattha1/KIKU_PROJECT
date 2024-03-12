firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        retrieveRoomNames(currentUser.displayName);
    } else {
        window.location.href = "login.html";
    }
});

function toHome() {
    window.location = "index.html";
}

function retrieveRoomNames(displayName) {
    if (displayName) {
        document.querySelector('.displayname').textContent = displayName;
    }
    const database = firebase.database();
    const roomsRef = database.ref('rooms');

    roomsRef.on('value', (snapshot) => {
        const rooms = snapshot.val();
        const roomsContainer = document.querySelector('.room1');

        roomsContainer.innerHTML = '';

        for (const key in rooms) {
            if (rooms.hasOwnProperty(key)) {
                const roomData = rooms[key];
                const roomName = roomData.roomName;
                const user1 = roomData.player1;
                const user2 = roomData.player2;
                const gameStart = roomData.gameStart || false;

                const roomDiv = document.createElement('div');
                roomDiv.className = 'room';
                roomDiv.innerText = roomName;
                roomDiv.addEventListener('click', function() {
                    if (!gameStart) { // Check if the game hasn't started yet
                        if (user1 && !user1.uid) {
                            roomData.player1 = {
                                uid: firebase.auth().currentUser.uid,
                                displayName: displayName,
                                symbol: 'X'
                            };
                        } else if (user1 && !user2) {
                            roomData.player2 = {
                                uid: firebase.auth().currentUser.uid,
                                displayName: displayName,
                                symbol: 'O'
                            };
                        }
                        roomsRef.child(key).set(roomData)
                            .then(() => {
                                window.location.href = 'room_wait5x5.html?roomId=' + key;
                            })
                            .catch((error) => {
                                console.error("Error inserting room data: ", error);
                            });
                    } else {
                        alert("Game has already started");
                    }
                });
                roomsContainer.appendChild(roomDiv);
            }
        }
    }, (error) => {
        console.error("Error retrieving room names: ", error);
    });
}