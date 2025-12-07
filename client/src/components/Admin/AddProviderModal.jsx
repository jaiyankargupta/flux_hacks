import { useState } from 'react';
import { adminAPI } from '../../services/api.js';

const AddProviderModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        licenseNumber: '',
        qualification: '',
        yearsOfExperience: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const providerData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                providerInfo: {
                    specialization: formData.specialization,
                    licenseNumber: formData.licenseNumber,
                    qualification: formData.qualification,
                    yearsOfExperience: formData.yearsOfExperience ? parseInt(formData.yearsOfExperience) : undefined,
                    contactInfo: {
                        phone: formData.phone,
                    },
                },
            };

            await adminAPI.createProvider(providerData);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create provider');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Add New Provider</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {error && (
                        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="input"
                                    placeholder="Dr. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="input"
                                    placeholder="doctor@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password *
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="input"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className="input"
                                    placeholder="+1 234 567 8900"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                                    Specialization *
                                </label>
                                <input
                                    id="specialization"
                                    name="specialization"
                                    type="text"
                                    required
                                    className="input"
                                    placeholder="Cardiology"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    License Number *
                                </label>
                                <input
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    type="text"
                                    required
                                    className="input"
                                    placeholder="MED123456"
                                    value={formData.licenseNumber}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
                                    Qualification
                                </label>
                                <input
                                    id="qualification"
                                    name="qualification"
                                    type="text"
                                    className="input"
                                    placeholder="MBBS, MD"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                                    Years of Experience
                                </label>
                                <input
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    type="number"
                                    min="0"
                                    className="input"
                                    placeholder="10"
                                    value={formData.yearsOfExperience}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-primary"
                            >
                                {loading ? 'Creating...' : 'Create Provider'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProviderModal;
