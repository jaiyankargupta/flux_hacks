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
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">H+</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">
                            Healthcare Portal
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
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
                                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/profile"
                                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
                                >
                                    Profile
                                </Link>
                                <div className="flex items-center space-x-3">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-secondary text-sm"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                                    Home
                                </Link>
                                <Link to="/login" className="btn btn-secondary text-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary text-sm">
                                    Register
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
