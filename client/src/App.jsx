import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Common/Navbar.jsx';
import PrivateRoute from './components/Common/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import ProviderDashboard from './pages/ProviderDashboard.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/patient/dashboard"
              element={
                <PrivateRoute role="patient">
                  <PatientDashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/provider/dashboard"
              element={
                <PrivateRoute role="provider">
                  <ProviderDashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
