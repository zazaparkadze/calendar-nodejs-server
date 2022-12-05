const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const usr = req.body.username;
    const pwd = req.body.password;

    const foundUser = await User.findOne({ username: usr }).exec();
    if (!foundUser) return res.status(400).json(`no such ${usr}`);

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                    roles: roles,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30min' }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // SameSite: 'None',
            // secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken, roles });
    } else {
        res.status(403).json({ message: 'you are not authorized!!!' });
    }
};

module.exports = { handleLogin };
