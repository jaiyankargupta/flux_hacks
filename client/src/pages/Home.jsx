import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';

const Home = () => {
    const { isAuthenticated, user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen hero-mesh">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className={`space-y-8 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
                        <div className="inline-block px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-4">
                            <span className="text-blue-600 font-semibold text-sm">✨ The Future of Healthcare Management</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                            Your Health Journey, <br />
                            <span className="text-gradient-primary">Simplified & Connected</span>.
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                            An intelligent platform bridging the gap between patients and providers. Track goals, manage appointments, and stay healthy with AI-driven insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/register"
                                        className="btn btn-primary px-8 py-4 text-lg font-semibold text-center hover-float"
                                    >
                                        Start Your Journey
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-center"
                                    >
                                        Patient Login
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    to={
                                        user?.role === 'patient'
                                            ? '/patient/dashboard'
                                            : user?.role === 'provider'
                                                ? '/provider/dashboard'
                                                : '/admin/dashboard'
                                    }
                                    className="btn btn-primary px-8 py-4 text-lg font-semibold text-center hover-float shadow-xl shadow-blue-500/20"
                                >
                                    Go to Dashboard →
                                </Link>
                            )}
                        </div>

                        <div className="flex items-center gap-6 pt-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                HIPAA Compliant
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                24/7 Access
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                Smart Tracking
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className={`relative hidden md:block ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
                        <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute -bottom-12 -left-12 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                        <div className="relative glass-card p-8 rounded-3xl transform rotate-minus-2 hover:rotate-0 transition-transform duration-500">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-gray-500 text-sm">Daily Activity</p>
                                    <h3 className="text-2xl font-bold text-gray-800">10,432 Steps</h3>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                                    👣
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-3/4 rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Morning Walk</span>
                                    <span>3.2 km</span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -right-6 top-24 glass p-4 rounded-2xl shadow-lg transform rotate-6 animate-float">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                                        💧
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Hydration</p>
                                        <p className="font-bold text-blue-600">1,250 ml</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -left-6 bottom-12 glass p-4 rounded-2xl shadow-lg transform -rotate-3 animate-float-delayed">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">
                                        ❤️
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Heart Rate</p>
                                        <p className="font-bold text-red-600">72 bpm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white/50 backdrop-blur-sm py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">Why Choose H+</span>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete Health Management</h2>
                        <p className="text-gray-600">Everything you need to manage your health and patients, all in one secure, intuitive platform.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="📊"
                            title="Smart Tracking"
                            description="Monitor daily vital signs, activity levels, and health goals with intuitive visualization."
                            color="blue"
                            delay="0"
                        />
                        <FeatureCard
                            icon="🤝"
                            title="Provider Connection"
                            description="Seamless communication between patients and healthcare providers for better outcomes."
                            color="green"
                            delay="100"
                        />
                        <FeatureCard
                            icon="🔒"
                            title="Secure & Private"
                            description="Enterprise-grade security ensuring your personal health data remains confidential and protected."
                            color="purple"
                            delay="200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color, delay }) => {
    return (
        <div
            className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`w-14 h-14 bg-${color}-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default Home;
