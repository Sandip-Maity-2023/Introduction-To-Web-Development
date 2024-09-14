// Example data for surplus foods
const surplusFoods = [
    { id: 1, name: 'Apples', quantity: 10, expiryDate: '2024-05-01', location: 'Restaurant A' },
    { id: 2, name: 'Bread', quantity: 5, expiryDate: '2024-04-30', location: 'Catering Service B' }
];

const apiUrl = 'http://localhost:3000/api';

async function loadFoodListings() {
    const response = await fetch(`${apiUrl}/food`);
    const surplusFoods = await response.json();
    
    const foodListings = document.getElementById('foodListings');
    foodListings.innerHTML = '';

    surplusFoods.forEach(food => {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        foodItem.innerHTML = `
            <h4>${food.name}</h4>
            <p>Quantity: ${food.quantity}</p>
            <p>Expiry Date: ${food.expiryDate}</p>
            <p>Location: ${food.location}</p>
        `;
        foodListings.appendChild(foodItem);
    });
}

async function handleSearch(event) {
    event.preventDefault();

    const location = document.getElementById('searchLocation').value;
    const type = document.getElementById('searchType').value;

    const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, type })
    });
    const results = await response.json();

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    results.forEach(food => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result';
        resultItem.innerHTML = `
            <h4>${food.name}</h4>
            <p>Quantity: ${food.quantity}</p>
            <p>Expiry Date: ${food.expiryDate}</p>
            <p>Location: ${food.location}</p>
        `;
        searchResults.appendChild(resultItem);
    });
}

document.getElementById('searchForm').addEventListener('submit', handleSearch);

async function handleContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
        alert('Thank you for contacting us!');
        document.getElementById('contactForm').reset();
    } else {
        alert('Failed to submit contact form.');
    }
}

document.getElementById('contactForm').addEventListener('submit', handleContactForm);

function init() {
    loadFoodListings();
}

init();

document.getElementById('searchForm').addEventListener('submit', handleSearch);

function handleContactForm(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // For demonstration purposes, we'll log the contact form data to the console
    console.log('Contact Form Submitted:', { name, email, message });

    // Clear the form
    document.getElementById('contactForm').reset();

    // Optionally, you can show a success message to the user
    alert('Thank you for contacting us!');
}

document.getElementById('contactForm').addEventListener('submit', handleContactForm);

function init() {
    loadFoodListings();
}

init();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const foodRoutes = require('./routes/food');
const searchRoutes = require('./routes/search');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/food', foodRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();

let surplusFoods2= [
    { id: 1, name: 'Apples', quantity: 10, expiryDate: '2024-05-01', location: 'Restaurant A' },
    { id: 2, name: 'Bread', quantity: 5, expiryDate: '2024-04-30', location: 'Catering Service B' }
];

router.get('/', (req, res) => {
    res.json(surplusFoods2);
});

router.post('/', (req, res) => {
    const newFood = req.body;
    newFood.id = surplusFoods.length + 1;
    surplusFoods.push(newFood);
    res.status(201).json(newFood);
});

module.exports = router;

const express = require('express');
const router1 = express.Router();

let surplusFoods1 = [
    { id: 1, name: 'Apples', quantity: 10, expiryDate: '2024-05-01', location: 'Restaurant A' },
    { id: 2, name: 'Bread', quantity: 5, expiryDate: '2024-04-30', location: 'Catering Service B' }
];

router1.post('/', (req, res) => {
    const { location, type } = req.body;
    const results = surplusFoods1.filter(food => 
        (location ? food.location.toLowerCase().includes(location.toLowerCase()) : true) &&
        (type ? food.name.toLowerCase().includes(type.toLowerCase()) : true)
    );
    res.json(results);
});

module.exports = router;