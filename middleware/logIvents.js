const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

const logEvents = (message, eventName) => {
    if (!fs.existsSync(path.join(__dirname, '..', 'log'))) {
        fs.mkdir(path.join(__dirname, '..', 'log'), (err) => {
            if (err) throw err;
        });
        console.log('log folder created!');
    }
    const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
    const msg = `${dateTime}   ${uuid()}   ${message}\n`;

    fs.appendFile(
        path.join(__dirname, '..', 'log', `${eventName}_log.txt`),
        msg,
        'utf-8',
        (err) => {
            if (err) throw new Error('Why???');
        }
    );
};

const logger = (req, res, next) => {
    let message = req.url + '\t' + req.method + '  ' + req.origin;
    logEvents(message, req.method);
    next();
};

module.exports = { logger, logEvents };
