const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUsers = async (req, res) => {
    const user = req.body.username;
    const pwd = req.body.password;
    if (!user || !pwd)
        return res
            .status(400)
            .json('message: username and password are required');

    const duplicate = await User.findOne({ username: user }).exec();

    if (duplicate)
        return res
            .status(409)
            .json(`${user} already exists, change the username`);

    const hashedPassword = await bcrypt.hash(pwd, 10);
    try {
        const newUser = await User.create({
            username: user,
            password: hashedPassword,
        });
        console.log(newUser);
        res.status(201).json(`success: new user ${user} is created`);
    } catch (err) {
        console.log(err);
    }
};
module.exports = { handleUsers };
