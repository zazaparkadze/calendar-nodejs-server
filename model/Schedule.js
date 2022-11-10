const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    meetings: [
        {
            id: {
                type: Number,
                required: true,
            },
            startTime: String,
            endTime: String,
            subject: String,
        },
    ],
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
