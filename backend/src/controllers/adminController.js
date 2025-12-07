const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');

// @desc    Get all providers
// @route   GET /api/admin/providers
// @access  Private/Admin
exports.getAllProviders = asyncHandler(async (req, res) => {
    const providers = await User.find({ role: 'provider' })
        .select('-password')
        .sort({ createdAt: -1 });

    console.log(`[Admin] Fetched ${providers.length} providers`);

    res.status(200).json({
        success: true,
        count: providers.length,
        data: providers,
    });
});

// @desc    Get single provider
// @route   GET /api/admin/providers/:id
// @access  Private/Admin
exports.getProvider = asyncHandler(async (req, res) => {
    const provider = await User.findById(req.params.id)
        .select('-password')
        .populate('assignedPatients', 'name email');

    if (!provider || provider.role !== 'provider') {
        return res.status(404).json({
            success: false,
            message: 'Provider not found',
        });
    }

    res.status(200).json({
        success: true,
        data: provider,
    });
});

// @desc    Create new provider
// @route   POST /api/admin/providers
// @access  Private/Admin
exports.createProvider = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        providerInfo,
        basicInfo,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log(`[Admin] Failed to create provider: Email ${email} already exists`);
        return res.status(400).json({
            success: false,
            message: 'Provider with this email already exists',
        });
    }

    // Create provider
    const provider = await User.create({
        name,
        email,
        password,
        role: 'provider',
        providerInfo,
        basicInfo,
        consentGiven: true,
    });

    // Remove password from response
    provider.password = undefined;

    console.log(`[Admin] Created new provider: ${provider.name} (${provider.email})`);

    res.status(201).json({
        success: true,
        message: 'Provider created successfully',
        data: provider,
    });
});

// @desc    Update provider
// @route   PUT /api/admin/providers/:id
// @access  Private/Admin
exports.updateProvider = asyncHandler(async (req, res) => {
    let provider = await User.findById(req.params.id);

    if (!provider || provider.role !== 'provider') {
        return res.status(404).json({
            success: false,
            message: 'Provider not found',
        });
    }

    // Fields that can be updated
    const allowedUpdates = [
        'name',
        'email',
        'providerInfo',
        'basicInfo',
    ];

    // Filter out fields that are not allowed to be updated
    const updates = {};
    Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
            updates[key] = req.body[key];
        }
    });

    provider = await User.findByIdAndUpdate(
        req.params.id,
        updates,
        {
            new: true,
            runValidators: true,
        }
    ).select('-password');

    console.log(`[Admin] Updated provider: ${provider._id}`);

    res.status(200).json({
        success: true,
        message: 'Provider updated successfully',
        data: provider,
    });
});

// @desc    Delete provider
// @route   DELETE /api/admin/providers/:id
// @access  Private/Admin
exports.deleteProvider = asyncHandler(async (req, res) => {
    const provider = await User.findById(req.params.id);

    if (!provider || provider.role !== 'provider') {
        return res.status(404).json({
            success: false,
            message: 'Provider not found',
        });
    }

    // Check if provider has assigned patients
    if (provider.assignedPatients && provider.assignedPatients.length > 0) {
        // Unassign provider from all patients
        await User.updateMany(
            { assignedProvider: provider._id },
            { $unset: { assignedProvider: 1 } }
        );
    }

    await User.findByIdAndDelete(req.params.id);

    console.log(`[Admin] Deleted provider: ${req.params.id}`);

    res.status(200).json({
        success: true,
        message: 'Provider deleted successfully',
        data: {},
    });
});

// @desc    Get all patients
// @route   GET /api/admin/patients
// @access  Private/Admin
exports.getAllPatients = asyncHandler(async (req, res) => {
    const patients = await User.find({ role: 'patient' })
        .select('-password')
        .populate('assignedProvider', 'name email providerInfo.specialization')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: patients.length,
        data: patients,
    });
});

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = asyncHandler(async (req, res) => {
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const patientsWithProviders = await User.countDocuments({
        role: 'patient',
        assignedProvider: { $exists: true, $ne: null },
    });
    const patientsWithoutProviders = totalPatients - patientsWithProviders;

    // Get recent registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentPatients = await User.countDocuments({
        role: 'patient',
        createdAt: { $gte: sevenDaysAgo },
    });

    const recentProviders = await User.countDocuments({
        role: 'provider',
        createdAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json({
        success: true,
        data: {
            totalPatients,
            totalProviders,
            patientsWithProviders,
            patientsWithoutProviders,
            recentPatients,
            recentProviders,
        },
    });
});

// @desc    Reset provider password
// @route   PUT /api/admin/providers/:id/reset-password
// @access  Private/Admin
exports.resetProviderPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters',
        });
    }

    const provider = await User.findById(req.params.id);

    if (!provider || provider.role !== 'provider') {
        return res.status(404).json({
            success: false,
            message: 'Provider not found',
        });
    }

    provider.password = newPassword;
    await provider.save();

    console.log(`[Admin] Reset password for provider: ${provider._id}`);

    res.status(200).json({
        success: true,
        message: 'Provider password reset successfully',
    });
});
