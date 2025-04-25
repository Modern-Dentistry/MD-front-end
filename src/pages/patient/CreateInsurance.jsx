import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from '../../components/CustomDropdown';

const CreateInsurance = () => {
    const navigate = useNavigate();
    const handleCreateInsurance = () => {
        console.log('INSURANce yaratildi');
        const id=1
    }

    return (
        <div className='flex flex-col justify-between w-full bg-transparent shadow-md rounded-lg'>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='insurance-company' className='flex-1'>Sığorta şirkəti</label>
                <CustomDropdown />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='policy-number' className='flex-1'>Polis nömrəsi</label>
                <input type='text' id='policy-number' placeholder='Polis nömrəsi' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>

            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='expiration-date' className='flex-1'>Bitmə tarixi</label>
                <input type='date' id='expiration-date' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='deductible-amount' className='flex-1'>Azadolma məbləği</label>
                <input type='text' id='deductible-amount' placeholder='Azadolma məbləği' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='annual-maximum' className='flex-1'>İllik maksimum məbləğ</label>
                <input type='text' id='annual-maximum' placeholder='İllik maksimum məbləğ' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='notes' className='flex-1'>Qeyd</label>
                <textarea id='notes' placeholder='Qeyd' className='flex-8 w-full h-[100px] p-4 border border-[#697586] rounded-lg' />
            </div>

            <div className='flex self-end gap-8 m-4'>
                <button className='flex justify-center items-center text-[#155EEF] border border-[#155EEF] rounded-md p-2 gap-2'
                    onClick={() => navigate('/patient/insurance')}
                >
                    <FontAwesomeIcon icon={faXmark} />
                    İmtina et
                </button>
                <button className='flex justify-center items-center bg-[#155EEF] text-white rounded-md p-2 gap-2'
                    onClick={handleCreateInsurance}>
                    <FontAwesomeIcon icon={faCheck} />
                    Yadda saxla
                </button>
            </div>
        </div>
    );
};

export default CreateInsurance;