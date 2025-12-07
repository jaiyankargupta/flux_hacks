import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Home = () => {
    const { isAuthenticated, user } = useAuth();

    const healthInfo = [
        {
            title: 'COVID-19 Updatess',
            description: 'Stay informed about the latest COVID-19 guidelines and vaccination information.',
            icon: '🦠',
            color: 'from-red-500 to-pink-500',
        },
        {
            title: 'Seasonal Flu Prevention',
            description: 'Learn how to protect yourself and others during flu season with preventive measures.',
            icon: '🤧',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Mental Health Awareness',
            description: 'Prioritize your mental well-being with resources and support for mental health.',
            icon: '🧠',
            color: 'from-purple-500 to-indigo-500',
        },
        {
            title: 'Nutrition & Wellness',
            description: 'Discover tips for maintaining a balanced diet and healthy lifestyle.',
            icon: '🥗',
            color: 'from-green-500 to-emerald-500',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center animate-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Your Health,{' '}
                        <span className="text-gradient">Our Priority</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Comprehensive wellness tracking and preventive care management for a healthier tomorrow.
                        Track your goals, stay on top of checkups, and achieve optimal health.
                    </p>

                    {!isAuthenticated ? (
                        <div className="flex justify-center space-x-4">
                            <Link to="/register" className="btn btn-primary px-8 py-4 text-lg">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-secondary px-8 py-4 text-lg">
                                Sign In
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to={user?.role === 'patient' ? '/patient/dashboard' : '/provider/dashboard'}
                            className="btn btn-primary px-8 py-4 text-lg inline-block"
                        >
                            Go to Dashboard
                        </Link>
                    )}
                </div>

                {/* Features Section */}
                <div className="mt-24 grid md:grid-cols-3 gap-8">
                    <div className="card text-center group hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Track Wellness Goals</h3>
                        <p className="text-gray-600">
                            Monitor daily activities, sleep, nutrition, and exercise to achieve your health objectives.
                        </p>
                    </div>

                    <div className="card text-center group hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">🔔</div>
                        <h3 className="text-xl font-semibold mb-2">Preventive Care Reminders</h3>
                        <p className="text-gray-600">
                            Never miss important checkups, vaccinations, or health screenings with smart reminders.
                        </p>
                    </div>

                    <div className="card text-center group hover:scale-105 transition-transform">
                        <div className="text-5xl mb-4">👨‍⚕️</div>
                        <h3 className="text-xl font-semibold mb-2">Provider Collaboration</h3>
                        <p className="text-gray-600">
                            Healthcare providers can monitor patient progress and ensure compliance with care plans.
                        </p>
                    </div>
                </div>

                {/* Health Information Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center mb-12">Latest Health Information</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {healthInfo.map((info, index) => (
                            <div
                                key={index}
                                className="card group hover:scale-105 transition-transform cursor-pointer"
                            >
                                <div className={`text-5xl mb-4 bg-gradient-to-r ${info.color} w-16 h-16 rounded-xl flex items-center justify-center`}>
                                    <span>{info.icon}</span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                                    {info.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{info.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 card bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Health?</h2>
                    <p className="text-lg mb-8 opacity-90">
                        Join thousands of users who are achieving their wellness goals with our platform.
                    </p>
                    {!isAuthenticated && (
                        <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg inline-block">
                            Start Your Journey
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
