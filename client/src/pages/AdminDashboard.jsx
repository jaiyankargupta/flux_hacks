import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api.js';
import ProviderList from '../components/Admin/ProviderList.jsx';
import AddProviderModal from '../components/Admin/AddProviderModal.jsx';
import EditProviderModal from '../components/Admin/EditProviderModal.jsx';
import Loading from '../components/Common/Loading.jsx';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsRes, providersRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getAllProviders(),
            ]);
            setStats(statsRes.data.data);
            setProviders(providersRes.data.data);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleProviderAdded = () => {
        setShowAddModal(false);
        fetchDashboardData();
    };

    const handleProviderUpdated = () => {
        setEditingProvider(null);
        fetchDashboardData();
    };

    const handleDeleteProvider = async (providerId) => {
        if (!window.confirm('Are you sure you want to delete this provider? All assigned patients will be unassigned.')) {
            return;
        }

        try {
            await adminAPI.deleteProvider(providerId);
            fetchDashboardData();
        } catch (err) {
            alert('Failed to delete provider: ' + (err.response?.data?.message || err.message));
        }
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
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-2">Manage healthcare providers and monitor system statistics</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm">Total Patients</p>
                                <p className="text-3xl font-bold mt-1">{stats?.totalPatients || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">👥</div>
                        </div>
                        <p className="text-blue-100 text-xs mt-2">
                            +{stats?.recentPatients || 0} in last 7 days
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm">Total Providers</p>
                                <p className="text-3xl font-bold mt-1">{stats?.totalProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">👨‍⚕️</div>
                        </div>
                        <p className="text-green-100 text-xs mt-2">
                            +{stats?.recentProviders || 0} in last 7 days
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm">Assigned Patients</p>
                                <p className="text-3xl font-bold mt-1">{stats?.patientsWithProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">✅</div>
                        </div>
                        <p className="text-purple-100 text-xs mt-2">
                            {stats?.totalPatients > 0
                                ? Math.round((stats.patientsWithProviders / stats.totalPatients) * 100)
                                : 0}% of total
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm">Unassigned Patients</p>
                                <p className="text-3xl font-bold mt-1">{stats?.patientsWithoutProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-50">⚠️</div>
                        </div>
                        <p className="text-orange-100 text-xs mt-2">
                            Need provider assignment
                        </p>
                    </div>
                </div>

                {/* Provider Management Section */}
                <div className="card">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Healthcare Providers</h2>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="btn btn-primary"
                        >
                            + Add Provider
                        </button>
                    </div>

                    <ProviderList
                        providers={providers}
                        onEdit={setEditingProvider}
                        onDelete={handleDeleteProvider}
                    />
                </div>
            </div>

            {/* Modals */}
            {showAddModal && (
                <AddProviderModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleProviderAdded}
                />
            )}

            {editingProvider && (
                <EditProviderModal
                    provider={editingProvider}
                    onClose={() => setEditingProvider(null)}
                    onSuccess={handleProviderUpdated}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
