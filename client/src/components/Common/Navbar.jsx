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
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <Link to="/" className="nav-logo group">
                    <div className="nav-logo-icon">
                        <span>H+</span>
                    </div>
                    <span className="nav-logo-text">
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
                                {user?.role === 'patient' && (
                                    <Link
                                        to="/patient/profile"
                                        className="nav-link font-medium"
                                    >
                                        Profile
                                    </Link>
                                )}
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
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
