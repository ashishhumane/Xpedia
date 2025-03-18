const courses = [
    { title: "Introduction to Software Engineering", description: "Software Engineering is the discipline of designing, developing, testing, and maintaining software systems in a structured and efficient manner. It combines principles from computer science, project management, and engineering to build high-quality, scalable, and reliable software solutions." },
    { title: "Web Development", description: "Web Development is the process of building and maintaining websites and web applications. It involves a combination of front-end (client-side) and back-end (server-side) development to create interactive, dynamic, and user-friendly digital experiences." },
    { title: "Data Structures & Algorithms", description: "Data Structures & Algorithms (DSA) form the foundation of computer science and programming. Understanding DSA helps in writing efficient code, optimizing performance, and solving complex computational problems effectively" },
    { title: "Database Management Systems", description: "A Database Management System (DBMS) is software that allows users to create, manage, and manipulate databases efficiently. It ensures data integrity, security, and accessibility while optimizing performance for large-scale data storage and retrieval." },
    { title: "Software Testing & Quality Assurance", description: "Software Testing & Quality Assurance (QA) ensures that software applications meet specified requirements and function correctly before deployment. It involves systematic evaluation to detect defects, improve performance, and enhance user experience." },
    { title: "Thermodynamics", description: "Thermodynamics is the branch of physics that deals with heat, energy, and their transformations in physical and chemical processes. It plays a crucial role in engineering, physics, and environmental sciences, providing fundamental principles for understanding energy conservation and conversion." },
    { title: "Introduction to Electrical Circuits", description: "Electrical circuits are the foundation of all modern electronic devices, from simple household appliances to complex computing systems. This course introduces the fundamental principles of electrical circuits, their components, and how they function." },
    { title: "Civil Engineering Structures", description: "Civil engineering structures form the backbone of our modern infrastructure, including buildings, bridges, dams, and roads. This course explores the principles behind the design, construction, and maintenance of these structures, ensuring they are safe, durable, and efficient." }
];

function loadCourses() {
    const container = document.getElementById("coursesContainer");

    courses.forEach((course, index) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
        if (index === 0) courseCard.classList.add("active");

        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button class="explore-btn" onclick="exploreCourse('${course.title}')">Explore</button>
        `;
        container.appendChild(courseCard);
    });
}
function scrollLeft() {
    const container = document.getElementById("coursesContainer");
    const scrollAmount = 350; // Adjust based on your card width

    if (container.scrollLeft === 0) {
        container.scrollLeft = container.scrollWidth - container.clientWidth; // Move to the end
    } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
    resetAutoScroll();
}

function scrollRight() {
    const container = document.getElementById("coursesContainer");
    const scrollAmount = 350;

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        container.scrollLeft = 0; // Reset to the start
    } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
}




function exploreCourse(courseTitle) {
    alert("Exploring: " + courseTitle);
}

let autoScroll;
function startAutoScroll() {
    autoScroll = setInterval(scrollRight, 4000);
}

function resetAutoScroll() {
    clearInterval(autoScroll);
    setTimeout(startAutoScroll, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    loadCourses();
    startAutoScroll();

    const courseWrapper = document.querySelector(".courses-wrapper");

    courseWrapper.addEventListener("mouseenter", () => clearInterval(autoScroll));
    courseWrapper.addEventListener("mouseleave", startAutoScroll);

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            scrollLeft();
        } else if (event.key === "ArrowRight") {
            scrollRight();
        }
    });
});