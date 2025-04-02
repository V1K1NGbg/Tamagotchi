document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = form.username.value;
        const password = form.password.value;

        try {
            const response = await fetch('/api/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.status === 200) {
                messageDiv.textContent = 'Authentication successful!';
            } else {
                messageDiv.textContent = 'Authentication failed. Please try again.';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
            console.error('Error:', error);
        }
    });
});

// Tamagotchi game logic

let food = 5;
let happiness = 5;
let energy = 5;

function saveToLocalStorage() {
    const tamagotchiData = {
        food: food,
        happiness: happiness,
        energy: energy,
    };
    localStorage.setItem("tamagotchiData", JSON.stringify(tamagotchiData));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem("tamagotchiData");
    if (savedData) {
        const tamagotchiData = JSON.parse(savedData);
        food = tamagotchiData.food;
        happiness = tamagotchiData.happiness;
        energy = tamagotchiData.energy;
        updateStats();
    }
}

function updateStats() {
    document.getElementById(
        "stats"
    ).innerText = `Food: ${food}, Happiness: ${happiness}, Energy: ${energy}`;
    saveToLocalStorage();
}

function feed() {
    food = Math.min(10, food + 1);
    happiness = Math.max(0, happiness - 1);
    updateStats();
    document.getElementById("status").innerText = "Status: Eating";
}

function play() {
    happiness = Math.min(10, happiness + 1);
    energy = Math.max(0, energy - 1);
    updateStats();
    document.getElementById("status").innerText = "Status: Playing";
}

function sleep() {
    energy = Math.min(10, energy + 1);
    food = Math.max(0, food - 1);
    updateStats();
    document.getElementById("status").innerText = "Status: Sleeping";
}

document.addEventListener("DOMContentLoaded", (event) => {
    const statsElement = document.getElementById("stats");
    loadFromLocalStorage();
    updateStats();
});
