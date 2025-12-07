import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProviderSelection.css';

const ProviderSelection = () => {
    const navigate = useNavigate();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [assigning, setAssigning] = useState(false);

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                'http://localhost:5001/api/patient/providers',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProviders(response.data.data);
        } catch (err) {
            setError('Failed to load providers');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectProvider = async (providerId) => {
        // Prevent double-click
        if (assigning) return;

        setSelectedProvider(providerId);
        setAssigning(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:5001/api/patient/provider/${providerId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Redirect to dashboard immediately
            navigate('/patient/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to assign provider');
            setAssigning(false);
        }
    };



    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading providers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="provider-selection-container">
            <div className="provider-selection-wrapper">
                <div className="provider-selection-card">
                    {/* Progress Indicator */}
                    <div className="progress-section">
                        <div className="progress-header">
                            <span className="progress-step">Step 2 of 2</span>
                            <span className="progress-label">Provider Selection</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill"></div>
                        </div>
                    </div>

                    <div className="header-section">
                        <h2 className="main-title">Choose Your Healthcare Provider</h2>
                        <p className="subtitle">Select a provider to manage your health journey</p>
                    </div>

                    {error && (
                        <div className="error-alert">
                            {error}
                        </div>
                    )}

                    {providers.length === 0 ? (
                        <div className="no-providers">
                            <div className="no-providers-icon">👨‍⚕️</div>
                            <h3 className="no-providers-title">No Providers Available</h3>
                            <p className="no-providers-text">There are currently no healthcare providers registered.</p>
                            <button
                                onClick={handleSkip}
                                className="btn btn-primary"
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="providers-grid">
                                {providers.map((provider) => (
                                    <div
                                        key={provider._id}
                                        className={`provider-card ${selectedProvider === provider._id ? 'selected' : ''}`}
                                        onClick={() => !assigning && handleSelectProvider(provider._id)}
                                    >
                                        <div className="provider-card-header">
                                            <div className="provider-avatar">
                                                {provider.name.charAt(0)}
                                            </div>
                                            {selectedProvider === provider._id && (
                                                <div className="selected-icon">
                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="provider-name">{provider.name}</h3>
                                        <p className="provider-email">{provider.email}</p>

                                        {provider.providerInfo?.specialization && (
                                            <div className="specialization-tag">
                                                <span className="specialization-badge">
                                                    {provider.providerInfo.specialization}
                                                </span>
                                            </div>
                                        )}

                                        {provider.providerInfo?.location?.address?.city && (
                                            <div className="location-info">
                                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>
                                                    {provider.providerInfo.location.address.city}
                                                    {provider.providerInfo.location.address.state && `, ${provider.providerInfo.location.address.state}`}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {assigning && (
                                <div className="assigning-container">
                                    <div className="assigning-content">
                                        <div className="assigning-spinner"></div>
                                        <span>Assigning provider and redirecting...</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderSelection;
