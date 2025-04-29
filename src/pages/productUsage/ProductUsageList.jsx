import React from "react";
import SimpleListWithStatus from "../../components/list/SimpleListWithStatus";
import SearchIcon  from "../../assets/icons/Search";
import CustomDropdown from "../../components/CustomDropdown";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
import SimpleList from "../../components/list/SimpleList";
const ProductUsageList = () => {
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
        {
            key: "status",
            label: "Status"
        }
    ];

    const handleStatusClick = (id) => {
        // Handle status change logic here
        console.log('Status clicked for id:', id);
    };

    const data = [
        {
            id: 1,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100,
            status: "active"
        },
        {
            id: 2,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100,
            status: "inactive"
        },
        {
            id: 3,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100,
            status: "active"
        },
        {
            id: 4,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890", 
            quantity: 100,
            status: "inactive"
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
                    <button className="">
                        <DownloadIcon />
                    </button>
                </div>
            </div>

            <SimpleList
                columns={columns} 
                data={data} 
                enableView={true} 
                handleView={(id) => {navigate("/product/usage/" + id)}}
                handleEdit={(id) => {navigate("/product/usage/" + id + "/edit")}}

            />
        </div>
    );
};

export default ProductUsageList;