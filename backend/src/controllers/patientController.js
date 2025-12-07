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
