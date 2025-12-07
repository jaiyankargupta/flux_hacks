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
                <div className="nav-links">
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
                                className="nav-link"
                            >
                                Dashboard
                            </Link>
                            <Link to="/health-info" className="nav-link">
                                Health Info
                            </Link>
                            {user?.role === 'patient' && <Link
                                to="/patient/profile"
                                className="nav-link"
                            >
                                Profile
                            </Link>}

                            <div className="nav-divider"></div>

                            <div className="nav-user">
                                <div className="nav-user-info hidden md:block">
                                    <span className="nav-user-name">{user?.name}</span>
                                    <span className="nav-user-role">
                                        {user?.role}
                                    </span>
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
                            <Link to="/health-info" className="nav-link">
                                Health Info
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

