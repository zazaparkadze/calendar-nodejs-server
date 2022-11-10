const express = require('express');
const router = express.Router();
const scheduleController = require('../../controllers/scheduleController');

router
    .route('/')
    .get(scheduleController.allSchedules)
    .post(scheduleController.createSchedule)
    .put(scheduleController.updateSchedule);

router.route('/:id').delete(scheduleController.deleteAppointmentInSchedule);

module.exports = router;
