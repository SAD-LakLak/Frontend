import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import Home from "./components/Home/Home.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
