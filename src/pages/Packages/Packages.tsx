import React from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {Link} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useState, useEffect} from 'react';
import PackageCard from "../../components/PackageCard.tsx";
import {Package} from '../../types/Package.ts';

function Packages() {
    const [packs, setPackages] = useState([]);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axiosInstance.get(`/packages/?ordering=-creation_date`);
            setPackages(response.data.results);
            console.log(packs);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    return (
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight h-auto justify-between relative">
            <Header/>

            {/* Banner */}
            <div className="flex h-[280px] rounded-2xl">
                <img className="flex w-full h-full object-cover rounded-2xl"
                src="/images/banner-packages.png"
                alt="Packages Banner"/>
            </div>

            {/* Packages */}
            <div className="flex justify-between gap-8 w-full m-4">
                <div className="flex gap-8 w-[280px] h-[384px]">
                    <div className="w-[288px] h-[384px] flex flex-col bg-white rounded-[35px] p-12 items-end">
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full h-[384px]">
                    {packs.map((pack: Package) => (
                        <PackageCard pack={pack} />
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Packages;
