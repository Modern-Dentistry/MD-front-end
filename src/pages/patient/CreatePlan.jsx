import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const CreatePlan = () => {
    const navigate = useNavigate();
    const handleCreatePlan = () => {
        console.log('Plan yaratildi');
        const id=1
        navigate(`/patient/edit-plan/${id}`)
    }

  return (
        <div className='flex flex-col justify-between  h-[172px] w-full bg-transparent shadow-md rounded-lg'>
            <div className='flex items-center gap-8 m-4'>
                <label htmlFor='plan-name' className='flex-1'>Plan adı</label>
                <input type='text' id='plan-name' placeholder='Plan adı' className='flex-8 w-full h-[44px] p-4 border border-gray-300 rounded-lg' />
            </div>
            <div className='flex self-end gap-8 m-4'>
                <button className='flex justify-center items-center text-blue-500 border border-blue-500 rounded-md p-2 gap-2'
                onClick={() => navigate('/patient/plans')}
                >
                    <FontAwesomeIcon icon={faXmark} />
                    İmtina et
                </button>
                <button className='flex justify-center items-center bg-blue-500 text-white rounded-md p-2 gap-2'
                onClick={handleCreatePlan}>
                    <FontAwesomeIcon icon={faCheck} />
                    Yadda saxla
                </button>
            </div>
        </div>

  );
};

export default CreatePlan;

