let food = 0;
let happiness = 0;
let energy = 0;
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    const statsElement = document.getElementById("stats");
    updateStats();

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
                
                currentUser = username;
                
                if (result.tamagotchi) {
                    food = result.tamagotchi.food;
                    happiness = result.tamagotchi.happiness;
                    energy = result.tamagotchi.energy;
                    updateStats();
                }
                
                form.style.display = 'none';
            } else {
                messageDiv.textContent = 'Authentication failed. Please try again.';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
            console.error('Error:', error);
        }
    });
});

async function saveToServer() {
    if (!currentUser) return;

    const tamagotchiData = {
        food: food,
        happiness: happiness,
        energy: energy,
    };

    try {
        const response = await fetch('/api/save-tamagotchi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: currentUser,
                tamagotchi: tamagotchiData
            }),
        });

        const result = await response.json();
        console.log(result.message);
    } catch (error) {
        console.error('Error saving to server:', error);
    }
}

function updateStats() {
    document.getElementById(
        "stats"
    ).innerText = `Food: ${food}, Happiness: ${happiness}, Energy: ${energy}`;
    if (currentUser) {
        saveToServer();
    };
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