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
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Patients</p>
                                <p className="text-3xl font-bold mt-1 text-white">{stats?.totalPatients || 0}</p>
                            </div>
                            <div className="text-5xl opacity-80 backdrop-blur-sm rounded-full bg-white/20 p-2">👥</div>
                        </div>
                        <p className="text-blue-100 text-xs mt-3 flex items-center font-medium px-2 py-1 bg-white/20 rounded-lg w-fit">
                            +{stats?.recentPatients || 0} in last 7 days
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Providers</p>
                                <p className="text-3xl font-bold mt-1 text-white">{stats?.totalProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-80 backdrop-blur-sm rounded-full bg-white/20 p-2">👨‍⚕️</div>
                        </div>
                        <p className="text-green-100 text-xs mt-3 flex items-center font-medium px-2 py-1 bg-white/20 rounded-lg w-fit">
                            +{stats?.recentProviders || 0} in last 7 days
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Assigned Patients</p>
                                <p className="text-3xl font-bold mt-1 text-white">{stats?.patientsWithProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-80 backdrop-blur-sm rounded-full bg-white/20 p-2">✅</div>
                        </div>
                        <p className="text-purple-100 text-xs mt-3 flex items-center font-medium px-2 py-1 bg-white/20 rounded-lg w-fit">
                            {stats?.totalPatients > 0
                                ? Math.round((stats.patientsWithProviders / stats.totalPatients) * 100)
                                : 0}% of total
                        </p>
                    </div>

                    <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-red-100 text-sm font-medium">Unassigned Patients</p>
                                <p className="text-3xl font-bold mt-1 text-white">{stats?.patientsWithoutProviders || 0}</p>
                            </div>
                            <div className="text-5xl opacity-80 backdrop-blur-sm rounded-full bg-white/20 p-2">⚠️</div>
                        </div>
                        <p className="text-red-50 text-xs mt-3 flex items-center font-medium px-2 py-1 bg-white/20 rounded-lg w-fit">
                            Need provider assignment
                        </p>
                    </div>
                </div>

                {/* Provider Management Section */}
                <div className="card overflow-hidden border border-gray-100 shadow-xl">
                    <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Healthcare Providers</h2>
                            <p className="text-sm text-gray-500 mt-1">Manage and monitor provider performance</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 whitespace-nowrap min-w-fit font-medium text-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="font-medium">Add Provider</span>
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
