import { useState } from 'react';
import { patientAPI } from '../../services/api.js';

const GoalTracker = ({ goals, onUpdate }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [goalData, setGoalData] = useState({
        steps: goals?.steps || 0,
        activeTime: goals?.activeTime || 0,
        sleep: goals?.sleep || 0,
        caloriesBurned: goals?.caloriesBurned || 0,
        waterIntake: goals?.waterIntake || 0,
    });

    const goalTargets = {
        steps: 10000,
        activeTime: 60,
        sleep: 8,
        caloriesBurned: 500,
        waterIntake: 2000,
    };

    const handleChange = (e) => {
        setGoalData({
            ...goalData,
            [e.target.name]: Number(e.target.value),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await patientAPI.updateGoals(goalData);
            setShowModal(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            setError('Failed to update goals');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const goalItems = [
        { key: 'steps', label: 'Steps', icon: '👣', unit: 'steps', color: 'blue' },
        { key: 'waterIntake', label: 'Water Intake', icon: '💧', unit: 'ml', color: 'cyan' },
        { key: 'sleep', label: 'Sleep', icon: '😴', unit: 'hours', color: 'purple' },
        { key: 'activeTime', label: 'Active Time', icon: '🏃', unit: 'min', color: 'green' },
        { key: 'caloriesBurned', label: 'Calories Burned', icon: '🔥', unit: 'cal', color: 'orange' },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Today's Goals</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary px-4 py-2 text-sm"
                >
                    Update Goals
                </button>
            </div>

            <div className="space-y-4">
                {goalItems.map((item) => {
                    const current = goals?.[item.key] || 0;
                    const target = goalTargets[item.key];
                    const progress = getProgress(current, target);

                    return (
                        <div key={item.key} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="font-semibold text-gray-800">{item.label}</span>
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {current.toLocaleString()} / {target.toLocaleString()} {item.unit}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full bg-${item.color}-500 rounded-full transition-all duration-500`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="mt-1 text-right">
                                <span className={`text-xs font-medium ${progress >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
                                    {progress.toFixed(0)}% Complete
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add/Edit Goal Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Update Your Goals</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            {error && (
                                <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-4">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        👣 Steps
                                    </label>
                                    <input
                                        type="number"
                                        name="steps"
                                        className="input"
                                        placeholder="10000"
                                        value={goalData.steps}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        💧 Water Intake (ml)
                                    </label>
                                    <input
                                        type="number"
                                        name="waterIntake"
                                        className="input"
                                        placeholder="2000"
                                        value={goalData.waterIntake}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        😴 Sleep (hours)
                                    </label>
                                    <input
                                        type="number"
                                        name="sleep"
                                        className="input"
                                        placeholder="8"
                                        value={goalData.sleep}
                                        onChange={handleChange}
                                        min="0"
                                        max="24"
                                        step="0.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🏃 Active Time (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="activeTime"
                                        className="input"
                                        placeholder="60"
                                        value={goalData.activeTime}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🔥 Calories Burned
                                    </label>
                                    <input
                                        type="number"
                                        name="caloriesBurned"
                                        className="input"
                                        placeholder="500"
                                        value={goalData.caloriesBurned}
                                        onChange={handleChange}
                                        min="0"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 btn btn-primary py-3"
                                    >
                                        {loading ? 'Saving...' : 'Save Goals'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoalTracker;
