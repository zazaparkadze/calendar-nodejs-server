const mongoose = require('mongoose');
const Schedule = require('../model/Schedule');

const allSchedules = async (req, res) => {
    const schedules = await Schedule.find();
    if (!schedules) return res.status(204).json('no schedule entries found');
    res.json(schedules);
};
const deleteAppointmentInSchedule = async (req, res) => {
    const { id } = req.params;
    const id1 = id.slice(0, id.indexOf('_'));
    const id2 = id.slice(id.indexOf('_') + 1);
    const foundNameEntry = await Schedule.findOne({ id: id1 }).exec();
    const updatedMeetings = foundNameEntry.meetings.filter(
        (e) => e.id !== Number(id2)
    );
    console.log(updatedMeetings);
    foundNameEntry.meetings = updatedMeetings;
    await foundNameEntry.save();
    console.log(foundNameEntry);
};
const createSchedule = async (req, res) => {
    const { id, name, meetings } = req.body;
    if (!id || !name)
        return res
            .status(204)
            .json({ message: 'Bad Request, in and name required' });
    const result = await Schedule.create({
        id: id,
        name: name,
        meetings: meetings,
    });
    res.json(result);
};
const updateSchedule = async (req, res) => {
    // information validation on front end side
    const id = req.body.entryID;
    const meetings = req.body.newApp;
    const foundNameEntry = await Schedule.findOne({ id: id }).exec();
    console.log(foundNameEntry);
    foundNameEntry.meetings = [...foundNameEntry.meetings, meetings];
    const result = await foundNameEntry.save();
    console.log(result);
};

module.exports = {
    allSchedules,
    deleteAppointmentInSchedule,
    createSchedule,
    updateSchedule,
};
