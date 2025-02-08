import React from "react";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom";

const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
};

function Home({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col px-16 py-4 gap-4 bg-primaryLight h-auto justify-between relative">
            <Header/>

            {/* Banners */}
            <Slider {...settings}>
                <Link to="/packages">
                    <div>
                    <img className="flex-grow h-full object-cover rounded-2xl"
                    src="/images/banner1.png"
                    alt="Banner 1"/>
                    </div>
                </Link>
                <Link to="localhost:5173">
                    <div>
                    <img className="flex-grow h-full object-cover rounded-2xl"
                    src="/images/banner2.png"
                    alt="Banner 2"/>
                    </div>
                </Link>
            </Slider>

            {/* Recent Packages */}
            

            <Footer/>
        </div>
    );
}

export default Home;
