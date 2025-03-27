// Disease Priority Scoring System

// Step 1: Define a dictionary mapping diseases to priority scores
const diseasePriority = {
    "heart attack": 10,
    "stroke": 90,
    "cancer": 80,
    "severe infection": 70,
    "diabetes": 50,
    "asthma": 60,
    "fracture": 70,
    "migraine": 30,
    "flu": 20,
    "cold": 10,
    "pneumonia": 70,
    "tuberculosis": 60,
    "kidney failure": 90,
    "liver disease": 70,
    "appendicitis": 80,
    "unknown": 40  // Default score for unknown diseases
};

// Step 2: Function to determine severity level based on priority score
function getSeverity(score) {
    if (score >= 70) return "High";
    if (score >= 40) return "Medium";
    return "Low";
}

// Step 3: Function to get priority score based on disease name
function getPriorityScore(diseaseName, isEmergency) {
    diseaseName = diseaseName.toLowerCase().trim(); // Normalize input
    let score = diseasePriority[diseaseName] || diseasePriority["unknown"]; // Default if not found
    
    // If emergency is "Yes", force the highest priority
    if (isEmergency) {
        score = 100;
    }

    return score;
}

// Step 4: Function to handle button click
function checkPriority() {
    let diseaseInput = document.getElementById("diseaseInput").value.trim();
    let isEmergency = document.getElementById("emergency").value === "yes";

    if (!diseaseInput) {
        alert("Please enter a disease name!");
        return;
    }

    let score = getPriorityScore(diseaseInput, isEmergency);
    let severity = getSeverity(score);

    document.getElementById("result").innerHTML = `
        <strong>Priority Score for "${diseaseInput}": ${score}</strong><br>
        <strong>Severity Level:</strong> ${severity}<br>
        <strong>Emergency Status:</strong> ${isEmergency ? "Yes (Immediate Attention Needed)" : "No"}
    `;
}
