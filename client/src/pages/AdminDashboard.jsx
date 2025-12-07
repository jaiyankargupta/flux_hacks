import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api.js';
import ProviderList from '../components/Admin/ProviderList.jsx';
import AddProviderModal from '../components/Admin/AddProviderModal.jsx';
import EditProviderModal from '../components/Admin/EditProviderModal.jsx';
import Loading from '../components/Common/Loading.jsx';
import '../styles/AdminDashboard.css';

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
            <div className="error-container">
                <div className="error-alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-wrapper">
                {/* Header */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Admin Dashboard</h1>
                    <p className="dashboard-subtitle">Manage healthcare providers and monitor system statistics</p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card patients">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Total Patients</h3>
                                <p className="value">{stats?.totalPatients || 0}</p>
                            </div>
                            <div className="stat-icon">👥</div>
                        </div>
                        <p className="stat-footer">
                            +{stats?.recentPatients || 0} in last 7 days
                        </p>
                    </div>

                    <div className="stat-card providers">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Total Providers</h3>
                                <p className="value">{stats?.totalProviders || 0}</p>
                            </div>
                            <div className="stat-icon">👨‍⚕️</div>
                        </div>
                        <p className="stat-footer">
                            +{stats?.recentProviders || 0} in last 7 days
                        </p>
                    </div>

                    <div className="stat-card assigned">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Assigned Patients</h3>
                                <p className="value">{stats?.patientsWithProviders || 0}</p>
                            </div>
                            <div className="stat-icon">✅</div>
                        </div>
                        <p className="stat-footer">
                            {stats?.totalPatients > 0
                                ? Math.round((stats.patientsWithProviders / stats.totalPatients) * 100)
                                : 0}% of total
                        </p>
                    </div>

                    <div className="stat-card unassigned">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Unassigned Patients</h3>
                                <p className="value">{stats?.patientsWithoutProviders || 0}</p>
                            </div>
                            <div className="stat-icon">⚠️</div>
                        </div>
                        <p className="stat-footer">
                            Need provider assignment
                        </p>
                    </div>
                </div>

                {/* Provider Management Section */}
                <div className="provider-management-card">
                    <div className="provider-management-header">
                        <div>
                            <h2 className="provider-management-title">Healthcare Providers</h2>
                            <p className="provider-management-subtitle">Manage and monitor provider performance</p>
                        </div>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="add-provider-button"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Add Provider</span>
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
