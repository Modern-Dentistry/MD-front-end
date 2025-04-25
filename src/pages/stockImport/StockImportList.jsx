import React from "react";
import SimpleList from "../../components/list/SimpleList";
import SearchIcon  from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
const StockImport = () => {
    const navigate = useNavigate();
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
            id: 1,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            id: 2,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            id: 3,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        },
        {
            id: 4,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100
        }
    ];
    return (
        <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-1">

            <div className="flex justify-between items-center gap-2 p-2">
                <div className="flex items-center gap-2">               
                    <CustomDropdown />
                    <input type="text" placeholder="Axtarış..." className="w-full p-2 rounded-lg border border-gray-300" />
                    <button className="">
                        <SearchIcon />
                    </button>
                </div>
                <div className="flex items-center gap-8">
                  
                <button className="bg-[#000000] text-white px-4 py-2 rounded-lg"
                onClick={() => {navigate("/stock/import/add")}}>
                    Yenisini əlavə et
                </button>
                <button className="">
                    <DownloadIcon />
                </button>
                </div>
            </div>

            <SimpleList columns={columns} data={data} enableDelete={true} enableEdit={true} enableView={true} handleView={(id) => {navigate("/stock/import/" + id)}} handleEdit={(id) => {navigate("/stock/import/" + id + "/edit")}}/>
        </div>
    );
};

export default StockImport;