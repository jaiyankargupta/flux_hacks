import { useState } from 'react';
import { patientAPI } from '../../services/api.js';

const GoalTracker = ({ goals, onUpdate }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // For updating current progress (numerator)
    const [progressData, setProgressData] = useState({
        steps: goals?.steps || 0,
        activeTime: goals?.activeTime || 0,
        sleep: goals?.sleep || 0,
        caloriesBurned: goals?.caloriesBurned || 0,
        waterIntake: goals?.waterIntake || 0,
    });

    // For setting targets (denominator)
    const [targetData, setTargetData] = useState({
        steps: goals?.targets?.steps || 10000,
        activeTime: goals?.targets?.activeTime || 60,
        sleep: goals?.targets?.sleep || 8,
        caloriesBurned: goals?.targets?.caloriesBurned || 500,
        waterIntake: goals?.targets?.waterIntake || 2000,
    });

    const goalTargets = {
        steps: goals?.targets?.steps || 10000,
        activeTime: goals?.targets?.activeTime || 60,
        sleep: goals?.targets?.sleep || 8,
        caloriesBurned: goals?.targets?.caloriesBurned || 500,
        waterIntake: goals?.targets?.waterIntake || 2000,
    };

    const handleProgressChange = (e) => {
        setProgressData({
            ...progressData,
            [e.target.name]: Number(e.target.value),
        });
    };

    const handleTargetChange = (e) => {
        setTargetData({
            ...targetData,
            [e.target.name]: Number(e.target.value),
        });
    };

    const handleUpdateProgress = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await patientAPI.updateGoals(progressData);
            setShowUpdateModal(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            setError('Failed to update progress');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // This would need a new API endpoint to update targets
            // For now, we'll use the same endpoint but with targets field
            await patientAPI.updateGoals({ targets: targetData });
            setShowAddModal(false);
            if (onUpdate) onUpdate();
        } catch (err) {
            setError('Failed to add goal targets');
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
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="btn btn-secondary px-4 py-2 text-sm"
                    >
                        + Add Goal
                    </button>
                    <button
                        onClick={() => setShowUpdateModal(true)}
                        className="btn btn-primary px-4 py-2 text-sm"
                    >
                        Update Goals
                    </button>
                </div>
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


            {/* Update Goal Modal - Updates current progress (numerator) */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Update Your Progress</h3>
                                    <p className="text-sm text-gray-500 mt-1">Update your current progress for today</p>
                                </div>
                                <button
                                    onClick={() => setShowUpdateModal(false)}
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

                            <form onSubmit={handleUpdateProgress} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        👣 Steps (Current)
                                    </label>
                                    <input
                                        type="number"
                                        name="steps"
                                        className="input"
                                        placeholder="0"
                                        value={progressData.steps}
                                        onChange={handleProgressChange}
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Target: {goalTargets.steps} steps</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        💧 Water Intake (ml) (Current)
                                    </label>
                                    <input
                                        type="number"
                                        name="waterIntake"
                                        className="input"
                                        placeholder="0"
                                        value={progressData.waterIntake}
                                        onChange={handleProgressChange}
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Target: {goalTargets.waterIntake} ml</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        � Sleep (hours) (Current)
                                    </label>
                                    <input
                                        type="number"
                                        name="sleep"
                                        className="input"
                                        placeholder="0"
                                        value={progressData.sleep}
                                        onChange={handleProgressChange}
                                        min="0"
                                        max="24"
                                        step="0.5"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Target: {goalTargets.sleep} hours</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🏃 Active Time (minutes) (Current)
                                    </label>
                                    <input
                                        type="number"
                                        name="activeTime"
                                        className="input"
                                        placeholder="0"
                                        value={progressData.activeTime}
                                        onChange={handleProgressChange}
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Target: {goalTargets.activeTime} min</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🔥 Calories Burned (Current)
                                    </label>
                                    <input
                                        type="number"
                                        name="caloriesBurned"
                                        className="input"
                                        placeholder="0"
                                        value={progressData.caloriesBurned}
                                        onChange={handleProgressChange}
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Target: {goalTargets.caloriesBurned} cal</p>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowUpdateModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 btn btn-primary py-3"
                                    >
                                        {loading ? 'Updating...' : 'Update Progress'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Goal Modal - Sets target values (denominator) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Set Goal Targets</h3>
                                    <p className="text-sm text-gray-500 mt-1">Define your daily wellness targets</p>
                                </div>
                                <button
                                    onClick={() => setShowAddModal(false)}
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

                            <form onSubmit={handleAddGoal} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        👣 Steps Target
                                    </label>
                                    <input
                                        type="number"
                                        name="steps"
                                        className="input"
                                        placeholder="10000"
                                        value={targetData.steps}
                                        onChange={handleTargetChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        💧 Water Intake Target (ml)
                                    </label>
                                    <input
                                        type="number"
                                        name="waterIntake"
                                        className="input"
                                        placeholder="2000"
                                        value={targetData.waterIntake}
                                        onChange={handleTargetChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        😴 Sleep Target (hours)
                                    </label>
                                    <input
                                        type="number"
                                        name="sleep"
                                        className="input"
                                        placeholder="8"
                                        value={targetData.sleep}
                                        onChange={handleTargetChange}
                                        min="0"
                                        max="24"
                                        step="0.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🏃 Active Time Target (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="activeTime"
                                        className="input"
                                        placeholder="60"
                                        value={targetData.activeTime}
                                        onChange={handleTargetChange}
                                        min="0"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        🔥 Calories Burned Target
                                    </label>
                                    <input
                                        type="number"
                                        name="caloriesBurned"
                                        className="input"
                                        placeholder="500"
                                        value={targetData.caloriesBurned}
                                        onChange={handleTargetChange}
                                        min="0"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 btn btn-primary py-3"
                                    >
                                        {loading ? 'Saving...' : 'Set Targets'}
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
