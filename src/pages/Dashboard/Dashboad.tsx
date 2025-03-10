import React, {useEffect, useState} from "react";
import DashboardMenu from "../../components/DashboardMenu.tsx";
import {useAuth} from "../../context/AuthContext.tsx";
import axiosInstance from "../../constants/axiosConfig.ts";
import {Button} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../../components/Home/Header.tsx";
import Footer from "../../components/Home/Footer.tsx";


function Dashboard() {
    const {accessToken, logout} = useAuth();
    const [userData, setUserData] = useState({
        username: "",
        phone_number: "",
        national_code: "",
        birth_date: "",
    });
    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        axiosInstance.get("/user/", {headers})
            .then((result) => {
                setUserData({
                    username: result.data.username,
                    phone_number: result.data.phone_number,
                    national_code: result.data.national_code,
                    birth_date: result.data.birth_date,
                });
            })
            .catch(() => {
                setUserData({
                    username: "",
                    phone_number: "",
                    national_code: "",
                    birth_date: "",
                });
                console.error("Error fetching user data");
            });
    }, [accessToken]);
    const navigate = useNavigate()

    function getKey(key: string): string {
        const keyMap: { [key: string]: string } = {
            "username": "نام کاربری",
            "phone_number": "شماره تماس",
            "email": "ایمیل",
            "national_code": "کد ملی",
            "birth_date": "تاریخ تولد",
        };
        return keyMap[key] || "not in key";
    }

    return (
        <>

            <div className={"bg-primaryLight min-h-screens h-fit w-full py-8 px-16 flex flex-col gap-8"}>
                <Header />
                <div className={"flex gap-8"}>
                    {/*right part*/}
                    <DashboardMenu/>
                    {/*left part*/}
                    <div className="flex flex-col bg-white rounded-2xl w-full h-auto items-start py-6 px-8 gap-4">
                        <p className="font-IRANSansXDemiBold text-2xl" dir="rtl">اطلاعات حساب کاربری</p>
                        <div className="flex w-full flex-col gap-2">
                            {Object.keys(userData).map((key) => (
                                <div key={key} className="flex items-center justify-between border-b py-2">
                                {getKey(key) === "not in key" ? null : (
                                    <>
                                        <p className="text-lg font-IRANSansXMedium" dir="rtl">{getKey(key)}</p>
                                        <p className="text-md">{userData[key] || "ثبت نشده"}</p>
                                    </>
                                )}
                                </div>
                            ))}
                        </div>
                        {/* <Button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                            className="rounded-full w-full bg-primary font-IRANSansXDemiBold mt-4">
                            {isEditing ? "ذخیره تغییرات" : "ویرایش اطلاعات"}
                        </Button> */}
                        <div className="flex items-center justify-between gap-4 w-full">
                            <Link to="/resetPassword" className="flex-1">
                                <Button 
                                    className="rounded-full w-full bg-white border-2 text-primary border-primary font-IRANSansXDemiBold hover:bg-primary hover:text-white mt-2">
                                    تغییر رمز عبور
                                </Button>
                            </Link>
                            <div className="flex-1">
                                <Button 
                                    onClick={logout} 
                                    className="rounded-full w-full bg-white border-2 text-primary border-primary font-IRANSansXDemiBold hover:bg-primary hover:text-white mt-2">
                                    خروج از حساب کاربری
                                </Button>
                            </div>
                        </div>
                    </div>

                    
                </div>
                <Footer/>
            </div>
        </>
    );

}

export default Dashboard;
