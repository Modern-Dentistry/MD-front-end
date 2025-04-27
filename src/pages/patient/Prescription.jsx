import React from 'react';
import DownloadIcon from '../../assets/icons/Download';
import SimpleList from '../../components/list/SimpleList';
import { useNavigate } from 'react-router-dom';
const Prescription = () => {
    const navigate = useNavigate();
    const data = [
        {
            id: 1,
            name: 'John Doe',
            date: '2021-01-01',
        },
        {
            id: 2,
            name: 'Jane Doe',
            date: '2021-01-02',
        },
    ]
    const columns = [
        {
            label: 'Ad',
            key: 'name',
        },
        {
            label: 'Tarix',
            key: 'date',
        }
    ]
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center gap-4'>
                <div>
                    <input className='border border-gray-300 rounded-md p-2' type='date' />
                </div>
                <div className='flex gap-4'>
                    <button className='flex justify-center items-center bg-transparent text-[#155EEF] w-[178px] h-[36px] rounded-lg p-2 border border-[#155EEF] hover:bg-[#155EEF] hover:text-white transition-all duration-300'>
                        + Yenisini əlavə et
                    </button>
                    <button>
                        <DownloadIcon />
                    </button>
                </div>
            </div>
            <div>
                <SimpleList data={data} columns={columns} startPage={1} endPage={1} pageSize={10} enableEdit={true} enableDelete={true} enableView={true} handleEdit={(id) => { navigate(`/patient/prescription/${id}/edit`) }} handleDelete={(id) => { console.log('delete') }} handleView={(id) => { navigate(`/patient/prescription/${id}`) }} />
            </div>
        </div>

    );
};

export default Prescription;