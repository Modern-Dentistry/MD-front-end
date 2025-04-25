import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ImplantDetail = () => {
    const navigate = useNavigate();
    const [mockData, setMockData] = useState({
        id: 1,
        name: "İmplant 1",
        description: "İmplant 1 description",
        status: "active"
    }); 

    const handleEditImplant = () => {
        console.log('İmplant redakte olundu');
        const id=1
        navigate(`/settings/implants/${id}`)
    }

    return (
        <div className='flex flex-col justify-between  h-[172px] w-full bg-white shadow-md rounded-lg p-4'>
            <div className='flex items-center gap-8 m-4'>
                <label htmlFor='implant-name' className='flex-1'>İmplant adı</label>
                <input type='text' id='implant-name' placeholder='İmplant adı' className='flex-8 w-full h-[44px] p-4 border border-gray-300 rounded-lg' 
                value={mockData.name}
                onChange={(e) => setMockData({...mockData, name: e.target.value})}
                />
            </div>
            <div className='flex self-end gap-8 m-4'>
                <button className='flex justify-center items-center text-[#155EEF] border border-[#155EEF] rounded-md p-2 gap-2'
                onClick={() => navigate('/settings/implants')}
                >
                    <FontAwesomeIcon icon={faXmark} />
                    İmtina et
                </button>
                <button className='flex justify-center items-center bg-[#155EEF] text-white rounded-md p-2 gap-2'
                onClick={handleEditImplant}>
                    <FontAwesomeIcon icon={faCheck} />
                    Yadda saxla
                </button>
            </div>
        </div>
    );
};

export default ImplantDetail; 