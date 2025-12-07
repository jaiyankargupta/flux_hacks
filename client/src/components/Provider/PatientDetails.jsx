import { useState } from 'react';
import { providerAPI } from '../../services/api.js';
import Modal from '../Common/Modal.jsx';
import '../../styles/Modal.css';

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
            {/* Patient Basic Info Card */}
            <div className="card">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xl">
                                {patient.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                            <p className="text-gray-600">{patient.email}</p>
                            {patient.basicInfo?.contactNumber && (
                                <p className="text-gray-600">📞 {patient.basicInfo.contactNumber}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowReminderForm(true)}
                        className="btn btn-primary"
                    >
                        + Add Reminder
                    </button>
                </div>

                {/* Basic Information Grid */}
                {patient.basicInfo && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Basic Information</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {patient.basicInfo.age && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Age</p>
                                    <p className="font-semibold text-gray-800">{patient.basicInfo.age} years</p>
                                </div>
                            )}
                            {patient.basicInfo.gender && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Gender</p>
                                    <p className="font-semibold text-gray-800 capitalize">{patient.basicInfo.gender}</p>
                                </div>
                            )}
                            {patient.basicInfo.height && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Height</p>
                                    <p className="font-semibold text-gray-800">{patient.basicInfo.height} cm</p>
                                </div>
                            )}
                            {patient.basicInfo.weight && (
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-600">Weight</p>
                                    <p className="font-semibold text-gray-800">{patient.basicInfo.weight} kg</p>
                                </div>
                            )}
                            {patient.basicInfo.bloodGroup && (
                                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-600">Blood Group</p>
                                    <p className="font-semibold text-red-800">{patient.basicInfo.bloodGroup}</p>
                                </div>
                            )}
                            {patient.basicInfo.height && patient.basicInfo.weight && (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-600">BMI</p>
                                    <p className="font-semibold text-blue-800">
                                        {((patient.basicInfo.weight / ((patient.basicInfo.height/100) ** 2)).toFixed(1))}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Emergency Contact */}
                {patient.healthInfo?.emergencyContact && (
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3 border-b pb-2">Emergency Contact</h3>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                    <p className="text-sm text-orange-600">Name</p>
                                    <p className="font-semibold text-orange-800">{patient.healthInfo.emergencyContact.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-orange-600">Phone</p>
                                    <p className="font-semibold text-orange-800">{patient.healthInfo.emergencyContact.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-orange-600">Relationship</p>
                                    <p className="font-semibold text-orange-800 capitalize">{patient.healthInfo.emergencyContact.relationship}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Modal
                    isOpen={showReminderForm}
                    onClose={() => setShowReminderForm(false)}
                    title="Create New Reminder"
                    size="md"
                >
                    <form onSubmit={handleReminderSubmit} className="space-y-4">
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
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowReminderForm(false)}
                                className="btn bg-gray-500 hover:bg-gray-600 text-white flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary flex-1"
                            >
                                {loading ? 'Creating...' : 'Create Reminder'}
                            </button>
                        </div>
                    </form>
                </Modal>

                {/* Comprehensive Health Information */}
                {patient.healthInfo && (
                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 border-b pb-2">Medical Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Medical Conditions */}
                            {patient.healthInfo.conditions && patient.healthInfo.conditions.length > 0 && (
                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                    <p className="text-sm font-medium text-yellow-700 mb-2">🏥 Medical Conditions</p>
                                    <div className="space-y-1">
                                        {patient.healthInfo.conditions.map((condition, index) => (
                                            <span key={index} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                                                {condition}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Allergies */}
                            {patient.healthInfo.allergies && patient.healthInfo.allergies.length > 0 && (
                                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                    <p className="text-sm font-medium text-red-700 mb-2">⚠️ Allergies</p>
                                    <div className="space-y-1">
                                        {patient.healthInfo.allergies.map((allergy, index) => (
                                            <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                                                {allergy}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Current Medications */}
                            {patient.healthInfo.medications && patient.healthInfo.medications.length > 0 && (
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <p className="text-sm font-medium text-green-700 mb-2">💊 Current Medications</p>
                                    <div className="space-y-1">
                                        {patient.healthInfo.medications.map((medication, index) => (
                                            <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                                                {medication}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Medical History */}
                            {patient.healthInfo.medicalHistory && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-sm font-medium text-blue-700 mb-2">📋 Medical History</p>
                                    <p className="text-blue-800 text-sm">{patient.healthInfo.medicalHistory}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Wellness Goals & Progress */}
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="card-header flex items-center gap-2">
                        <span>🎯</span> Wellness Goals & Progress
                    </h3>
                    {goals && goals.length > 0 && (
                        <span className="text-sm text-gray-500">Last 7 days</span>
                    )}
                </div>
                {goals && goals.length > 0 ? (
                    <div className="space-y-4">
                        {goals.slice(0, 5).map((goal, index) => {
                            const overallProgress = (
                                (calculateProgress(goal.steps, goal.targets.steps) +
                                calculateProgress(goal.activeTime, goal.targets.activeTime) +
                                calculateProgress(goal.sleep, goal.targets.sleep) +
                                calculateProgress(goal.waterIntake, goal.targets.waterIntake)) / 4
                            ).toFixed(0);
                            
                            return (
                                <div key={index} className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-r-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm font-medium text-gray-700">{formatDate(goal.date)}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500">Overall Progress:</span>
                                            <div className="flex items-center gap-1">
                                                <span className={`text-sm font-bold ${overallProgress >= 80 ? 'text-green-600' : overallProgress >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {overallProgress}%
                                                </span>
                                                {overallProgress >= 80 ? '🟢' : overallProgress >= 60 ? '🟡' : '🔴'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span>🚶‍♂️</span>
                                                <p className="text-xs font-medium text-gray-600">Steps</p>
                                            </div>
                                            <p className="font-bold text-gray-800 text-lg">
                                                {goal.steps?.toLocaleString() || 0}
                                            </p>
                                            <p className="text-xs text-gray-500 mb-2">Target: {goal.targets?.steps?.toLocaleString() || 0}</p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill bg-blue-500"
                                                    style={{ width: `${calculateProgress(goal.steps, goal.targets?.steps)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span>⚡</span>
                                                <p className="text-xs font-medium text-gray-600">Active Time</p>
                                            </div>
                                            <p className="font-bold text-gray-800 text-lg">{goal.activeTime || 0} min</p>
                                            <p className="text-xs text-gray-500 mb-2">Target: {goal.targets?.activeTime || 0} min</p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill bg-green-500"
                                                    style={{ width: `${calculateProgress(goal.activeTime, goal.targets?.activeTime)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span>😴</span>
                                                <p className="text-xs font-medium text-gray-600">Sleep</p>
                                            </div>
                                            <p className="font-bold text-gray-800 text-lg">{goal.sleep || 0} hrs</p>
                                            <p className="text-xs text-gray-500 mb-2">Target: {goal.targets?.sleep || 0} hrs</p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill bg-purple-500"
                                                    style={{ width: `${calculateProgress(goal.sleep, goal.targets?.sleep)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-white p-3 rounded-lg shadow-sm">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span>💧</span>
                                                <p className="text-xs font-medium text-gray-600">Water Intake</p>
                                            </div>
                                            <p className="font-bold text-gray-800 text-lg">{goal.waterIntake || 0} ml</p>
                                            <p className="text-xs text-gray-500 mb-2">Target: {goal.targets?.waterIntake || 0} ml</p>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill bg-cyan-500"
                                                    style={{ width: `${calculateProgress(goal.waterIntake, goal.targets?.waterIntake)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">📊</div>
                        <p className="text-gray-600">No wellness goal data available</p>
                        <p className="text-sm text-gray-500 mt-1">Patient hasn't logged any health goals yet</p>
                    </div>
                )}
            </div>

            {/* Care Reminders & Checkups */}
            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="card-header flex items-center gap-2">
                        <span>🔔</span> Care Reminders & Checkups
                    </h3>
                    {reminders && reminders.length > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-green-600">
                                {reminders.filter(r => r.completed).length} completed
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-orange-600">
                                {reminders.filter(r => !r.completed).length} pending
                            </span>
                        </div>
                    )}
                </div>
                {reminders && reminders.length > 0 ? (
                    <div className="space-y-3">
                        {reminders.map((reminder) => {
                            const isOverdue = new Date(reminder.dueDate) < new Date() && !reminder.completed;
                            const getTypeIcon = (type) => {
                                const icons = {
                                    'checkup': '🩺',
                                    'bloodtest': '🩸',
                                    'vaccination': '💉',
                                    'medication': '💊',
                                    'other': '📋'
                                };
                                return icons[type] || '📋';
                            };
                            
                            return (
                                <div
                                    key={reminder._id}
                                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                                        reminder.completed
                                            ? 'border-green-200 bg-green-50'
                                            : isOverdue
                                            ? 'border-red-200 bg-red-50'
                                            : 'border-blue-200 bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg">{getTypeIcon(reminder.type)}</span>
                                                <h4 className="font-semibold text-gray-800">{reminder.title}</h4>
                                            </div>
                                            {reminder.description && (
                                                <p className="text-sm text-gray-600 mt-1 mb-3">{reminder.description}</p>
                                            )}
                                            <div className="flex items-center flex-wrap gap-3 text-xs">
                                                <span className={`px-2 py-1 rounded-full ${
                                                    reminder.type === 'checkup' ? 'bg-blue-100 text-blue-700' :
                                                    reminder.type === 'bloodtest' ? 'bg-red-100 text-red-700' :
                                                    reminder.type === 'vaccination' ? 'bg-green-100 text-green-700' :
                                                    reminder.type === 'medication' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {reminder.type.charAt(0).toUpperCase() + reminder.type.slice(1)}
                                                </span>
                                                <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                                                    Due: {formatDate(reminder.dueDate)}
                                                    {isOverdue && ' (Overdue)'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            {reminder.completed ? (
                                                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    ✅ Completed
                                                </span>
                                            ) : isOverdue ? (
                                                <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                                                    ⚠️ Overdue
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    ⏳ Pending
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-4">📅</div>
                        <p className="text-gray-600">No care reminders set</p>
                        <p className="text-sm text-gray-500 mt-1">Use the "Add Reminder" button to create preventive care reminders</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;
