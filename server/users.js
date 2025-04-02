const fs = require('fs');
const path = require('path');

function authenticateUser(users, username, password) {
    const user = users.users.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

function getUserTamagotchi(users, username) {
    return users.users.find(user => user.username === username) || {};
}

function updateUserTamagotchi(users, username, tamagotchi) {
    const userIndex = users.users.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        users.users[userIndex].tamagotchi = tamagotchi;
        return true;
    }
    return false;
}

module.exports = { authenticateUser, getUserTamagotchi, updateUserTamagotchi };