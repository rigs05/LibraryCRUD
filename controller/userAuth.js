const UserModel = require('../database/UserModel');

// User verification middleware
const userExist = async (req, res, next) => {
    try {
        const { user } = req.params;
        const exist = await UserModel.findOne ({ userId: user });
        if (!exist) {
            return res.status(404).json({ error: "User doesn't exist." });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ error: "Middleware Error." }); // add something new in error
    }
}

module.exports = userExist;