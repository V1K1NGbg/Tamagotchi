const express = require('express');
const fs = require('fs');
const path = require('path');
const { authenticateUser } = require('./users');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

app.post('/api/authenticate', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
    
    if (authenticateUser(users, username, password)) {
        res.status(200).json({ message: 'Authentication successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});