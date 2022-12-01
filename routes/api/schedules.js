const express = require('express');
const router = express.Router();
const scheduleController = require('../../controllers/scheduleController');
const ROLES_LIST = require('../../config/rolesList');
const verifyROLES = require('../../middleware/verifyROLES');

router
    .route('/')
    .get(scheduleController.allSchedules)
    .post(
        verifyROLES(ROLES_LIST.Admin, ROLES_LIST.User),
        scheduleController.createSchedule
    )
    .put(scheduleController.updateSchedule);

router.route('/:id').delete(scheduleController.deleteAppointmentInSchedule);

module.exports = router;
