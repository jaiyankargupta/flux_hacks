import { useState } from 'react';
import { patientAPI } from '../../services/api.js';

const GoalTracker = ({ goals, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        steps: goals?.steps || 0,
        activeTime: goals?.activeTime || 0,
        sleep: goals?.sleep || 0,
        waterIntake: goals?.waterIntake || 0,
        caloriesBurned: goals?.caloriesBurned || 0,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: parseFloat(e.target.value) || 0,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await patientAPI.updateGoals(formData);
            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error('Error updating goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const goalItems = [
        {
            name: 'Steps',
            icon: '👣',
            current: goals?.steps || 0,
            target: goals?.targets?.steps || 10000,
            unit: 'steps',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Active Time',
            icon: '⏱️',
            current: goals?.activeTime || 0,
            target: goals?.targets?.activeTime || 60,
            unit: 'min',
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Sleep',
            icon: '😴',
            current: goals?.sleep || 0,
            target: goals?.targets?.sleep || 8,
            unit: 'hrs',
            color: 'from-purple-500 to-indigo-500',
        },
        {
            name: 'Water Intake',
            icon: '💧',
            current: goals?.waterIntake || 0,
            target: goals?.targets?.waterIntake || 2000,
            unit: 'ml',
            color: 'from-cyan-500 to-blue-500',
        },
    ];

    return (
        <div className="card animate-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="card-header mb-0">Wellness Goals</h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-secondary text-sm"
                >
                    {isEditing ? 'Cancel' : 'Update Goals'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Steps
                            </label>
                            <input
                                type="number"
                                name="steps"
                                className="input"
                                value={formData.steps}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Active Time (minutes)
                            </label>
                            <input
                                type="number"
                                name="activeTime"
                                className="input"
                                value={formData.activeTime}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sleep (hours)
                            </label>
                            <input
                                type="number"
                                name="sleep"
                                step="0.5"
                                className="input"
                                value={formData.sleep}
                                onChange={handleChange}
                                min="0"
                                max="24"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Water Intake (ml)
                            </label>
                            <input
                                type="number"
                                name="waterIntake"
                                className="input"
                                value={formData.waterIntake}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? 'Saving...' : 'Save Goals'}
                    </button>
                </form>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {goalItems.map((goal, index) => {
                        const progress = calculateProgress(goal.current, goal.target);
                        return (
                            <div key={index} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-lg flex items-center justify-center text-2xl`}>
                                            {goal.icon}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{goal.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {goal.current} / {goal.target} {goal.unit}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-lg font-bold text-primary-600">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {goals?.caloriesBurned > 0 && !isEditing && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-2xl">
                                🔥
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Calories Burned</p>
                                <p className="text-sm text-gray-500">Today's activity</p>
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-orange-600">
                            {goals.caloriesBurned} kcal
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalTracker;
