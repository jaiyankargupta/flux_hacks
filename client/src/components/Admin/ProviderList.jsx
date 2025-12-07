const ProviderList = ({ providers, onEdit, onDelete }) => {
    if (!providers || providers.length === 0) {
        return (
            <div className="provider-list-empty">
                <div className="provider-list-empty-icon">👨‍⚕️</div>
                <h3 className="provider-list-empty-title">No Providers Yet</h3>
                <p className="provider-list-empty-subtitle">Add your first healthcare provider to get started</p>
            </div>
        );
    }

    return (
        <div className="provider-table-container">
            <table className="provider-table">
                <thead>
                    <tr>
                        <th style={{width: '25%'}}>
                            Provider
                        </th>
                        <th style={{width: '16.67%'}}>
                            Specialization
                        </th>
                        <th style={{width: '16.67%'}}>
                            License
                        </th>
                        <th style={{width: '16.67%'}}>
                            Status
                        </th>
                        <th style={{width: '16.67%'}}>
                            Joined
                        </th>
                        <th style={{width: '6rem', textAlign: 'right'}}>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map((provider) => (
                        <tr key={provider._id} className="provider-table-row">
                            <td>
                                <div className="provider-info">
                                    <div className="provider-avatar-container">
                                        <div className="provider-avatar">
                                            {provider.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="provider-status-dot"></div>
                                    </div>
                                    <div className="provider-details">
                                        <h4>{provider.name}</h4>
                                        <div className="email">{provider.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="specialization-badge">
                                    {provider.providerInfo?.specialization || 'General'}
                                </span>
                            </td>
                            <td>
                                <div className="license-number">
                                    {provider.providerInfo?.licenseNumber || 'N/A'}
                                </div>
                            </td>
                            <td>
                                <span className={`status-badge ${(provider.assignedPatients?.length || 0) > 0 ? 'active' : 'inactive'}`}>
                                    <span className={`status-dot ${(provider.assignedPatients?.length || 0) > 0 ? 'active' : 'inactive'}`}></span>
                                    {provider.assignedPatients?.length || 0} Patients
                                </span>
                            </td>
                            <td>
                                <span className="join-date">
                                    {new Date(provider.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </td>
                            <td style={{textAlign: 'right'}}>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => onEdit(provider)}
                                        className="action-button edit"
                                        title="Edit Provider"
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(provider._id)}
                                        className="action-button delete"
                                        title="Delete Provider"
                                    >
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
