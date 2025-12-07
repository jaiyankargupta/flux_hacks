import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading providers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="card animate-in">
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary-600">Step 2 of 2</span>
                            <span className="text-sm text-gray-500">Provider Selection</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Healthcare Provider</h2>
                        <p className="text-gray-600">Select a provider to manage your health journey</p>
                    </div>

                    {error && (
                        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    {providers.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">👨‍⚕️</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Providers Available</h3>
                            <p className="text-gray-600 mb-6">There are currently no healthcare providers registered.</p>
                            <button
                                onClick={handleSkip}
                                className="btn btn-primary"
                            >
                                Continue to Dashboard
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {providers.map((provider) => (
                                    <div
                                        key={provider._id}
                                        className={`card border-2 transition-all cursor-pointer hover:shadow-lg ${selectedProvider === provider._id
                                            ? 'border-primary-600 bg-primary-50'
                                            : 'border-gray-200 hover:border-primary-300'
                                            }`}
                                        onClick={() => !assigning && handleSelectProvider(provider._id)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {provider.name.charAt(0)}
                                            </div>
                                            {selectedProvider === provider._id && (
                                                <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{provider.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{provider.email}</p>

                                        {provider.providerInfo?.specialization && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                                    {provider.providerInfo.specialization}
                                                </span>
                                            </div>
                                        )}

                                        {provider.providerInfo?.location?.address?.city && (
                                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <div className="text-center py-4">
                                    <div className="inline-flex items-center gap-2 text-primary-600">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                                        <span className="font-medium">Assigning provider and redirecting...</span>
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
