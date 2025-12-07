import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loading from './Loading';

const PrivateRoute = ({ children, role }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role && user?.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
