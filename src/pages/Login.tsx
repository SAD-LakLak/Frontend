import React from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>ورود</h1>
            <button onClick={handleLogin} className="bg-primary text-white px-4 py-2 rounded">
                ورود
            </button>
        </div>
    );
};

export default Login;
