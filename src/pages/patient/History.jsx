import React from 'react';
import EditIcon from '../../assets/icons/Edit';
import DeleteIcon from '../../assets/icons/Delete';
import DownloadIcon from '../../assets/icons/Download';
import SimpleList from '../../components/list/SimpleList';
const History = () => {

    const data = [
        // {
        //     id: 1,
        //     name: 'John Doe',
        //     date: '2021-01-01',
        // }
    ]

    const columns = [
        {
            id: 1,
            label: 'Name',
            key: 'name',
        },
        {
            id: 2,
            label: 'Date',
            key: 'date',
        }
    ]
    return (
        <div className='flex flex-col gap-4'>
        <div className='flex self-end gap-4'>
            <button>
                <EditIcon />
            </button>
            <button >
                <DownloadIcon />
            </button>
        </div>
        <div>
            {data.length > 0 ? (
                <SimpleList data={data} columns={columns} startPage={1} pageSize={10} endPage={1}  />
            ) : (
                <div className='flex justify-center items-center h-full border border-gray-300 rounded-lg p-4'>
                    <p>Məlumat yoxdur</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default History;