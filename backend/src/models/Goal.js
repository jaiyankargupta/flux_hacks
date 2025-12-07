const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    steps: {
        type: Number,
        default: 0,
    },
    activeTime: {
        type: Number, // in minutes
        default: 0,
    },
    sleep: {
        type: Number, // in hours
        default: 0,
    },
    caloriesBurned: {
        type: Number,
        default: 0,
    },
    waterIntake: {
        type: Number, // in ml
        default: 0,
    },
    // Goal targets
    targets: {
        steps: {
            type: Number,
            default: 10000,
        },
        activeTime: {
            type: Number,
            default: 60,
        },
        sleep: {
            type: Number,
            default: 8,
        },
        waterIntake: {
            type: Number,
            default: 2000,
        },
    },
});

// Create compound index for user and date
goalSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Goal', goalSchema);
