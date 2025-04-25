import React from "react";
import SimpleListWithStatus from "../../../components/list/SimpleListWithStatus";
import SearchIcon  from "../../../assets/icons/Search";
import CustomDropdown from "../../../components/CustomDropdown";
import DownloadIcon from "../../../assets/icons/Download";
import { useNavigate } from "react-router-dom";

const CabinetList = () => {
    const navigate = useNavigate();
    const columns = [
        {
            key: "category",
            label: "Kabinet adı"
        },       
        {
            key: "status",
            label: "Status"
        },
        {
            key: "order",
            label: "Sıra"
        }
    ];

    const handleStatusClick = (id) => {
        // Handle status change logic here
        console.log('Status clicked for id:', id);
    };

    const data = [
        {
            id: 1,
            category: "Kabinet 1",
            status: "active",
            order: 1
        },
        {
            id: 2,
            category: "Kabinet 2",
            status: "active",
            order: 2
        },
        {
            id: 3,
            category: "Kabinet 3",
            status: "active",
            order: 3
        },
        {
            id: 4,
            category: "Kabinet 4",
            status: "active",
            order: 4
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
                    onClick={() => navigate("/settings/cabinets/add")}
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
                handleOrderInput={() => {}}
                handleEdit={(id) => {navigate("/settings/cabinet/" + id)}}
                handleDelete={(id) => {navigate("/settings/cabinet/" + id + "/delete")}}
                handleStatusClick={handleStatusClick}
            />
        </div>
    );
};

export default CabinetList; 