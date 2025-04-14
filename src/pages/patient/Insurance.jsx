import React from "react";
import EditIcon from "../../assets/icons/Edit";
import DownloadIcon from "../../assets/icons/Download";
import SimpleList from "../../components/list/SimpleList";
import SearchIcon from "../../assets/icons/Search";
import { useNavigate } from "react-router-dom";
const Insurance = () => {
    const navigate = useNavigate();
    return (
      <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-4'>
        <div className="flex gap-4">
          <input type="text" className="border border-[#E0E0E0] rounded-lg p-2 h-[36px]" placeholder="Polis No" />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/patient/create-insurance')}>
            <div className="flex items-center justify-center border border-[#155EEF] text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300">
             + Yenisini əlavə et
            </div>
          </button>
          <button >
              <DownloadIcon />
          </button>
          </div>
      </div>
      <div>
        LIST WITH STATUS + DELETE/EDIT/VIEW BUTTONS
      </div>
      </div> 
    );
};

export default Insurance;