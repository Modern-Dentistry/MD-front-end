import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate hookunu import edin
import InfoIcon from "../assets/icons/Info";
import DeleteIcon from "../assets/icons/Delete";
import EditIcon from "../assets/icons/Edit";

const XRayCard = ({ image_url, date, handleClick, xrayId, onDelete }) => {
    const navigate = useNavigate();

    const handleInfoClick = (e) => {
        e.stopPropagation();
        navigate(`info/${xrayId}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        navigate(`edit/${xrayId}`);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete(xrayId);
        }
    };

    return (
        <div className="flex flex-col w-[349px] h-[270px] rounded-lg border overflow-auto border-[#CDD5DF] m-1">

            <div className="flex h-[62px] w-full bg-[#155EEF] items-center text-white px-2 justify-between">
                {date}
                <div className="flex gap-2">
                    <button
                        className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center"
                        onClick={handleInfoClick}
                    >
                        <InfoIcon />
                    </button>
                    <button
                        className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center"
                        onClick={handleEditClick}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center"
                        onClick={handleDeleteClick}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-[208px]" onClick={handleClick}>
                {image_url ? (
                    <img src={image_url} alt="X-Ray" className="w-full h-full object-cover p-2 rounded-lg" loading="lazy" decoding="async" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 rounded-lg">
                        Şəkil yoxdur
                    </div>
                )}
            </div>
        </div>
    );
};

export default XRayCard;