import {
    Routes,
    Route,
    NavLink,
    Navigate,
    useNavigate,
} from 'react-router-dom';
import {useSessionStorage} from "../../hooks/useSessionStorage";

const ProtectedRoute = ({ children }: any) => {
    const [profile] = useSessionStorage('profile', false);


    if (!profile) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default ProtectedRoute;
