class Patient {
    constructor(name, disease, severity, arrivalTime) {
        this.name = name;
        this.disease = disease;
        this.severity = severity;
        this.arrivalTime = arrivalTime;
    }

    compareTo(other) {
        if (this.severity === other.severity) {
            return this.arrivalTime - other.arrivalTime;
        }
        return this.severity - other.severity;
    }

    toString() {
        return `${this.name} (Disease: ${this.disease}, Severity: ${this.severity}, Arrival Time: ${this.arrivalTime})`;
    }
}

class HospitalQueue {
    constructor() {
        this.queue = [];
        this.time = 0; // Time to track patient arrivals
    }

    admitPatient(name, disease, severity) {
        const patient = new Patient(name, disease, severity, this.time);
        this.queue.push(patient);
        this.queue.sort((a, b) => a.compareTo(b)); // Sort patients by priority (severity)
        this.time++;
    }

    treatPatient() {
        if (this.queue.length > 0) {
            return this.queue.shift(); // Treat the most urgent patient
        }
        return null;
    }

    getNextPatient() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    remainingPatients() {
        return this.queue;
    }
}

const hospital = new HospitalQueue();

// DOM elements
const admitForm = document.getElementById('admit-form');
const nameInput = document.getElementById('name');
const diseaseInput = document.getElementById('disease');
const severityInput = document.getElementById('severity');
const nextPatientDiv = document.getElementById('next-patient');
const remainingPatientsDiv = document.getElementById('remaining-patients');
const treatButton = document.getElementById('treat-patient');

// Update the remaining patients display with full queue list
function updateRemainingPatients() {
    const remainingQueue = hospital.remainingPatients();
    if (remainingQueue.length === 0) {
        remainingPatientsDiv.innerText = "There are no remaining patients.";
    } else {
        remainingPatientsDiv.innerHTML = "Remaining Patients:<br>";
        remainingQueue.forEach((patient, index) => {
            remainingPatientsDiv.innerHTML += `${index + 1}. ${patient.toString()}<br>`;
        });
    }
}

// Update the next patient display
function updateNextPatient() {
    const nextPatient = hospital.getNextPatient();
    if (nextPatient) {
        nextPatientDiv.innerText = `Next patient: ${nextPatient.name} with disease ${nextPatient.disease} (Severity: ${nextPatient.severity})`;
        treatButton.disabled = false;
    } else {
        nextPatientDiv.innerText = "No patients in the queue.";
        treatButton.disabled = true;
    }
}

// Handle the admit patient form submission
admitForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent default form submission (page reload)

    const name = nameInput.value.trim();
    const disease = diseaseInput.value.trim();
    const severity = parseInt(severityInput.value.trim(), 10);

    // Check if inputs are valid
    if (name && disease && !isNaN(severity)) {
        hospital.admitPatient(name, disease, severity);
        nameInput.value = '';  // Clear the input fields after submission
        diseaseInput.value = '';
        severityInput.value = '';

        // Update the UI with the next patient and the remaining patients
        updateNextPatient();
        updateRemainingPatients();
    } else {
        alert('Please fill in all fields with valid values.');
    }
});

// Handle the treat next patient button click
treatButton.addEventListener('click', () => {
    const treatedPatient = hospital.treatPatient();
    if (treatedPatient) {
        alert(`Treated patient: ${treatedPatient.name} with disease ${treatedPatient.disease}`);
    }

    // Update the UI with the next patient and the remaining patients
    updateNextPatient();
    updateRemainingPatients();
});
