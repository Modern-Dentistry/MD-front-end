import React, { useState } from "react";
import ToothSelector from "../../components/ToothSelector";
import CustomDropdown from "../../components/CustomDropdown";
import "../../assets/style/examination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import CompareIcon from "../../assets/icons/Compare";
import EditIcon from "../../assets/icons/Edit";
import DeleteIcon from "../../assets/icons/Delete";
import { toast } from 'react-toastify';
import DropdownMenuChecklist from "../../components/DropdownChecklist";
import DownloadIcon from "../../assets/icons/Download";
import { useNavigate } from "react-router-dom";
const Treatment = () => {
    const FulfillmentStates = {
        WAITING: "WAITING",
        COMPLETED: "COMPLETED",
    };
    const [selectedTeeth, setSelectedTeeth] = useState([]);
    const [mode, setMode] = useState("view"); // Default mode is "view"
    const [fulfillment, setFulfillment] = useState(''); const navigate = useNavigate();
    const plans = [
        {
            id: 1,
            planName: "Basic Cleaning",
            date: "2025-04-01",
            toothNo: 12,
            doctor: "Dr. Smith",
            price: 200,
            discountRate: 10, // in percentage
        },
        {
            id: 2,
            planName: "Root Canal",
            date: "2025-04-05",
            toothNo: 24,
            doctor: "Dr. Johnson",
            price: 300,
            discountRate: 15, // in percentage
        },
        {
            id: 3,
            planName: "Whitening",
            date: "2025-04-08",
            toothNo: 36,
            doctor: "Dr. Brown",
            price: 250,
            discountRate: 5, // in percentage
        },
    ];

    return (
        <div className="examination-container">
            <div className="flex justify-between">
                <div className="flex gap-2 justify-center items-center">
                <div>
                    <input
                        type="date"
                        placeholder="Başlama tarixi"
                        id="start-date"
                        className="border border-gray-300 rounded-md px-2 py-1"
                        onChange={(e) => console.log("Start Date:", e.target.value)}
                    />
                </div>

                {/* End Date Selector */}
                <div>
             
                    <input
                        type="date"
                        id="end-date"
                        className="border border-gray-300 rounded-md px-2 py-1"
                        onChange={(e) => console.log("End Date:", e.target.value)}
                    />
                </div>
                    <CustomDropdown
                        className="flex w-8"
                        options={[
                            { value: FulfillmentStates.WAITING, label: "Gözləyir" },
                            { value: FulfillmentStates.COMPLETED, label: "İcra edilib" },
                        ]}
                        value={fulfillment} // Pass the current state as the value
                        onChange={(value) => {
                            const selectedValue = value;
                            setFulfillment(selectedValue);
                        }}
                        placeholder="Select Treatment"
                        enableSearch={false}
                    />
                </div>
                <div className="flex gap-4">
                    <button>
                        <DownloadIcon />
                    </button>
                </div>

            </div>
            <div className="tooth-selector-container">
                <ToothSelector selectedTeeth={selectedTeeth} mode={mode} />
            </div>
            <div className="flex justify-center items-center border border-gray-300 rounded-md">
                {/* Render the selected plans */}
                <ul>


                </ul>
            </div>
        </div>
    );
};

export default Treatment;