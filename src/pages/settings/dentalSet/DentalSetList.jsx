import React from "react";
import SimpleListWithStatus from "../../../components/list/SimpleListWithStatus";
import SearchIcon  from "../../../assets/icons/Search";
import CustomDropdown from "../../../components/CustomDropdown";
import DownloadIcon from "../../../assets/icons/Download";
import { useNavigate } from "react-router-dom";

const DentalSetList = () => {
    const navigate = useNavigate();
    const columns = [
        {
            key: "category",
            label: "Dental set adı"
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
            category: "Dental set 1",
            price: "100",
            status: "active"
        },
        {
            id: 2,
            category: "Dental set 2",
            price: "200",
            status: "active"
        },
        {
            id: 3,
            category: "Dental set 3",
            price: "300",
            status: "active"
        },
        {
            id: 4,
            category: "Dental set 4",
            price: "400",
            status: "active"
        },
    ];

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-2 h-full">
            <div className="flex justify-between items-center gap-2 p-4">
                <div className="flex items-center gap-2">               
                    <CustomDropdown />
                    <input type="text" placeholder="Axtarış..." className="w-full p-2 rounded-lg border border-gray-300" />
                    <button className="">
                        <SearchIcon />
                    </button>
                </div>
                <div className="flex items-center gap-8">
                    <button className="bg-transparent border border-[#155EEF] text-[#155EEF] px-4 py-2 rounded-lg"
                    onClick={() => navigate("/settings/dental-set/add")}
                    >
                       + Yenisini əlavə et
                    </button>
                    <button className="">
                        <DownloadIcon />
                    </button>
                </div>
            </div>

            <SimpleListWithStatus 
                columns={columns} 
                data={data} 

                enableEdit={true}
                enableDelete={true}

                handleEdit={(id) => {navigate("/settings/dental-set/" + id)}}
                handleDelete={(id) => {navigate("/settings/dental-set/" + id + "/delete")}}
                handleStatusClick={handleStatusClick}
            />
        </div>
    );
};

export default DentalSetList; 