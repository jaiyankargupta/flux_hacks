import { useState } from 'react';
import { providerAPI } from '../../services/api.js';

const PatientDetails = ({ patientData, onReminderCreated }) => {
    const { patient, goals, reminders } = patientData;
    const [showReminderForm, setShowReminderForm] = useState(false);
    const [reminderForm, setReminderForm] = useState({
        title: '',
        description: '',
        type: 'checkup',
        dueDate: '',
    });
    const [loading, setLoading] = useState(false);

    const handleReminderSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await providerAPI.createReminder(patient._id, reminderForm);
            setShowReminderForm(false);
            setReminderForm({
                title: '',
                description: '',
                type: 'checkup',
                dueDate: '',
            });
            onReminderCreated();
        } catch (error) {
            console.error('Error creating reminder:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    return (
        <div className="space-y-6 animate-in">
            {/* Patient Info Card */}
            <div className="card">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                        <p className="text-gray-600">{patient.email}</p>
                    </div>
                    <button
                        onClick={() => setShowReminderForm(!showReminderForm)}
                        className="btn btn-primary"
                    >
                        {showReminderForm ? 'Cancel' : '+ Add Reminder'}
                    </button>
                </div>

                {showReminderForm && (
                    <form onSubmit={handleReminderSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={reminderForm.title}
                                    onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                                    placeholder="Annual Checkup"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select
                                    className="input"
                                    value={reminderForm.type}
                                    onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}
                                >
                                    <option value="checkup">Checkup</option>
                                    <option value="bloodtest">Blood Test</option>
                                    <option value="vaccination">Vaccination</option>
                                    <option value="medication">Medication</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                className="input"
                                rows="3"
                                value={reminderForm.description}
                                onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })}
                                placeholder="Additional details..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Due Date
                            </label>
                            <input
                                type="date"
                                required
                                className="input"
                                value={reminderForm.dueDate}
                                onChange={(e) => setReminderForm({ ...reminderForm, dueDate: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? 'Creating...' : 'Create Reminder'}
                        </button>
                    </form>
                )}

                {patient.healthInfo && (
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-800">Health Information</h3>
                        {patient.healthInfo.allergies && patient.healthInfo.allergies.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-600">Allergies:</p>
                                <p className="text-gray-800">{patient.healthInfo.allergies.join(', ')}</p>
                            </div>
                        )}
                        {patient.healthInfo.medications && patient.healthInfo.medications.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-600">Current Medications:</p>
                                <p className="text-gray-800">{patient.healthInfo.medications.join(', ')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Recent Goals */}
            <div className="card">
                <h3 className="card-header">Recent Wellness Goals</h3>
                {goals && goals.length > 0 ? (
                    <div className="space-y-4">
                        {goals.slice(0, 3).map((goal, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-3">{formatDate(goal.date)}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Steps</p>
                                        <p className="font-semibold text-gray-800">
                                            {goal.steps} / {goal.targets.steps}
                                        </p>
                                        <div className="progress-bar mt-1">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${calculateProgress(goal.steps, goal.targets.steps)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Active Time</p>
                                        <p className="font-semibold text-gray-800">
                                            {goal.activeTime} / {goal.targets.activeTime} min
                                        </p>
                                        <div className="progress-bar mt-1">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${calculateProgress(goal.activeTime, goal.targets.activeTime)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Sleep</p>
                                        <p className="font-semibold text-gray-800">
                                            {goal.sleep} / {goal.targets.sleep} hrs
                                        </p>
                                        <div className="progress-bar mt-1">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${calculateProgress(goal.sleep, goal.targets.sleep)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Water</p>
                                        <p className="font-semibold text-gray-800">
                                            {goal.waterIntake} / {goal.targets.waterIntake} ml
                                        </p>
                                        <div className="progress-bar mt-1">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${calculateProgress(goal.waterIntake, goal.targets.waterIntake)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">No goal data available</p>
                )}
            </div>

            {/* Reminders */}
            <div className="card">
                <h3 className="card-header">Preventive Care Reminders</h3>
                {reminders && reminders.length > 0 ? (
                    <div className="space-y-3">
                        {reminders.map((reminder) => (
                            <div
                                key={reminder._id}
                                className={`p-4 rounded-lg border-2 ${reminder.completed
                                    ? 'border-success-200 bg-success-50'
                                    : 'border-gray-200 bg-white'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">{reminder.title}</h4>
                                        {reminder.description && (
                                            <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                                        )}
                                        <div className="flex items-center mt-2 space-x-4">
                                            <span className="text-xs text-gray-500 capitalize">
                                                {reminder.type}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                Due: {formatDate(reminder.dueDate)}
                                            </span>
                                        </div>
                                    </div>
                                    {reminder.completed ? (
                                        <span className="badge badge-success">Completed</span>
                                    ) : (
                                        <span className="badge badge-warning">Pending</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center py-8">No reminders set</p>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;
