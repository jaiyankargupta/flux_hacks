import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';

const PatientProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [activeTab, setActiveTab] = useState('basic');

    const [basicInfo, setBasicInfo] = useState({
        age: '',
        gender: '',
        height: '',
        weight: '',
        bloodGroup: '',
        contactNumber: '',
    });

    const [healthInfo, setHealthInfo] = useState({
        allergies: '',
        medications: '',
        conditions: '',
        emergencyContact: '',
    });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5001/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response.data.data;
            if (userData.basicInfo) {
                setBasicInfo(userData.basicInfo);
            }
            if (userData.healthInfo) {
                setHealthInfo(userData.healthInfo);
            }
        } catch (err) {
            setError('Failed to load profile');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleBasicInfoChange = (e) => {
        setBasicInfo({
            ...basicInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleHealthInfoChange = (e) => {
        setHealthInfo({
            ...healthInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                'http://localhost:5001/api/auth/profile',
                {
                    basicInfo,
                    healthInfo,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 animate-in">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your personal and health information</p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="bg-danger-50 border border-danger-200 text-danger-700 px-4 py-3 rounded-lg mb-6 animate-in">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 animate-in">
                        {success}
                    </div>
                )}

                {/* Profile Card */}
                <div className="card animate-in">
                    {/* User Info Header */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                            <p className="text-gray-600">{user?.email}</p>
                            <span className="inline-block mt-1 px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                                Patient
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-4 mb-6 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'basic'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Basic Information
                        </button>
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'health'
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Health Information
                        </button>
                    </div>

                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="input"
                                        placeholder="25"
                                        value={basicInfo.age}
                                        onChange={handleBasicInfoChange}
                                        min="1"
                                        max="120"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        className="input"
                                        value={basicInfo.gender}
                                        onChange={handleBasicInfoChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        className="input"
                                        placeholder="170"
                                        value={basicInfo.height}
                                        onChange={handleBasicInfoChange}
                                        min="50"
                                        max="300"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        className="input"
                                        placeholder="70"
                                        value={basicInfo.weight}
                                        onChange={handleBasicInfoChange}
                                        min="20"
                                        max="500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blood Group
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        className="input"
                                        value={basicInfo.bloodGroup}
                                        onChange={handleBasicInfoChange}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        className="input"
                                        placeholder="+91 9876543210"
                                        value={basicInfo.contactNumber}
                                        onChange={handleBasicInfoChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Health Information Tab */}
                    {activeTab === 'health' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Allergies
                                </label>
                                <textarea
                                    name="allergies"
                                    className="input min-h-[100px]"
                                    placeholder="List any allergies (e.g., peanuts, penicillin, latex)"
                                    value={healthInfo.allergies}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Medications
                                </label>
                                <textarea
                                    name="medications"
                                    className="input min-h-[100px]"
                                    placeholder="List current medications with dosage"
                                    value={healthInfo.medications}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Medical Conditions
                                </label>
                                <textarea
                                    name="conditions"
                                    className="input min-h-[100px]"
                                    placeholder="List any chronic conditions or past medical history"
                                    value={healthInfo.conditions}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Emergency Contact
                                </label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    className="input"
                                    placeholder="Name and phone number"
                                    value={healthInfo.emergencyContact}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn btn-primary w-full md:w-auto px-8 py-3"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;
