// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAMlqYPzug2vE651Uwtn3W3M9PMSlmYAUY",
    authDomain: "authenticate-user-c4b02.firebaseapp.com",
    projectId: "authenticate-user-c4b02",
    storageBucket: "authenticate-user-c4b02.firebasestorage.app",
    messagingSenderId: "458458356629",
    appId: "1:458458356629:web:112c82dd7d1c48c09c349c",
    measurementId: "G-GEMQR6CLHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// SIGN-UP FUNCTIONALITY
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully! Redirecting to login...");
                window.location.href = "index.html"; // Redirect to index page
            })
            .catch((error) => {
                alert("Sign-up Error: " + error.message);
            });
    });
}

// LOGIN FUNCTIONALITY
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful! Redirecting...");
                window.location.href = "dashboard.html"; // Redirect to dashboard after login
            })
            .catch((error) => {
                alert("Login Error: " + error.message);
            });
    });
}
