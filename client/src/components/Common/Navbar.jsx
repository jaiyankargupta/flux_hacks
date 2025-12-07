import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}{/* Updated Logo Section */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">H+</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors">
                            Healthcare Portal
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-8">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to={
                                        user?.role === 'patient'
                                            ? '/patient/dashboard'
                                            : user?.role === 'provider'
                                                ? '/provider/dashboard'
                                                : '/admin/dashboard'
                                    }
                                    className="nav-link font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="nav-link font-medium"
                                >
                                    Profile
                                </Link>
                                <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                                    <div className="text-right hidden md:block">
                                        <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                                        <p className="text-xs text-blue-600 font-medium capitalize bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                                            {user?.role}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-secondary text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="nav-link font-medium">
                                    Home
                                </Link>
                                <Link to="/login" className="font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
