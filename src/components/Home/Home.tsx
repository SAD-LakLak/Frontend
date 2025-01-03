import React from "react";
import Header from "../Landing/Header.tsx";

function Home() {
    return (
        <div className={"flex flex-col px-16 py-8 bg-primaryLight h-screen justify-between"}>
            <Header/>
        </div>
    );
}

export default Home;
