import React from "react";
import {ShoppingCartOutlined} from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {Link} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";

function Header() {
    const {isAuthenticated} = useAuth()
    return (
        <div className={"flex justify-between h-24 bg-white rounded-2xl px-8"}>
            <div className={"flex flex-1 justify-start items-center mx-8"}>
                <Link to="/packages" className={"gap-2 flex items-center"}>
                    <p className={"font-IRANSansXBold text-primary"}>
                        بسته‌ها
                    </p>
                </Link>
            </div>
            <Link to={"/"} className={"flex flex-1 justify-center items-center "}>
                <img src={"/images/logo.png"} className={"h-full"}/>
            </Link>
            <div className={"flex flex-1 justify-end items-center gap-2 mx-8"}>
                {!isAuthenticated && <Link to="/login" className={" gap-2 flex items-center"}>
                    <p className={"font-IRANSansXBold text-primary"}>
                        ورود/ثبت نام
                    </p>
                    <AccountCircleOutlinedIcon fontSize={"large"} className="text-primary"/>
                </Link>}
                {isAuthenticated && <Link to="/dashboard" className={" gap-2 flex items-center"}>
                    <p className={"font-IRANSansXBold text-primary"}>
                        پنل کاربری
                    </p>
                    <DashboardIcon fontSize={"large"} className="text-primary"/>
                </Link>}
                <Link to="/cart" className={" gap-2 flex items-center"}>
                    {/*<p className={"font-IRANSansXBold text-primary"}>*/}
                    {/*    سبد خرید*/}
                    {/*</p>*/}
                    <ShoppingCartOutlined fontSize={"large"} className="text-primary"/>
                </Link>
            </div>
        </div>
    );
}

export default Header;
