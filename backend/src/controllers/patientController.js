const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');
const HealthTip = require('../models/HealthTip');

// @desc    Get patient dashboard
// @route   GET /api/patient/dashboard
// @access  Private (Patient)
exports.getDashboard = async (req, res, next) => {
    try {
        // Get today's goals
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let todayGoal = await Goal.findOne({
            user: req.user.id,
            date: { $gte: today },
        });

        // If no goal for today, create one with default values
        if (!todayGoal) {
            todayGoal = await Goal.create({
                user: req.user.id,
                date: today,
            });
        }

        // Get upcoming reminders
        const reminders = await Reminder.find({
            user: req.user.id,
            completed: false,
            dueDate: { $gte: new Date() },
        })
            .sort({ dueDate: 1 })
            .limit(5);

        // Get random health tip
        const healthTips = await HealthTip.find({ active: true });
        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

        res.status(200).json({
            success: true,
            data: {
                goals: todayGoal,
                reminders,
                healthTip: randomTip,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update daily goals
// @route   POST /api/patient/goals
// @access  Private (Patient)
exports.updateGoals = async (req, res, next) => {
    try {
        const { steps, activeTime, sleep, caloriesBurned, waterIntake } = req.body;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let goal = await Goal.findOne({
            user: req.user.id,
            date: { $gte: today },
        });

        if (!goal) {
            goal = await Goal.create({
                user: req.user.id,
                date: today,
                steps,
                activeTime,
                sleep,
                caloriesBurned,
                waterIntake,
            });
        } else {
            goal.steps = steps !== undefined ? steps : goal.steps;
            goal.activeTime = activeTime !== undefined ? activeTime : goal.activeTime;
            goal.sleep = sleep !== undefined ? sleep : goal.sleep;
            goal.caloriesBurned = caloriesBurned !== undefined ? caloriesBurned : goal.caloriesBurned;
            goal.waterIntake = waterIntake !== undefined ? waterIntake : goal.waterIntake;
            await goal.save();
        }

        res.status(200).json({
            success: true,
            data: goal,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get goal history
// @route   GET /api/patient/goals/history
// @access  Private (Patient)
exports.getGoalHistory = async (req, res, next) => {
    try {
        const { days = 7 } = req.query;

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        const goals = await Goal.find({
            user: req.user.id,
            date: { $gte: startDate },
        }).sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: goals.length,
            data: goals,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all reminders
// @route   GET /api/patient/reminders
// @access  Private (Patient)
exports.getReminders = async (req, res, next) => {
    try {
        const reminders = await Reminder.find({
            user: req.user.id,
        }).sort({ dueDate: 1 });

        res.status(200).json({
            success: true,
            count: reminders.length,
            data: reminders,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Mark reminder as completed
// @route   PUT /api/patient/reminders/:id/complete
// @access  Private (Patient)
exports.completeReminder = async (req, res, next) => {
    try {
        const reminder = await Reminder.findById(req.params.id);

        if (!reminder) {
            return res.status(404).json({
                success: false,
                message: 'Reminder not found',
            });
        }

        // Make sure user owns the reminder
        if (reminder.user.toString() !== req.user.id) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to update this reminder',
            });
        }

        reminder.completed = true;
        reminder.completedAt = Date.now();
        await reminder.save();

        res.status(200).json({
            success: true,
            data: reminder,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all available healthcare providers
// @route   GET /api/patient/providers
// @access  Private (Patient)
exports.getAvailableProviders = async (req, res, next) => {
    try {
        const User = require('../models/User');
        
        const providers = await User.find({ role: 'provider' })
            .select('name email providerInfo basicInfo createdAt')
            .sort({ 'providerInfo.specialization': 1 });

        res.status(200).json({
            success: true,
            count: providers.length,
            data: providers,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Assign a provider to patient
// @route   POST /api/patient/provider/:providerId
// @access  Private (Patient)
exports.assignProvider = async (req, res, next) => {
    try {
        const User = require('../models/User');
        const providerId = req.params.providerId;

        // Check if provider exists and is actually a provider
        const provider = await User.findById(providerId);
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Provider not found',
            });
        }

        if (provider.role !== 'provider') {
            return res.status(400).json({
                success: false,
                message: 'Selected user is not a healthcare provider',
            });
        }

        // Get current patient
        const patient = await User.findById(req.user.id);

        // If patient already has a provider, remove patient from old provider's list
        if (patient.assignedProvider) {
            await User.findByIdAndUpdate(
                patient.assignedProvider,
                { $pull: { assignedPatients: patient._id } }
            );
        }

        // Update patient's assigned provider
        patient.assignedProvider = providerId;
        await patient.save();

        // Add patient to provider's assigned patients if not already there
        if (!provider.assignedPatients.includes(patient._id)) {
            provider.assignedPatients.push(patient._id);
            await provider.save();
        }

        res.status(200).json({
            success: true,
            message: 'Provider assigned successfully',
            data: {
                patient: {
                    id: patient._id,
                    name: patient.name,
                    assignedProvider: providerId,
                },
                provider: {
                    id: provider._id,
                    name: provider.name,
                    specialization: provider.providerInfo?.specialization,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient's assigned provider
// @route   GET /api/patient/provider
// @access  Private (Patient)
exports.getAssignedProvider = async (req, res, next) => {
    try {
        const User = require('../models/User');
        
        const patient = await User.findById(req.user.id)
            .populate('assignedProvider', 'name email providerInfo basicInfo');

        if (!patient.assignedProvider) {
            return res.status(200).json({
                success: true,
                data: null,
                message: 'No provider assigned',
            });
        }

        res.status(200).json({
            success: true,
            data: patient.assignedProvider,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Unassign provider from patient
// @route   DELETE /api/patient/provider
// @access  Private (Patient)
exports.unassignProvider = async (req, res, next) => {
    try {
        const User = require('../models/User');
        
        const patient = await User.findById(req.user.id);

        if (!patient.assignedProvider) {
            return res.status(400).json({
                success: false,
                message: 'No provider assigned to unassign',
            });
        }

        const providerId = patient.assignedProvider;

        // Remove patient from provider's assigned patients
        await User.findByIdAndUpdate(
            providerId,
            { $pull: { assignedPatients: patient._id } }
        );

        // Remove provider from patient
        patient.assignedProvider = null;
        await patient.save();

        res.status(200).json({
            success: true,
            message: 'Provider unassigned successfully',
        });
    } catch (error) {
        next(error);
    }
};
