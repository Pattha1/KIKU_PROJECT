// /* -------------------------------------------- CreateRoom----------------------------------------------------------------- */
function createRoom() {
    // Get password from the input field
    var password = document.getElementById('password').value;

    // Generate a unique room ID
    var roomId = generateRoomId();

    // Save room name to Firebase Realtime Database using the user's username
    const currentUser = firebase.auth().currentUser;
    var roomNameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
    roomNameRef.once("value")
        .then((snapshot) => {
            var roomName = snapshot.val(); // Get the username from the database
            // Save room details to Firebase Realtime Database
            var roomRef = firebase.database().ref('rooms/' + roomId);
            roomRef.set({
                roomName: roomName,
                password: password
            });

            // Redirect to the waiting room with room ID as a parameter
            window.location.href = 'create_room_wait_3x3.html?roomId=' + roomId;
        })
        .catch((error) => {
            console.error("Error fetching username:", error);
        });
}

// Function to generate a unique room ID
function generateRoomId() {
    return Math.random().toString(36).substring(2, 10);
}

// Add this to your createroom.js file






/* -------------------------------------------- join room ----------------------------------------------------------------- */

/* gameRef.on("value", (snapshot) => {
    if (!enter) {
        // console.log("bingshiling")
        JoinGame(snapshot);
        enter = true
    }
    // console.log("John")
    getGameInfo(snapshot);
})

UserRef.on("value", (snapshot) => {
    getUserInfo(snapshot);
}) */

// Function to join a room

/* function joinRoom(roomName) {
    // Your logic to handle joining the room
    // For now, redirect to the waiting room with the selected roomName
    window.location.href = 'create_room_wait_3x3.html?roomName=' + roomName;
}

// Call the displayRooms function to show existing rooms
displayRooms();

UI(user); */






// // /* -------------------------------------------- display room names ----------------------------------------------------------------- */
// function displayRooms() {
//     var roomTable = document.querySelector('.room1');
//     roomTable.innerHTML = ""; // Clear previous data

//     // Reference to the rooms in Firebase
//     var roomsRef = firebase.database().ref('rooms');

//     roomsRef.once('value', function(snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var roomId = childSnapshot.key;
//             var roomDetails = childSnapshot.val();
//             var row = document.createElement('tr');
//             var nameCell = document.createElement('td');
//             var joinButtonCell = document.createElement('td');
//             var joinButton = document.createElement('button');

//             nameCell.textContent = roomDetails.roomName;
//             joinButton.textContent = 'Join';
//             joinButton.className = 'join_buttons';
//             joinButton.onclick = function() {
//                 joinRoom(roomId);
//             };

//             joinButtonCell.appendChild(joinButton);
//             row.appendChild(nameCell);
//             row.appendChild(joinButtonCell);
//             roomTable.appendChild(row);
//         });
//     });
// }

// // Function to update the UI (Replace 'user' with your actual UI update logic)
// function UI(user) {
//     // Your UI update logic here
//     console.log("Updating UI:", user);
// }

// // Call the displayRooms function to show existing rooms
// displayRooms();

// // Call the UI function with your user object
// UI(user);

/* function displayRooms() {
    var roomTable = document.querySelector('.room1');
    roomTable.innerHTML = ""; // Clear previous data

    // Reference to the rooms in Firebase
    var roomsRef = firebase.database().ref('rooms');

    roomsRef.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var roomId = childSnapshot.key;
            var roomDetails = childSnapshot.val();
            var row = document.createElement('tr');
            var nameCell = document.createElement('td');
            var joinButtonCell = document.createElement('td');
            var joinButton = document.createElement('button');

            nameCell.textContent = roomDetails.roomName;
            joinButton.textContent = 'Join';
            joinButton.className = 'join_buttons';
            joinButton.onclick = function() {
                joinRoom(roomId);
            };

            joinButtonCell.appendChild(joinButton);
            row.appendChild(nameCell);
            row.appendChild(joinButtonCell);
            roomTable.appendChild(row);
        });
    });
}

// Call the displayRooms function to show existing rooms
displayRooms();

// Call the UI function with your user object
UI(user); */