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
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Packages() {
    const [packs, setPackages] = useState<Package[]>([]);
    const [filters, setFilters] = useState({
        name: '',
        min_total_price: '',
        max_total_price: '',
        min_stock: '',
        max_stock: '',
        ordering: '',
        search: '',
        target_group: '',
    });

    const [appliedFilters, setAppliedFilters] = useState({});

    const fetchPackages = async (filtersToApply) => {
        try {
            const query = Object.entries(filtersToApply)
                .filter(([_, value]) => value !== '')
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            const response = await axiosInstance.get(`/packages/?${query}`);
            
            console.log(response.data);
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
        console.log("Applying filters:", filters);
        setAppliedFilters({...filters});
        fetchPackages(filters);
    };

    const clearFilters = () => {
        const resetFilters = {
            name: '',
            min_total_price: '',
            max_total_price: '',
            min_stock: '',
            max_stock: '',
            ordering: '-name',
            search: '',
            target_group: '',
        };
        setFilters(resetFilters);
        setAppliedFilters(resetFilters);
    };

    const changeOrdering = (ordering: string) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, ordering };
            setAppliedFilters(newFilters);
            return newFilters;
        });
    };

    const handleStockSwitchChange = (event) => {
        const isChecked = event.target.checked;
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, min_stock: isChecked ? "1" : "" };
            setAppliedFilters(newFilters);
            return newFilters;
        });
    };

    const sliderValue = [
        filters.min_total_price ? Number(filters.min_total_price) : 0,
        filters.max_total_price ? Number(filters.max_total_price) : 5000000,
    ];

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, 
                min_total_price: newValue[0].toString(), 
                max_total_price: newValue[1].toString() };
            return newFilters;
        });
    };

    const handleSliderCommit = () => applyFilters();

    const handleChangeGroup = (event) => {
        const { value } = event.target;
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters, target_group: value === '' ? '' : value };
            setAppliedFilters(newFilters);
            return newFilters;
        });
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
                            onClick={() => changeOrdering("total_price")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="صعودی"/>
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("-total_price")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="نزولی"/>
                        </div>
                    </div>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`براساس تازگی`}</p>
                        <div className={"flex gap-2"}>
                            <ArrowUpwardIcon
                            onClick={() => changeOrdering("-creation_date")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="صعودی"/>
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("creation_date")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="نزولی"/>
                        </div>
                    </div>
                    <div className={"flex justify-between w-full"}>
                        <p dir={"rtl"}>{`براساس محبوبیت`}</p>
                        <div className={"flex gap-2"}>
                            <ArrowUpwardIcon
                            onClick={() => changeOrdering("score_sum")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="صعودی"/>
                            <ArrowDownwardIcon
                            onClick={() => changeOrdering("-score_sum")}
                            className="text-primary hover:cursor-pointer"
                            titleAccess="نزولی"/>
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
                        onChangeCommitted={handleSliderCommit}
                        valueLabelDisplay="auto"
                        min={0}
                        max={5000000}
                        step={100000}
                        valueLabelFormat={(value) => `${replaceEnglishDigits(value)} تومان`}
                        />
                    </div>
                <div className={"flex-column items-end"}>
                    <div className={"flex justify-between items-center w-full"}>
                        <p dir={"rtl"}>{`دسته‌بندی`}</p>
                        <div className={"flex items-center"}>
                            <Checkbox 
                                value="" 
                                checked={filters.target_group.length === 0} 
                                onChange={handleChangeGroup} 
                            />
                            <p dir={"rtl"}>{`همه`}</p>
                        </div>
                    </div>
                    <div className={"flex items-center"}>
                        <Checkbox value="pregnants" 
                            checked={filters.target_group.includes("pregnants")}
                            onChange={handleChangeGroup} 
                        />
                        <p dir={"rtl"}>{`برای والدین منتظر`}</p>
                    </div>
                    <div className={"flex items-center"}>
                        <Checkbox value="less_6" 
                            checked={filters.target_group.includes("less_6")}
                            onChange={handleChangeGroup} 
                        />
                        <p dir={"rtl"}>{`برای تولد تا ۶ ماهگی`}</p>
                    </div>
                    <div className={"flex items-center"}>
                        <Checkbox value="less_12" 
                            checked={filters.target_group.includes("less_12")}
                            onChange={handleChangeGroup} 
                        />
                        <p dir={"rtl"}>{`برای ۶ ماهگی تا ۱ سالگی`}</p>
                    </div>
                    <div className={"flex items-center"}>
                        <Checkbox value="less_24" 
                            checked={filters.target_group.includes("less_24")}
                            onChange={handleChangeGroup} 
                        />
                        <p dir={"rtl"}>{`برای ۱ سالگی تا ۲ سالگی`}</p>
                    </div>

                    </div>
                    <div className={"flex w-full items-center"}>
                        <Button onClick={clearFilters}  
                        className="rounded-full w-fit bg-accentBlue font-IRANSansXDemiBold mt-6">
                            پاک کردن فیلترها
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 w-full h-fit" dir="rtl">
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
