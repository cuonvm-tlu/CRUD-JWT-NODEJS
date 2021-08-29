const userService = require('../services/user');

const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, username, email, password, isAdmin } = req.body;
        const user = await userService.registerUser(firstname, lastname, username, email, password, isAdmin);
        return res.json({ status: 200, data: user });
    } catch (e) {
        return res.json({ status: 400, message: e.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.loginUser(username, password);
        return res.json({ status: 200, data: user });
    } catch (e) {
        return res.json({ status: 400, message: e.message });
    }
}

module.exports = { registerUser, loginUser };


