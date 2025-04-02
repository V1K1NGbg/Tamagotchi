const fs = require('fs');
const path = require('path');

function authenticateUser(users, username, password) {
    const user = users.users.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

module.exports = { authenticateUser };