const PatientList = ({ patients, onPatientSelect, selectedPatientId }) => {
    const getComplianceColor = (status) => {
        if (status === 'Goal Met') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
        if (status === 'Missed Preventive Checkup') return 'bg-rose-100 text-rose-800 border-rose-300';
        return 'bg-amber-100 text-amber-800 border-amber-300';
    };

    const getComplianceIcon = (status) => {
        if (status === 'Goal Met') return '✅';
        if (status === 'Missed Preventive Checkup') return '⚠️';
        return '📊';
    };

    return (
        <div className="bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-xl shadow-lg border border-teal-200/40 sticky top-24 max-h-[calc(100vh-8rem)] overflow-hidden">
            <div className="p-6 border-b border-teal-100/60 bg-gradient-to-r from-teal-50/50 to-emerald-50/30">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">My Patients</h2>
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {patients.length}
                    </div>
                </div>
                <p className="text-sm text-slate-600 mt-1">Click on a patient to view details</p>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-16rem)]">
                {patients.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <span className="text-white text-2xl">👥</span>
                        </div>
                        <p className="text-slate-700 font-medium">No patients assigned</p>
                        <p className="text-sm text-slate-500 mt-1">Patients will appear here when assigned to you</p>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {patients.map((patient) => (
                            <button
                                key={patient._id}
                                onClick={() => onPatientSelect(patient._id)}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-lg group ${
                                    selectedPatientId === patient._id
                                        ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-emerald-50/80 shadow-lg scale-[1.02]'
                                        : 'border-slate-200/60 hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-50/30 hover:to-emerald-50/30 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                                        selectedPatientId === patient._id 
                                            ? 'bg-gradient-to-br from-teal-600 to-emerald-600' 
                                            : 'bg-gradient-to-br from-slate-600 to-slate-700 group-hover:from-teal-600 group-hover:to-emerald-600'
                                    } transition-all duration-200`}>
                                        {patient.name?.charAt(0).toUpperCase()}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-800 truncate group-hover:text-teal-800 transition-colors">
                                                    {patient.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 truncate">{patient.email}</p>
                                            </div>
                                            
                                            {patient.pendingReminders > 0 && (
                                                <div className="ml-2 flex-shrink-0">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-rose-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-sm">
                                                        {patient.pendingReminders}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="mt-3 flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getComplianceColor(patient.complianceStatus)}`}>
                                                <span className="text-xs">{getComplianceIcon(patient.complianceStatus)}</span>
                                                {patient.complianceStatus}
                                            </span>
                                            {selectedPatientId === patient._id && (
                                                <span className="text-xs text-teal-700 font-medium bg-teal-100 px-2 py-0.5 rounded-full">• Active</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientList;
