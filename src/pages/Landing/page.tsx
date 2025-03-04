import React from "react";
import Home from "../../components/Home/Home.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

function LandingPage() {
    return (
        <>
            <Home></Home>
        </>
    );
}

export default LandingPage;
