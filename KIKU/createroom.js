 /* -------------------------------------------- CreateRoom----------------------------------------------------------------- */
 function createNewRoom() {
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






 /* -------------------------------------------- join room ----------------------------------------------------------------- */

 function joinRoom(roomId) {
     const currentUser = firebase.auth().currentUser;

     // Check if the current user is already a player in the room
     var userRoomRef = firebase.database().ref('users/' + currentUser.uid + '/room');
     userRoomRef.once('value')
         .then((snapshot) => {
             var userRoomId = snapshot.val();

             if (userRoomId === roomId) {
                 console.log("You are already in this room.");
                 return;
             }

             // Check if the room is full (player 2 already exists)
             var roomRef = firebase.database().ref('rooms/' + roomId);
             roomRef.once('value')
                 .then((roomSnapshot) => {
                     var roomDetails = roomSnapshot.val();

                     if (roomDetails.player2) {
                         console.log("Room is full. Cannot join.");
                     } else {
                         // Update the room details to add player 2
                         roomRef.update({
                             player2: currentUser.uid
                         });

                         // Save the room ID to the user's data
                         userRoomRef.set(roomId);

                         // Redirect to the game page with room ID and player role
                         window.location.href = 'create_room_wait_3x3.html?roomId=' + roomId + '&role=player2';
                     }
                 })
                 .catch((error) => {
                     console.error("Error fetching room details:", error);
                 });
         })
         .catch((error) => {
             console.error("Error fetching user room:", error);
         });
 }

 /* -------------------------------------------- display room names ----------------------------------------------------------------- */
 function displayAvailableRooms() {
     var roomTable = document.querySelector('.room1');
     roomTable.innerHTML = ""; // Clear previous data

     // Reference to the rooms in Firebase
     var roomsRef = firebase.database().ref('rooms');

     roomsRef.once('value', function(snapshot) {
         snapshot.forEach(function(childSnapshot) {
             var roomId = childSnapshot.key;
             var roomDetails = childSnapshot.val();

             // Display only joinable rooms (customize criteria based on your requirements)
             if (!roomDetails.player2 && !roomDetails.password) {
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
             }
         });
     });
 }

 // Call the displayAvailableRooms function to show joinable rooms when the page loads
 displayAvailableRooms();



 /* -------------------------------------------- join room ----------------------------------------------------------------- */


 //  function joinRoom(roomName) {
 //      // Your logic to handle joining the room
 //      // For now, redirect to the waiting room with the selected roomName
 //      window.location.href = 'create_room_wait_3x3.html?roomName=' + roomName;
 //  }

 //  // Call the displayRooms function to show existing rooms
 //  displayRooms();

 //  UI(user);







 /* -------------------------------------------- display room names ----------------------------------------------------------------- */

 //  function displayRooms() {
 //      var roomTable = document.querySelector('.room1');
 //      roomTable.innerHTML = ""; // Clear previous data

 //      // Reference to the rooms in Firebase
 //      var roomsRef = firebase.database().ref('rooms');

 //      roomsRef.once('value', function(snapshot) {
 //          snapshot.forEach(function(childSnapshot) {
 //              var roomId = childSnapshot.key;
 //              var roomDetails = childSnapshot.val();
 //              console.log(roomDetails)
 //                  // Display only joinable rooms (customize criteria based on your requirements)
 //              if (!roomDetails.player2 && !roomDetails.password) {
 //                  var row = document.createElement('tr');
 //                  var nameCell = document.createElement('td');
 //                  var joinButtonCell = document.createElement('td');
 //                  var joinButton = document.createElement('button');

 //                  nameCell.textContent = roomDetails.roomName;
 //                  joinButton.textContent = 'Join';
 //                  joinButton.className = 'join_buttons';
 //                  joinButton.onclick = function() {
 //                      joinRoom(roomId);
 //                  };

 //                  joinButtonCell.appendChild(joinButton);
 //                  row.appendChild(nameCell);
 //                  row.appendChild(joinButtonCell);
 //                  roomTable.appendChild(row);
 //              }
 //          });
 //      });
 //  }

 //  // Call the displayAvailableRooms function to show joinable rooms when the page loads
 //  displayAvailableRooms();
 //  ableRooms

 //  //  function to show joinable rooms when the page loads
 //  displayAvailableRooms();