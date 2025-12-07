import { useState, useEffect } from 'react';
import { providerAPI } from '../services/api.js';
import PatientList from '../components/Provider/PatientList.jsx';
import PatientDetails from '../components/Provider/PatientDetails.jsx';
import Loading from '../components/Common/Loading.jsx';

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
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Enhanced Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-700 bg-clip-text text-transparent">
                                Provider Dashboard
                            </h1>
                            <p className="text-gray-600 mt-2 text-lg">Monitor patient compliance and health progress</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-emerald-200/50">
                                <span className="text-sm text-gray-600">Total Patients:</span>
                                <span className="ml-2 font-bold text-emerald-700">{stats.total}</span>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">🩺</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-200/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Total Patients</p>
                                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-emerald-50/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-200/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Compliant</p>
                                <p className="text-2xl font-bold text-emerald-700">{stats.compliant}</p>
                                <p className="text-xs text-emerald-600 font-medium">{stats.total > 0 ? Math.round((stats.compliant / stats.total) * 100) : 0}% of total</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">✅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-amber-50/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-amber-200/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">Pending Checkups</p>
                                <p className="text-2xl font-bold text-amber-700">{stats.pendingCheckups}</p>
                                <p className="text-xs text-amber-600 font-medium">{stats.total > 0 ? Math.round((stats.pendingCheckups / stats.total) * 100) : 0}% of total</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600">No Data</p>
                                <p className="text-2xl font-bold text-slate-700">{stats.noData}</p>
                                <p className="text-xs text-slate-500 font-medium">{stats.total > 0 ? Math.round((stats.noData / stats.total) * 100) : 0}% of total</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-gray-600 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white text-xl">📊</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Patient List */}
                    <div className="lg:col-span-1">
                        <PatientList
                            patients={patients}
                            onPatientSelect={handlePatientSelect}
                            selectedPatientId={selectedPatient?.patient?._id}
                        />
                    </div>

                    {/* Patient Details */}
                    <div className="lg:col-span-2">
                        {selectedPatient ? (
                            <PatientDetails
                                patientData={selectedPatient}
                                onReminderCreated={handleReminderCreated}
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-xl shadow-lg border border-teal-200/30 p-12 text-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span className="text-white text-4xl">🩺</span>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                    Select a Patient
                                </h3>
                                <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                                    Choose a patient from the list to view their comprehensive health details, wellness goals, and compliance status
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <div className="animate-bounce">
                                        <span className="text-2xl">👈</span>
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
