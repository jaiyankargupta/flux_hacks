const mongoose = require('mongoose');

const healthTipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['nutrition', 'exercise', 'mental-health', 'sleep', 'general', 'covid-19', 'seasonal'],
        default: 'general',
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('HealthTip', healthTipSchema);
