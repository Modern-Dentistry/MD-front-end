import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AddDentalSet = () => {
    const navigate = useNavigate();
    const handleAddDentalSet = () => {
        console.log('Dental set yaratildi');
        const id=1
        navigate(`/settings/dental-set/${id}`)
    }

  return (
        <div className='flex flex-col justify-between  h-[172px] w-full bg-white shadow-md rounded-lg p-4'>
            <div className='flex items-center gap-8 m-4'>
                <label htmlFor='dentalSet-name' className='flex-1'>Dental set adı</label>
                <input type='text' id='dentalSet-name' placeholder='Dental set adı' className='flex-8 w-full h-[44px] p-4 border border-gray-300 rounded-lg' />
            </div>
            <div className='flex self-end gap-8 m-4'>
                <button className='flex justify-center items-center text-[#155EEF] border border-[#155EEF] rounded-md p-2 gap-2'
                onClick={() => navigate('/settings/dental-set')}
                >
                    <FontAwesomeIcon icon={faXmark} />
                    İmtina et
                </button>
                <button className='flex justify-center items-center bg-[#155EEF] text-white rounded-md p-2 gap-2'
                onClick={handleAddDentalSet}>
                    <FontAwesomeIcon icon={faCheck} />
                    Yadda saxla
                </button>
            </div>
        </div>

  );
};

export default AddDentalSet; 