import React from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useState, useEffect} from 'react';
import PackageCard from "../PackageCard.tsx";
import {Package} from '../../types/Package.ts';

const bannerSettings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
};

const packageSettings = {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    rtl: true,
};

function Home({children}: { children: React.ReactNode }) {
    const [recentPackages, setRecentPackages] = useState([]);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await axiosInstance.get(`/packages/?ordering=-creation_date`);
            setRecentPackages(response.data.results);
            console.log(recentPackages);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    return (
        <div className="flex flex-col px-16 py-4 gap-8 bg-primaryLight h-auto justify-between relative">
            <Header/>

            {/* Banners */}
            <Slider {...bannerSettings}>
                <Link to="/packages">
                    <div>
                    <img className="flex-grow h-full object-cover rounded-2xl"
                    src="/images/banner1.png"
                    alt="Banner 1"/>
                    </div>
                </Link>
                <Link to="http://localhost:5174/">
                    <div>
                    <img className="flex-grow h-full object-cover rounded-2xl"
                    src="/images/banner2.png"
                    alt="Banner 2"/>
                    </div>
                </Link>
            </Slider>

            {/* Recent Packages */}
            <div className="flex gap-8 w-full h-[384px] mt-4">
                <div className="w-[288px] h-[384px] flex flex-col bg-accentBlue rounded-[35px] p-12 items-end">
                    <p className="font-IRANSansXBold text-[44px] text-wrap text-right text-white">
                        جدیدترین بسته‌های لک‌لک
                    </p>
                    <a href="/packages" className="mt-auto">
                        <Button className="font-IRANSansXBold text-[14px] rounded-[35px] px-6 py-4 bg-primary text-white">
                            مشاهده‌ی همه
                        </Button>
                    </a>
                </div>

                <Slider {...packageSettings} className="w-3/4 h-[384px] justify-between flex-inline">
                    {recentPackages.slice(0, 6).map((pack: Package) => (
                        <PackageCard pack={pack}/>
                    ))}
                </Slider>
            </div>

            <Footer/>
        </div>
    );
}

export default Home;
