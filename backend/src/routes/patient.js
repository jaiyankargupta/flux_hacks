const express = require('express');
const {
    getDashboard,
    updateGoals,
    getGoalHistory,
    getReminders,
    completeReminder,
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and only for patients
router.use(protect);
router.use(authorize('patient'));

router.get('/dashboard', getDashboard);
router.post('/goals', updateGoals);
router.get('/goals/history', getGoalHistory);
router.get('/reminders', getReminders);
router.put('/reminders/:id/complete', completeReminder);

module.exports = router;
