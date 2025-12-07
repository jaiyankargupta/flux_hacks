import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import '../styles/PatientProfile.css';

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
            <div className="loading-container">
                <div className="loading-content">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="patient-profile">
            <div className="profile-container">
                {/* Header */}
                <div className="profile-header">
                    <h1 className="profile-title">My Profile</h1>
                    <p className="profile-subtitle">Manage your personal and health information</p>
                </div>

                {/* Alerts */}
                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                {/* Profile Card */}
                <div className="profile-card">
                    {/* User Info Header */}
                    <div className="user-info-header">
                        <div className="user-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <h2>{user?.name}</h2>
                            <p>{user?.email}</p>
                            <span className="user-badge">
                                Patient
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="tabs-container">
                        <button
                            onClick={() => setActiveTab('basic')}
                            className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
                        >
                            Basic Information
                        </button>
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`tab-button ${activeTab === 'health' ? 'active' : ''}`}
                        >
                            Health Information
                        </button>
                    </div>

                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="tab-content">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-input"
                                        placeholder="25"
                                        value={basicInfo.age}
                                        onChange={handleBasicInfoChange}
                                        min="1"
                                        max="120"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        className="form-select"
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

                                <div className="form-group">
                                    <label className="form-label">
                                        Height (cm)
                                    </label>
                                    <input
                                        type="number"
                                        name="height"
                                        className="form-input"
                                        placeholder="170"
                                        value={basicInfo.height}
                                        onChange={handleBasicInfoChange}
                                        min="50"
                                        max="300"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Weight (kg)
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        className="form-input"
                                        placeholder="70"
                                        value={basicInfo.weight}
                                        onChange={handleBasicInfoChange}
                                        min="20"
                                        max="500"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        Blood Group
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        className="form-select"
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

                                <div className="form-group">
                                    <label className="form-label">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        className="form-input"
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
                        <div className="tab-content">
                            <div className="form-group">
                                <label className="form-label">
                                    Allergies
                                </label>
                                <textarea
                                    name="allergies"
                                    className="form-textarea"
                                    placeholder="List any allergies (e.g., peanuts, penicillin, latex)"
                                    value={healthInfo.allergies}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Current Medications
                                </label>
                                <textarea
                                    name="medications"
                                    className="form-textarea"
                                    placeholder="List current medications with dosage"
                                    value={healthInfo.medications}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Medical Conditions
                                </label>
                                <textarea
                                    name="conditions"
                                    className="form-textarea"
                                    placeholder="List any chronic conditions or past medical history"
                                    value={healthInfo.conditions}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    Emergency Contact
                                </label>
                                <input
                                    type="text"
                                    name="emergencyContact"
                                    className="form-input"
                                    placeholder="Name and phone number"
                                    value={healthInfo.emergencyContact}
                                    onChange={handleHealthInfoChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="form-actions">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="save-button"
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
