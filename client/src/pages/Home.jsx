import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useState, useEffect } from 'react';
import img from '../assets/herosection.png';

const Home = () => {
    const { isAuthenticated, user } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen hero-mesh">
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-24 md:py-36">
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
                                        Login
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
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2rem] blur opacity-20"></div>
                            <img
                                src={img}
                                alt="Modern healthcare consultation"
                                className="relative w-full h-auto object-cover rounded-[2rem] shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                            />

                            {/* Floating Card Element */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-float-delayed hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">
                                        ✨
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Patient Satisfaction</p>
                                        <p className="font-bold text-gray-900">98.5%</p>
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
