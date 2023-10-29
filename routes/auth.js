const UserModel = require('../database/UserModel');
const router = express.router;
const bcrypt = require('bcrypt');

// Registering User
router.post('/register', async (req, res) => {
    try {
        const { userId, pass } = req.body;
        const userExist = await UserModel.findOne({ userId: userId });
        if (userExist) {
            return res.status(400).json({ message: "User already exists, please login." });
        }
        const hash = await bcrypt.hash(pass, 10);
        const newUser = new UserModel({ userId: userId, pass: hash });
        newUser.save();
        res.status(201).json({ message: "User added successfully." });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
})


// User Login
router.post('/login', async (req, res) => {
    try {
        const { userId, pass } = req.body;
        const userExist = await UserModel.findOne({ userId: userId });
        if (!userExist) {
            return res.status(400).json({ message: "User doesn't exist, please register." });
        }
        const passCheck = await bcrypt.compare(pass, userExist.pass );
        if (!passCheck) {
            return res.status(401).json({ error: "Incorrect password, please try again." });
        } else {        // we can add token authentication here
            res.status(200).json({ message: "Welcome " + userId });
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error." });
    }
})



module.exports = router;