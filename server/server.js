const express = require('express');
const fs = require('fs');
const path = require('path');
const { authenticateUser, getUserTamagotchi, updateUserTamagotchi} = require('./users');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    
    if (authenticateUser(users, username, password)) {
        const userData = getUserTamagotchi(users, username);
        res.status(200).json({ 
            message: 'Authentication successful',
            tamagotchi: userData.tamagotchi
            // tamagotchi: userData.tamagotchi || { food: 5, happiness: 5, energy: 5 }
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/api/save-tamagotchi', (req, res) => {
    const { username, tamagotchi } = req.body;
    
    try {
        const dbPath = path.join(__dirname, 'db.json');
        const users = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        
        if (updateUserTamagotchi(users, username, tamagotchi)) {
            fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
            res.status(200).json({ message: 'Tamagotchi data saved successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});