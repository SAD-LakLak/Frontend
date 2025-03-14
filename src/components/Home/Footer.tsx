import React from "react";
import {Link} from "react-router-dom";

function Footer() {
    return (
        <div className={"flex flex-col justify-center items-center h-auto bg-white rounded-2xl px-8 py-4 gap-4"}>
            <div className={"flex flex-row justify-between w-full items-center h-auto"}>
                <div className={"flex"}>
                    <div className={"flex flex-col items-start h-auto px-16 gap-4"}>
                        <Link to="/"><p className="font-IRANSansXDemiBold">درباره‌ی ما</p></Link>
                        <Link to="/"><p className="font-IRANSansXDemiBold">تماس با ما</p></Link>
                    </div>
                    <div className={"flex flex-col items-start h-auto px-16 gap-4"}>
                        <Link to="/"><p className="font-IRANSansXDemiBold">پرسش‌های متداول</p></Link>
                        <Link to="/"><p className="font-IRANSansXDemiBold">قوانین و مقررات</p></Link>
                    </div>
                    <div className={"flex flex-col items-start h-auto px-16 gap-4"}>
                        <a href="https://wiki.laklakbox.ir"><p className="font-IRANSansXDemiBold">بلاگ</p></a>
                        <a href="https://supplier.laklakbox.ir"><p className="font-IRANSansXDemiBold">همکاری با
                            لک‌لک</p></a>
                    </div>
                </div>
                <div>
                    <img className={"mx-8"} src={"/images/logo.png"} style={{width: "136px", height: "121px"}}/>
                </div>
            </div>
            <p dir={"rtl"} className={"font-IRANSansXMedium text-sm size-14px text-onBackground"}>
                کلیه‌ی حقوق این وب‌سایت متعلق به گروه لک‌لک است.
            </p>
        </div>
    );
}

export default Footer;
