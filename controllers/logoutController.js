const User = require('../model/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', {
            httpOnly: true,
            /*SameSite: 'None',.
            secure: true, */
        });
        res.sendStatus(204);
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt', {
        httpOnly: true,
        //     SameSite: 'None', secure: true
    }); //secure: true https -,only
    res.status(200).json(`user ${foundUser.username} is logged out`);
};

module.exports = { handleLogout };
