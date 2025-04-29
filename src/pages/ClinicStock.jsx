import React from "react";
import SimpleList from "../components/list/SimpleList";
import SearchIcon  from "../assets/icons/Search";
import CustomDropdown from "../components/CustomDropdown";
import DownloadIcon from "../assets/icons/Download";
const ClinicStock = () => {
    const columns = [
        {
            key: "category",
            label: "Kategoriyası"
        },
        {
                key: "name",
            label: "Məhsulun adı"
        },
        {
            key: "code",
            label: "Məhsulun kodu"
        },
        {
            key: "quantity",
            label: "Məhsulun Sayı"
        },


    ];
    const data = [
        {
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        }
    ];
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-3">

            <div className="flex justify-between items-center gap-2 p-2">
                <div className="flex items-center gap-2">               
                    <CustomDropdown />
                    <input type="text" placeholder="Axtarış..." className="w-full p-2 rounded-lg border border-gray-300" />
                    <button className="">
                        <SearchIcon />
                    </button>
                </div>
                <button className="">
                    <DownloadIcon />
                </button>
            </div>

            <SimpleList columns={columns} data={data} />
        </div>
    );
};

export default ClinicStock;