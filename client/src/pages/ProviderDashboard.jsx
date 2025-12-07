import { useState, useEffect } from 'react';
import { providerAPI } from '../services/api.js';
import PatientList from '../components/Provider/PatientList.jsx';
import PatientDetails from '../components/Provider/PatientDetails.jsx';
import Loading from '../components/Common/Loading.jsx';
import '../styles/ProviderDashboard.css';

const ProviderDashboard = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        compliant: 0,
        pendingCheckups: 0,
        noData: 0
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const calculateStats = (patientsData) => {
        const total = patientsData.length;
        const compliant = patientsData.filter(p => p.complianceStatus === 'Goal Met').length;
        const pendingCheckups = patientsData.filter(p => p.complianceStatus === 'Missed Preventive Checkup').length;
        const noData = patientsData.filter(p => p.complianceStatus === 'No Data').length;
        
        setStats({ total, compliant, pendingCheckups, noData });
    };

    const fetchPatients = async () => {
        try {
            const response = await providerAPI.getPatients();
            const patientsData = response.data.data;
            setPatients(patientsData);
            calculateStats(patientsData);
        } catch (err) {
            setError('Failed to load patients');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePatientSelect = async (patientId) => {
        try {
            const response = await providerAPI.getPatientDetails(patientId);
            setSelectedPatient(response.data.data);
        } catch (err) {
            console.error('Error fetching patient details:', err);
        }
    };

    const handleReminderCreated = () => {
        if (selectedPatient) {
            handlePatientSelect(selectedPatient.patient._id);
        }
        fetchPatients();
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
        <div className="provider-dashboard">
            <div className="dashboard-container">
                {/* Enhanced Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="header-text">
                            <h1>Provider Dashboard</h1>
                            <p>Monitor patient compliance and health progress</p>
                        </div>
                        <div className="header-stats">
                            <div className="total-patients-badge">
                                <span className="label">Total Patients:</span>
                                <span className="count">{stats.total}</span>
                            </div>
                            <div className="header-icon">
                                <span>🩺</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card total">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Total Patients</h3>
                                <div className="value">{stats.total}</div>
                            </div>
                            <div className="stat-icon">
                                <span>👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card compliant">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Compliant</h3>
                                <div className="value">{stats.compliant}</div>
                                <div className="percentage">{stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0}% of total</div>
                            </div>
                            <div className="stat-icon">
                                <span>✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card pending">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>Pending Checkups</h3>
                                <div className="value">{stats.pendingCheckups}</div>
                                <div className="percentage">{stats.total > 0 ? Math.round((stats.pendingCheckups / stats.total) * 100) : 0}% of total</div>
                            </div>
                            <div className="stat-icon">
                                <span>⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card no-data">
                        <div className="stat-content">
                            <div className="stat-info">
                                <h3>No Data</h3>
                                <div className="value">{stats.noData}</div>
                                <div className="percentage">{stats.total > 0 ? Math.round((stats.noData / stats.total) * 100) : 0}% of total</div>
                            </div>
                            <div className="stat-icon">
                                <span>📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="main-grid">
                    {/* Patient List */}
                    <div>
                        <PatientList
                            patients={patients}
                            onPatientSelect={handlePatientSelect}
                            selectedPatientId={selectedPatient?.patient?._id}
                        />
                    </div>

                    {/* Patient Details */}
                    <div>
                        {selectedPatient ? (
                            <PatientDetails
                                patientData={selectedPatient}
                                onReminderCreated={handleReminderCreated}
                            />
                        ) : (
                            <div className="patient-selection-placeholder">
                                <div className="placeholder-icon">
                                    <span>🩺</span>
                                </div>
                                <div className="placeholder-content">
                                    <h3>Select a Patient</h3>
                                    <p>
                                        Choose a patient from the list to view their comprehensive health details, wellness goals, and compliance status
                                    </p>
                                    <div className="bounce-arrow">
                                        <span>👈</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
