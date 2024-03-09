const firebaseConfig = {
    apiKey: "AIzaSyDZaBdJL0g2Ae5ZKexkbq2KVNKhQcHAcIQ",
    authDomain: "login-kiku.firebaseapp.com",
    databaseURL: "https://login-kiku-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "login-kiku",
    storageBucket: "login-kiku.appspot.com",
    messagingSenderId: "428492797804",
    appId: "1:428492797804:web:d17f2f6a0162ceeef3a549",
    measurementId: "G-LE6BYXM09G"
};
firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const database = firebase.database();

//-------------------------------------------register-------------------------------------------------------------------------------------------------------------------------------------

function register() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const confirm_password = document.getElementById('confirm_password').value;

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        showAlert('Email or Password is Outta Line!!', 'error');
        return;
        // Don't continue running the code
    }
    if (validate_field(username) == false) {
        showAlert('Please Enter username', 'error');
        return;
    }

    // Check if passwords match
    if (password !== confirm_password) {
        showAlert('Passwords do not match!!', 'error');
        return;
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            // Declare user variable
            const user = auth.currentUser;

            // Add this user to Firebase Database
            const database_ref = database.ref();

            // Create User data
            const user_data = {
                email: email,
                username: username,
                confirm_password: confirm_password,
                last_login: Date.now()
            };

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data);

            Swal.fire({
                position: 'static',
                icon: 'success',
                title: 'Success',
                text: 'Register complete',
                customClass: {
                    popup: 'small-popup',
                },
                width: 500,
            }).then(() => {

                // Redirect to login page
                location.href = "main.html";
            });
        })
        .catch((error) => {
            // Firebase will use this to showAlert of its errors
            const error_code = error.code;
            const error_message = error.message;

            showAlert(error_message, 'error');
        });
}


//-------------------------------------------login-------------------------------------------------------------------------------------------------------------------------------------
function login() {
    // Get email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        showAlert('Email or Password is Outta Line!!', 'error')
        return
    }
    // Move on with Auth
    // auth.fetchSignInMethodsForEmail(email)
    //     .then((signInMethods) => {
    //         if (signInMethods.length === 0) {
    //             showAlert('Email is not registered', 'error');
    //         }
    //             // Move on with Auth and try to sign in
    //     })
    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Login complete',

            }).then(() => {
                location.href = "main.html";
            })
            user.updateProfile({
                    displayName: username,
                }).then(function() {
                    console.log(user.displayName);
                })
                .catch(function(error) {
                    // an error occured
                });
            console.log(user.displayName);

        })

    .catch((error) => {
        // Firebase will use this to showAlert of its errors
        const error_code = error.code;
        const error_message = error.message;



        if (error_code === 'auth/invalid-credential') {
            showAlert('Your Email or password incorrect !!', 'error');
        }
    });
}
//-------------------------------------------Function to display alerts-------------------------------------------------------------------------------------------------------------------------------------
function showAlert(message, type) {
    var alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert ${type}">${message}</div>`;

    // Clear the alert after a certain duration (e.g., 5 seconds)
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}

//------------------------------------------- logout -------------------------------------------------------------------------------------------------------------------------------------

const btnLogout = document.querySelector("#btnLogOut");
btnLogout.addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK"
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = "index.html";
            firebase.auth().signOut();
            console.log("Logout Completed.");
        }
    });

});

//------------------------------------------- show email username -------------------------------------------------------------------------------------------------------------------------------------

firebase.auth().onAuthStateChanged((user) => {
    const currentUser = firebase.auth().currentUser;
    if (user) {
        var userNameRef = firebase.database().ref('users/' + currentUser.uid + '/username');
        userNameRef.once("value", (snapshot) => {
            var data = snapshot.val();
            console.log(data);
            document.querySelector('#user-name').innerHTML = data;
            document.querySelector("#user-profile-name").innerHTML = user.email;
            document.querySelector('#user-name2').innerHTML = data;


        });
    }
    console.log("User: ", user);
    /* setupUI(user); */
});