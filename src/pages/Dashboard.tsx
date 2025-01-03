import React from "react";
import {useAuth} from "../context/AuthContext";

const Dashboard: React.FC = () => {
    const {logout} = useAuth();

    return (
        <div>
            <h1>داشبورد</h1>
            <button onClick={logout} className="bg-error text-white px-4 py-2 rounded">
                خروج
            </button>
        </div>
    );
};

export default Dashboard;
