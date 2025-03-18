// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let userId = "user123";  // Replace with dynamic user ID if available

function startQuiz(level) {
    fetch(`http://localhost:5000/quiz?level=${level}`)
        .then(res => res.json())
        .then(data => {
            questions = data;
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById("quiz-container").style.display = "block";
            showQuestion(level);
        })
        .catch(err => console.error("Error fetching quiz:", err));
}

function showQuestion(level) {
    if (currentQuestionIndex >= questions.length) {
        document.getElementById("quiz-container").innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
        saveScoreToFirebase(userId, level);
        return;
    }

    let q = questions[currentQuestionIndex];
    let quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `<h3>${q.question}</h3><ul id="options"></ul><button onclick="nextQuestion('${level}')" disabled id="next-btn">Next</button>`;

    let optionsList = document.getElementById("options");
    q.options.forEach(option => {
        let li = document.createElement("li");
        li.innerText = option;
        li.classList.add("option");
        li.onclick = () => selectAnswer(li, option);
        optionsList.appendChild(li);
    });
}

function selectAnswer(element, option) {
    selectedAnswer = option;
    document.querySelectorAll(".option").forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion(level) {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }
    currentQuestionIndex++;
    selectedAnswer = null;
    showQuestion(level);
}

// 🔹 Function to Save Score to Firebase
async function saveScoreToFirebase(userId, level) {
    try {
        await addDoc(collection(db, "quiz_scores"), {
            userId: userId,
            level: level,
            score: score,
            totalQuestions: questions.length,
            timestamp: new Date()
        });
        console.log("Score saved successfully!");
    } catch (error) {
        console.error("Error saving score to Firebase:", error);
    }
}
