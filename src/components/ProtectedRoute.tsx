import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {isAuthenticated} = useAuth();
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};

export default ProtectedRoute;
