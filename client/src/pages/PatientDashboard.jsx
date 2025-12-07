import { useState, useEffect } from 'react';
import { patientAPI } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import GoalTracker from '../components/Patient/GoalTracker.jsx';
import RemindersCard from '../components/Patient/RemindersCard.jsx';
import HealthTipCard from '../components/Patient/HealthTipCard.jsx';
import Loading from '../components/Common/Loading.jsx';
import ChatWidget from '../components/Common/ChatWidget.jsx';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [assignedProvider, setAssignedProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboard();
        fetchProvider();
    }, []);

    const fetchDashboard = async () => {
        try {
            const response = await patientAPI.getDashboard();
            setDashboardData(response.data.data);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchProvider = async () => {
        try {
            const response = await patientAPI.getAssignedProvider();
            setAssignedProvider(response.data.data);
        } catch (err) {
            console.error('Failed to fetch assigned provider', err);
        }
    };

    const handleGoalUpdate = () => {
        fetchDashboard();
    };

    if (loading) return <Loading />;

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 animate-in">
                    <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
                    <p className="text-gray-600 mt-2">Track your wellness journey and stay healthy</p>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left Column - Goals */}
                    <div className="lg:col-span-2 space-y-6">
                        <GoalTracker
                            goals={dashboardData?.goals}
                            onUpdate={handleGoalUpdate}
                        />
                    </div>

                    {/* Right Column - Reminders & Tips */}
                    <div className="space-y-6">
                        <HealthTipCard healthTip={dashboardData?.healthTip} />
                        <RemindersCard
                            reminders={dashboardData?.reminders}
                            onUpdate={fetchDashboard}
                        />
                    </div>
                </div>
            </div>
            {assignedProvider && (
                <ChatWidget currentUser={user} targetUser={assignedProvider} />
            )}
        </div>
    );
};

export default PatientDashboard;
