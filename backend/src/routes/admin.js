const express = require('express');
const {
    getAllProviders,
    getProvider,
    createProvider,
    updateProvider,
    deleteProvider,
    getAllPatients,
    getDashboardStats,
    resetProviderPassword,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and only for admins
router.use(protect);
router.use(authorize('admin'));

// Dashboard stats
router.get('/stats', getDashboardStats);

// Provider management routes
router.route('/providers')
    .get(getAllProviders)
    .post(createProvider);

router.route('/providers/:id')
    .get(getProvider)
    .put(updateProvider)
    .delete(deleteProvider);

router.put('/providers/:id/reset-password', resetProviderPassword);

// Patient management routes
router.get('/patients', getAllPatients);

module.exports = router;
