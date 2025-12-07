const express = require('express');
const {
    getPatients,
    getPatientDetails,
    createReminder,
} = require('../controllers/providerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and only for providers
router.use(protect);
router.use(authorize('provider'));

router.get('/patients', getPatients);
router.get('/patients/:id', getPatientDetails);
router.post('/patients/:id/reminders', createReminder);

module.exports = router;
