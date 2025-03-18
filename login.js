function goToSignUp(){
    window.location.href = "signup.html";
}

// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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

document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("logged in successfully!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
