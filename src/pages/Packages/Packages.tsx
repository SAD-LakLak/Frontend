import React from "react";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";
import {Button} from "@material-tailwind/react";
import {replaceEnglishDigits} from "../../utils/replacePersianNumbers.ts";
import axiosInstance from "../../constants/axiosConfig.ts";
import {useState, useEffect} from 'react';
import PackageCard from "../../components/PackageCard.tsx";
import {Package} from '../../types/Package.ts';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Tooltip as ReactTooltip } from "react-tooltip";
import Slider from '@mui/material/Slider';
import Switch, { SwitchProps } from '@mui/material/Switch';

function Packages() {
    const [packs, setPackages] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        min_price: '',
        max_price: '',
        min_stock: '',
        max_stock: '',
        ordering: '-name',
        search: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({});

    const fetchPackages = async (filtersToApply) => {
        try {
            const query = Object.entries(filtersToApply)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            const response = await axiosInstance.get(`/packages/?${query}`);

            setPackages(response.data.results);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const applyFilters = () => {
        setAppliedFilters(filters);
        fetchPackages(filters);
    };

    const clearFilters = () => {
        const resetFilters = {
            name: '',
            min_price: '',
            max_price: '',
            min_stock: '',
            max_stock: '',
            ordering: '-name',
            search: '',
        };
        setFilters(resetFilters);
        setAppliedFilters(resetFilters);
    };

    const changeOrdering = (ordering: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ordering: ordering,
        }));
        applyFilters();
    };

    const handleStockSwitchChange = (event) => {
        const isChecked = event.target.checked;
        setFilters({
            ...filters,
            min_stock: isChecked ? "1" : "",
        });
        applyFilters();
    };

    const sliderValue = [
        filters.min_price ? Number(filters.min_price) : 0,
        filters.max_price ? Number(filters.max_price) : 5000000,
    ];

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setFilters({
            ...filters,
            min_price: newValue[0].toString(),
            max_price: newValue[1].toString(),
        });
        applyFilters();
    };

    useEffect(() => {
        fetchPackages(appliedFilters);
    }, [appliedFilters]);

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
                <div className="w-[288px] h-fit flex flex-col gap-4 bg-white rounded-[35px] py-8 px-6 items-start">
                    <p dir={"rtl"}>{`${replaceEnglishDigits(packs.length)} محصول`}</p>
                    <div className={"relative w-full max-w-lg"}> {/* Search Bar */}
                        <SearchIcon
                            onClick={applyFilters}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary hover:cursor-pointer"/>
                        <input
                            dir={"rtl"}
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="جست‌وجو کنید..."
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                        />
                    </div>
                    <p className={"font-IRANSansXDemiBold mt-2"} dir={"rtl"}>{`مرتب‌سازی`}</p>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`براساس قیمت`}</p>
                        <div className={"flex gap-2"}>
                            <ArrowUpwardIcon
                            onClick={() => changeOrdering("price")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="صعودی"
                            data-for="price-asc"/>
                            {/* <ReactTooltip id="price-asc" place="bottom" effect="solid" /> */}
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("-price")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="نزولی"
                            data-for="price-desc"/>
                            {/* <ReactTooltip id="price-desc" place="bottom" effect="solid" /> */}
                        </div>
                    </div>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`براساس تازگی`}</p>
                        <div className={"flex gap-2"}>
                            <ArrowUpwardIcon
                            onClick={() => changeOrdering("date")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="صعودی"
                            data-for="date-asc"/>
                            {/* <ReactTooltip id="date-asc" place="bottom" effect="solid" /> */}
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("-date")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="نزولی"
                            data-for="date-desc"/>
                            {/* <ReactTooltip id="date-desc" place="bottom" effect="solid" /> */}
                        </div>
                    </div>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`براساس محبوبیت`}</p>
                        <div className={"flex gap-2"}>
                            <ArrowUpwardIcon
                            onClick={() => changeOrdering("score")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="صعودی"
                            data-for="score-asc"/>
                            {/* <ReactTooltip id="score-asc" place="bottom" effect="solid" /> */}
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("-score")}
                            className="text-primary hover:cursor-pointer"
                            data-tip="نزولی"
                            data-for="score-desc"/>
                            {/* <ReactTooltip id="score-desc" place="bottom" effect="solid" /> */}
                        </div>
                    </div>
                    <p className={"font-IRANSansXDemiBold mt-2"} dir={"rtl"}>{`فیلترها`}</p>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`فقط محصولات موجود`}</p>
                        <Switch
                        checked={filters.min_stock === "1"}
                        onChange={handleStockSwitchChange}
                        color="primary"/>
                    </div>
                    <p dir={"rtl"}>{`محدوده قیمت`}</p>
                    <div className={"w-full px-2"}>
                        <Slider
                            value={sliderValue}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000000}
                            step={100000}
                            valueLabelFormat={(value) => `${replaceEnglishDigits(value)} تومان`}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 w-full h-fit">
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
