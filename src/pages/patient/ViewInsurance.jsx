import React, { useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import CustomDropdown from '../../components/CustomDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '../../assets/icons/Edit';
import DeleteIcon from '../../assets/icons/Delete';
const ViewInsurance = ({ mode }) => {
    const { id } = useParams();
    const [currentMode, setCurrentMode] = useState(mode);
    const navigate = useNavigate();
    const handleCreateInsurance = () => {
        console.log('INSURANce yaratildi');
        const id=1
    }

    return (
        <div className='flex flex-col justify-between w-full bg-transparent  rounded-lg'>

            {currentMode === 'view' ? (
                  <div className='flex self-end gap-4 m-2'>
                  <button onClick={() => navigate(`/patient/insurance/${id}/edit`)}>    
                      <EditIcon />
                  </button>
                  <button >
                      <DeleteIcon />
                  </button>
              </div>
            ) : null}

            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='insurance-company' className='flex-1'>Sığorta şirkəti</label>
                {
                    currentMode === 'view' ? (
                        <input disabled={mode === 'view'} type='text' id='insurance-company' placeholder='Sığorta şirkəti' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
                    ) : (
                        <CustomDropdown  />
                    )
                }
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='policy-number' className='flex-1'>Polis nömrəsi</label>
                    <input disabled={mode === 'view'} type='text' id='policy-number' placeholder='Polis nömrəsi' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>

            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='expiration-date' className='flex-1'>Bitmə tarixi</label>
                <input disabled={mode === 'view'} type='date' id='expiration-date' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='deductible-amount' className='flex-1'>Azadolma məbləği</label>
                <input disabled={mode === 'view'} type='text' id='deductible-amount' placeholder='Azadolma məbləği' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='annual-maximum' className='flex-1'>İllik maksimum məbləğ</label>
                <input disabled={mode === 'view'} type='text' id='annual-maximum' placeholder='İllik maksimum məbləğ' className='flex-8 w-full h-[44px] p-4 border border-[#697586] rounded-lg' />
            </div>
            <div className='flex items-center gap-8 my-2 mx-4'>
                <label htmlFor='notes' className='flex-1'>Qeyd</label>
                <textarea disabled={mode === 'view'} id='notes' placeholder='Qeyd' className='flex-8 w-full h-[100px] p-4 border border-[#697586] rounded-lg' />
            </div>

        {currentMode === 'edit' ? (
            <div className='flex self-end gap-8 m-4'>
                <button className='flex justify-center items-center text-blue-500 border border-blue-500 rounded-md p-2 gap-2'
                    onClick={() => navigate('/patient/insurance')}
                >
                    <FontAwesomeIcon icon={faXmark} />
                    İmtina et
                </button>
                <button className='flex justify-center items-center bg-blue-500 text-white rounded-md p-2 gap-2'
                    onClick={handleCreateInsurance}>
                    <FontAwesomeIcon icon={faCheck} />
                    Yadda saxla
                </button>
            </div>
        ) : null}
        </div>
    );
};;

export default ViewInsurance;