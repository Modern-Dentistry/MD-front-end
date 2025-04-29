import React from "react";
import InfoIcon from "../assets/icons/Info";
import DeleteIcon from "../assets/icons/delete";
import EditIcon from "../assets/icons/edit";
const XRayCard = ({image_url, date, handleClick}) => {
    
    return (
        <>

        <div className="flex flex-col w-[349px] h-[270px] rounded-lg border overflow-auto border-[#CDD5DF] m-1">

        <div className="flex h-[62px] w-full bg-[#155EEF] items-center text-white px-2 justify-between">
            {date}
            <div className="flex gap-2">
            <button className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center">
                    <InfoIcon />
                </button>
                <button className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center">
                    <EditIcon />
                </button>
                <button className="flex w-[40px] h-[40px] bg-white border rounded-lg items-center justify-center">
                    <DeleteIcon />
                </button>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center h-[208px]" onClick={handleClick}>
            <img src={image_url} alt="X-Ray" className="w-full h-full object-cover  p-2 rounded-lg" />
            </div>
    </div>
 
    </>
   )
}
export default XRayCard;