import { useState } from 'react';
import { adminAPI } from '../../services/api.js';

const EditProviderModal = ({ provider, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: provider.name || '',
        email: provider.email || '',
        specialization: provider.providerInfo?.specialization || '',
        licenseNumber: provider.providerInfo?.licenseNumber || '',
        qualification: provider.providerInfo?.qualification || '',
        yearsOfExperience: provider.providerInfo?.yearsOfExperience || '',
        phone: provider.providerInfo?.contactInfo?.phone || '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [newPassword, setNewPassword] = useState('');

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
            const updateData = {
                name: formData.name,
                email: formData.email,
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

            await adminAPI.updateProvider(provider._id, updateData);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update provider');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!newPassword || newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await adminAPI.resetProviderPassword(provider._id, newPassword);
            alert('Password reset successfully');
            setShowPasswordReset(false);
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Provider</h2>
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
                                    value={formData.email}
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
                                    value={formData.yearsOfExperience}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <button
                                type="button"
                                onClick={() => setShowPasswordReset(!showPasswordReset)}
                                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                                {showPasswordReset ? 'Cancel Password Reset' : 'Reset Password'}
                            </button>

                            {showPasswordReset && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            id="newPassword"
                                            type="password"
                                            minLength={6}
                                            className="input flex-1"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handlePasswordReset}
                                            disabled={loading}
                                            className="btn btn-secondary"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            )}
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
                                {loading ? 'Updating...' : 'Update Provider'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProviderModal;
