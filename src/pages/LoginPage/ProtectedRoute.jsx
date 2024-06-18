import PropTypes from "prop-types";
// ProtectedRoute.jsx

import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebaseauth.js';
const ProtectedRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <p>Loading...</p>;
    }
    if (!user) {
        return <Navigate to="/home" />;
    }
    return children;
};
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};
export default ProtectedRoute;

