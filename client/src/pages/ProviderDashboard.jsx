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

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await providerAPI.getPatients();
            setPatients(response.data.data);
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 animate-in">
                    <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
                    <p className="text-gray-600 mt-2">Monitor patient compliance and health progress</p>
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
                            <div className="card text-center py-16">
                                <div className="text-6xl mb-4">👈</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    Select a Patient
                                </h3>
                                <p className="text-gray-600">
                                    Choose a patient from the list to view their details and compliance status
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
