const ProviderList = ({ providers, onEdit, onDelete }) => {
    if (!providers || providers.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Providers Yet</h3>
                <p className="text-gray-600">Add your first healthcare provider to get started</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap text-left">
                <thead>
                    <tr className="bg-gray-50/50 text-left border-b border-gray-100">
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-1/4">
                            Provider
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-1/6">
                            Specialization
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-1/6">
                            License
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-1/6">
                            Status
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider w-1/6">
                            Joined
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-xs uppercase tracking-wider text-right w-24">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {providers.map((provider) => (
                        <tr key={provider._id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-shrink-0 w-12 h-12">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                            {provider.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{provider.name}</div>
                                        <div className="text-xs text-blue-500 font-medium">{provider.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex py-1 px-3 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 uppercase tracking-wide">
                                    {provider.providerInfo?.specialization || 'General'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm font-mono text-gray-600">
                                    {provider.providerInfo?.licenseNumber || 'N/A'}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${(provider.assignedPatients?.length || 0) > 0
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${(provider.assignedPatients?.length || 0) > 0 ? 'bg-emerald-500' : 'bg-amber-500'
                                        }`}></span>
                                    {provider.assignedPatients?.length || 0} Patients
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-500">
                                    {new Date(provider.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(provider)}
                                        className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl transition-all shadow-sm hover:shadow-md"
                                        title="Edit Provider"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(provider._id)}
                                        className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all shadow-sm hover:shadow-md"
                                        title="Delete Provider"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProviderList;
