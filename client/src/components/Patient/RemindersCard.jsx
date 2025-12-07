import { patientAPI } from '../../services/api.js';

const RemindersCard = ({ reminders, onUpdate }) => {
    const handleComplete = async (id) => {
        try {
            await patientAPI.completeReminder(id);
            onUpdate();
        } catch (error) {
            console.error('Error completing reminder:', error);
        }
    };

    const getTypeIcon = (type) => {
        const icons = {
            checkup: '🏥',
            bloodtest: '💉',
            vaccination: '💊',
            medication: '💊',
            other: '📋',
        };
        return icons[type] || '📋';
    };

    const getTypeColor = (type) => {
        const colors = {
            checkup: 'from-blue-500 to-cyan-500',
            bloodtest: 'from-red-500 to-pink-500',
            vaccination: 'from-green-500 to-emerald-500',
            medication: 'from-purple-500 to-indigo-500',
            other: 'from-gray-500 to-gray-600',
        };
        return colors[type] || 'from-gray-500 to-gray-600';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const isOverdue = (dateString) => {
        return new Date(dateString) < new Date();
    };

    return (
        <div className="card animate-in">
            <h2 className="card-header">Preventive Care Reminders</h2>

            {!reminders || reminders.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-gray-600">No upcoming reminders</p>
                    <p className="text-sm text-gray-500 mt-2">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {reminders.map((reminder) => (
                        <div
                            key={reminder._id}
                            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                    <div className={`w-10 h-10 bg-gradient-to-r ${getTypeColor(reminder.type)} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
                                        {getTypeIcon(reminder.type)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{reminder.title}</h3>
                                        {reminder.description && (
                                            <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                                        )}
                                        <div className="flex items-center mt-2 space-x-4">
                                            <span className={`text-xs font-medium ${isOverdue(reminder.dueDate) ? 'text-danger-600' : 'text-gray-500'}`}>
                                                📅 {formatDate(reminder.dueDate)}
                                            </span>
                                            {isOverdue(reminder.dueDate) && (
                                                <span className="badge badge-danger text-xs">Overdue</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleComplete(reminder._id)}
                                    className="btn btn-success text-xs ml-2 flex-shrink-0"
                                >
                                    Complete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RemindersCard;
