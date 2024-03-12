firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        const currentUser = firebase.auth().currentUser;
        document.querySelector('.createroom').addEventListener('click', function() {
            createRoom(currentUser.displayName);
        });
    } else {
        window.location.href = "Login.html";
    }
});

function toRoomlist() {
    window.location = "Lobby5x5.html";
}

function createRoom(displayName) {
    const roomName = document.getElementById('Roomname').value;

    if (roomName) {
        const roomId = firebase.database().ref('rooms').push().key;
        const initialGameBoard = Array(25).fill('');
        const roomDetails = {
            roomId: roomId,
            roomName: roomName,
            createdBy: displayName,
            player1: {
                uid: firebase.auth().currentUser.uid,
                displayName: displayName,
                symbol: 'X',
            },
            gameBoard: initialGameBoard,
        };
        firebase.database().ref('rooms/' + roomId).set(roomDetails)
            .then(() => {
                window.location.href = "room_wait5x5.html?roomId=" + roomId;
            })
            .catch((error) => {
                console.error("Error creating room:", error);
            });
    } else {
        console.error("Please provide room name .");

    }
}