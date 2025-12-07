const PatientList = ({ patients, onPatientSelect, selectedPatientId }) => {
    const getComplianceColor = (status) => {
        if (status === 'Goal Met') return 'badge-success';
        if (status === 'Missed Preventive Checkup') return 'badge-danger';
        return 'badge-warning';
    };

    return (
        <div className="card animate-in sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <h2 className="card-header">Patients ({patients.length})</h2>

            {patients.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-600">No patients assigned</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {patients.map((patient) => (
                        <button
                            key={patient._id}
                            onClick={() => onPatientSelect(patient._id)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedPatientId === patient._id
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                                    <p className="text-sm text-gray-500">{patient.email}</p>
                                    <div className="mt-2">
                                        <span className={`badge ${getComplianceColor(patient.complianceStatus)} text-xs`}>
                                            {patient.complianceStatus}
                                        </span>
                                    </div>
                                </div>
                                {patient.pendingReminders > 0 && (
                                    <div className="ml-2">
                                        <span className="inline-flex items-center justify-center w-6 h-6 bg-danger-500 text-white text-xs font-bold rounded-full">
                                            {patient.pendingReminders}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientList;
