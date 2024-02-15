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


// Set up our register function
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
                location.href = "login.html";
            });
        })
        .catch((error) => {
            // Firebase will use this to showAlert of its errors
            const error_code = error.code;
            const error_message = error.message;

            showAlert(error_message, 'error');
        });
}



//login


// function checkEmailAndPassword(email, password) {
//     // Check if email is registered
//     auth.fetchSignInMethodsForEmail(email)
//         .then(function(signInMethods) {
//             if (signInMethods.length === 0) {
//                 alert('Email is not registered. Please register.');
//             } else {
//                 // Email is registered, proceed with password validation
//                 return auth.signInWithEmailAndPassword(email, password);
//             }
//         })
//         .then(function(userCredential) {
//             // Password is correct, proceed with login
//             var user = userCredential.user;
//             showAlert('Login successful!', 'success');
//             // Additional actions after successful login if needed
//         })
//         .catch(function(error) {
//             // Handle login errors, including incorrect password
//             var error_code = error.code;
//             var error_message = error.message;

//             if (error_code === 'auth/wrong-password') {
//                 showAlert('Incorrect password. Please try again.', 'error');
//             } else if (error_code === 'auth/invalid-email') {
//                 showAlert('Invalid email address. Please check your email.', 'error');
//             } else {
//                 showAlert(error_message, 'error');
//             }
//         });
// }

// function checkEmailAndPassword(email, password) {
//     // Check if email is registered
//     auth.signInWithEmailAndPassword(email, password)
//         .then(function(userCredential) {
//             // Password is correct, proceed with login
//             var user = userCredential.user;
//             showAlert('Login successful!', 'success');
//             // Additional actions after successful login if needed
//         })
//         .catch(function(error) {
//             // Handle login errors, including incorrect password
//             const error_code = error.code;
//             const error_message = error.message;

//             if (error_code == 'auth/user-not-found') {
//                 alert('Email is not registered. Please register.');
//             } else if (error_code == 'auth/wrong-password') {
//                 alert('Incorrect password. Please try again.', 'error');
//             } else if (error_code == 'auth/invalid-email') {
//                 alert('Invalid email address. Please check your email.', 'error');
//             } else {
//                 alert(error_message, 'error');
//             }
//         });
// }

//login วิธีที่1

// function login(email, password) {
//     auth.signInWithEmailAndPassword(email, password)
// .then(function() {
//     var user = auth.currentUser;
//     var database_ref = database.ref();
//     var user_data = {
//         last_login: Date.now()
//     }
//     database_ref.child('users/' + user.uid).update(user_data);
//     alert('User Logged In!!');
// })
//         .catch(function(error) {
//             alert(error.message);
//         });
// }

// Modify your existing login function to call checkEmailAndPassword

//login วิธีที่2

// function login() {
//     // Get all our input fields
//     email = document.getElementById('email').value
//     password = document.getElementById('password').value

//     // Validate input fields
//     if (validate_email(email) == false || validate_password(password) == false) {
//         alert('Email or Password is Outta Line!!')
//         return;
//         // Don't continue running the code
//     }

//     // Check email and password
//     auth.fetchSignInMethodsForEmail(email)
//         .then(function (signInMethods) {
//             if (signInMethods.length === 0) {
//                 alert('Email is not registered. Please register.');
//             } else {
//                 // Email is registered, proceed with password validation
//                 return auth.signInWithEmailAndPassword(email, password);
//             }
//         })
//         .then(function (userCredential) {
//             // Password is correct, proceed with login
//             var user = userCredential.user;
//             showAlert('Login successful!', 'success');
//             // Additional actions after successful login if needed
//         })
//         .catch(function (error) {
//             // Handle login errors, including incorrect password
//             var error_code = error.code;
//             var error_message = error.message;

//             if (error_code === 'auth/wrong-password') {
//                 showAlert('Incorrect password. Please try again.', 'error');
//             } else if (error_code === 'auth/user-not-found') {
//                 showAlert('Email not found. Please register.', 'error');
//             } else {
//                 showAlert(error_message, 'error');
//             }
//         });
// }




// Set up our login function

//login วิธีที่3

// function login() {
//     // Get the values from email and password input fields
//     event.preventDefault();
//     var email = document.getElementById('email').value;
//     var password = document.getElementById('password').value;

//     // Validate input fields
//     if (validate_email(email) === false || validate_password(password) === false) {
//         showAlert('Email or Password is invalid!!', 'error');
//         return;
//     }

//     // Use Firebase authentication
//     auth.fetchSignInMethodsForEmail(email)
//         .then(function (signInMethods) {
//             if (signInMethods.length === 0) {
//                 // showAlert('ควย', 'error');
//             } else {
//                 // Email is registered, proceed with password validation
//                 return auth.signInWithEmailAndPassword(email, password);
//             }
//         })
//         .then(function (userCredential) {
//             // Password is correct, proceed with login
//             var user = userCredential.user;
//             showAlert('Login successful!', 'success');
//             // Additional actions after successful login if needed
//         })
//         .catch(function (error) {
//             // Handle authentication errors
//             var errorCode = error.code;
//             var errorMessage = error.message;

//             if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
//                 showAlert('Invalid email or password!', 'error');
//              } //else {
//             //     showAlert(errorMessage, 'error');
//             // }
//         });
// }


//login 4
// const signupForm = document.querySelector("#signup-form");
// signupForm.addEventListener("submit", createUser);

// const signupFeedback = document.querySelector("#feedback-msg-signup");
// const signupModal = new bootstrap.Modal(document.querySelector("#modal-signup"));

// const loginForm = document.querySelector("#login-form");
// loginForm.addEventListener('submit', loginUser);

// const loginFeedback = document.querySelector("#feedback-msg-login");
// const loginModal = new bootstrap.Modal(document.querySelector("#modal-login"))

// function login(event){
//     event.preventDefault();
//     const email = loginForm["email"].value;
//     const password = loginForm["password"].value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then(() => {
//         loginFeedback.style = "color: green";
//         loginFeedback.innerHTML = "<i class='bi bi-check-circle-fill'></i> Login succeed!";
//         setTimeout(() => {
//             loginModal.hide();
//             loginForm.reset();
//             loginFeedback.innerHTML = "";
//         }, 1000)
//     })
//     .catch((error) => {
//         loginFeedback.style = "color: crimson";
//         loginFeedback.innerHTML = `<i class='bi bi-exclamation-triangle-fill'></i> ${error.message}`
//         loginForm.reset();
//     })
// }



// Function to display alerts
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



function login() {
    // Get email and password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (validate_email(email) == false || validate_password(password) == false) {
        showAlert('Email or Password is Outta Line!!', 'error')
        return
    }

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

        })




    .catch((error) => {
        // Firebase will use this to showAlert of its errors
        const error_code = error.code;
        const error_message = error.message;

        if (error_code === 'auth/user-not-found' || error_code === 'auth/wrong-password') {
            showAlert('Invalid email or password', 'error');
        } else {
            showAlert(error_message, 'error');
        }
    });
}