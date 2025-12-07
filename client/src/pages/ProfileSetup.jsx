import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const ProfileSetup = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        bloodGroup: '',
        contactNumber: '',
    });

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
            const token = localStorage.getItem('token');
            await axios.put(
                'http://localhost:5001/api/auth/basic-info',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Redirect to provider selection
            navigate('/select-provider');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        navigate('/select-provider');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full">
                <div className="card animate-in">
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-primary-600">Step 1 of 2</span>
                            <span className="text-sm text-gray-500">Profile Setup</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
                        <p className="text-gray-600">Help us personalize your healthcare experience</p>
                    </div>

                    {error && (
                        <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                                    Age *
                                </label>
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    required
                                    className="input"
                                    placeholder="25"
                                    value={formData.age}
                                    onChange={handleChange}
                                    min="1"
                                    max="120"
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender *
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    className="input"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                                    Height (cm) *
                                </label>
                                <input
                                    id="height"
                                    name="height"
                                    type="number"
                                    required
                                    className="input"
                                    placeholder="170"
                                    value={formData.height}
                                    onChange={handleChange}
                                    min="50"
                                    max="300"
                                />
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                                    Weight (kg) *
                                </label>
                                <input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    required
                                    className="input"
                                    placeholder="70"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    min="20"
                                    max="500"
                                />
                            </div>

                            <div>
                                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                                    Blood Group *
                                </label>
                                <select
                                    id="bloodGroup"
                                    name="bloodGroup"
                                    required
                                    className="input"
                                    value={formData.bloodGroup}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    Contact Number *
                                </label>
                                <input
                                    id="contactNumber"
                                    name="contactNumber"
                                    type="tel"
                                    required
                                    className="input"
                                    placeholder="+91 9876543210"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={handleSkip}
                                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            >
                                Skip for Now
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 btn btn-primary py-3"
                            >
                                {loading ? 'Saving...' : 'Continue →'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
