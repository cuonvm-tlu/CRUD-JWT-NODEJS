const db = require('../models');
const hash = require('../utils/hash');
const jwt = require('jsonwebtoken');

const User = db.User;

const registerUser = async (firstname, lastname, username, email, password, isAdmin) => {
    try {
        const hashed = await hash.hashPassword(password);
        const newUser = {
            firstname,
            lastname,
            username,
            email,
            password: hashed, 
            isAdmin
        };

        const user = await User.create(newUser);
        return user;
    } catch (e) {
        throw Error(`Error in creating user - ${e}`);
    }
}

const loginUser = async (username, password) => {
    try {
        const user = await User.findOne({ where: { username }});
        console.log(user)
        if (!user || !await(hash.checkPassword(password, user.password))) {
            throw Error('Username or password is incorrect.');
        }

        const payload = { 
            id: user.id, 
            username 
        };    
        const token = jwt.sign(payload, 'secret-password', { expiresIn: '1h'});
        const { email } = user;
        const { id } = user; 
        return { token, user: { username, email, id} };
    } catch (e) {
        throw Error(`Error in login user - ${e}`);
    }
}

module.exports = { registerUser, loginUser };