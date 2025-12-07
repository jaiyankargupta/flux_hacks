const express = require('express');
const {
    getDashboard,
    updateGoals,
    getGoalHistory,
    getReminders,
    completeReminder,
    getAvailableProviders,
    assignProvider,
    getAssignedProvider,
    unassignProvider,
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

// Provider assignment routes
router.get('/providers', getAvailableProviders);
router.get('/provider', getAssignedProvider);
router.post('/provider/:providerId', assignProvider);
router.delete('/provider', unassignProvider);

module.exports = router;
