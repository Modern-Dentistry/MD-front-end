import React, { useState } from 'react';
import EditIcon from '../../assets/icons/Edit';
import DownloadIcon from '../../assets/icons/Download';
import CustomDropdown from '../../components/CustomDropdown';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPrescription = ({ mode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentMode, setCurrentMode] = useState(mode);

    const handleSave = () => {
        console.log('save');
        if (window.location.pathname.includes('/edit')) {
            navigate(`/patient/prescription/${id}`);
        } else {
            setCurrentMode('view');
        }
    }
    const handleCancel = () => {
        if (window.location.pathname.includes('/edit')) {
            navigate(`/patient/prescription/${id}`);
        } else {
            setCurrentMode('view');
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            {currentMode === 'view' && (
        <div className='flex self-end gap-4'>
            <button onClick={() => setCurrentMode('edit')}>
                <EditIcon />
            </button>
            <button >
                <DownloadIcon />
            </button>
        </div>
        )}
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4 justify-between items-center'>
                <label className='flex-1 '>Ad</label>
                <CustomDropdown />
            </div>
            <div className='flex gap-4 justify-between items-center'>
                <label className='flex-1'>Tarix</label>
                <input disabled={currentMode === 'view'} type='text' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Tarix' />
            </div>
            <div className='flex gap-4 justify-between items-center'>
                <label className='flex-1'>Tarix</label>
                <input disabled={currentMode === 'view'} type='text' className='flex-5 border border-gray-300 rounded-md p-2 h-[44px]' placeholder='Tarix' />
            </div>
        </div>
        {currentMode === 'edit' && (
            <div className='flex self-end gap-4'>
                         <button onClick={handleCancel} className='border border-[#155EEF] text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300'>
                        İptal et
                    </button>
                    <button onClick={handleSave} className='border border-[#155EEF] text-white bg-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 hover:bg-[#155EEF] hover:text-white transition-all duration-300'>
                        Yadda saxla
                    </button>
        </div>
        )}
        </div>
    );
};

export default ViewPrescription;