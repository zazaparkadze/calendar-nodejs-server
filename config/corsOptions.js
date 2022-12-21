const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by CORS'));
            res.send('not allowed by CORS');
        }
    },
    corsSeccessStatus: 200,
    withCredentials: true,
};

module.exports = corsOptions;
