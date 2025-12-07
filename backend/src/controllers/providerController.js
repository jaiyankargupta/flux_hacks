const User = require('../models/User');
const Goal = require('../models/Goal');
const Reminder = require('../models/Reminder');

// @desc    Get all assigned patients
// @route   GET /api/provider/patients
// @access  Private (Provider)
exports.getPatients = async (req, res, next) => {
    try {
        // Get only patients assigned to this provider
        const patients = await User.find({ 
            role: 'patient',
            assignedProvider: req.user.id 
        }).select('-password');

        // Get compliance status for each patient
        const patientsWithCompliance = await Promise.all(
            patients.map(async (patient) => {
                // Get today's goal
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const todayGoal = await Goal.findOne({
                    user: patient._id,
                    date: { $gte: today },
                });

                // Get pending reminders
                const pendingReminders = await Reminder.countDocuments({
                    user: patient._id,
                    completed: false,
                    dueDate: { $lt: new Date() },
                });

                // Calculate compliance status
                let complianceStatus = 'Goal Met';
                if (pendingReminders > 0) {
                    complianceStatus = 'Missed Preventive Checkup';
                } else if (!todayGoal) {
                    complianceStatus = 'No Data';
                }

                return {
                    ...patient.toObject(),
                    complianceStatus,
                    pendingReminders,
                };
            })
        );

        res.status(200).json({
            success: true,
            count: patientsWithCompliance.length,
            data: patientsWithCompliance,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get specific patient details
// @route   GET /api/provider/patients/:id
// @access  Private (Provider)
exports.getPatientDetails = async (req, res, next) => {
    try {
        const patient = await User.findById(req.params.id).select('-password');

        if (!patient || patient.role !== 'patient') {
            return res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
        }

        // Ensure the patient is assigned to this provider
        if (patient.assignedProvider?.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Patient not assigned to you.',
            });
        }

        // Get patient's goals (last 7 days)
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const goals = await Goal.find({
            user: patient._id,
            date: { $gte: startDate },
        }).sort({ date: -1 });

        // Get patient's reminders
        const reminders = await Reminder.find({
            user: patient._id,
        }).sort({ dueDate: 1 });

        res.status(200).json({
            success: true,
            data: {
                patient,
                goals,
                reminders,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create reminder for patient
// @route   POST /api/provider/patients/:id/reminders
// @access  Private (Provider)
exports.createReminder = async (req, res, next) => {
    try {
        const { title, description, type, dueDate } = req.body;

        const patient = await User.findById(req.params.id);

        if (!patient || patient.role !== 'patient') {
            return res.status(404).json({
                success: false,
                message: 'Patient not found',
            });
        }

        // Ensure the patient is assigned to this provider
        if (patient.assignedProvider?.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Patient not assigned to you.',
            });
        }

        const reminder = await Reminder.create({
            user: patient._id,
            title,
            description,
            type,
            dueDate,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: reminder,
        });
    } catch (error) {
        next(error);
    }
};
