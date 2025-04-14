import React from 'react';
import SimpleList from '../../components/list/SimpleList';
import DualList from '../../components/list/DualList';
const EditHistory = () => {
    const data = [
        {
            id: 1,
            name: 'John Doe',
            date: '2021-01-01',
        }
    ]
    const columns = [
        {
            id: 1,
            label: 'Name',
            key: 'name',
        }
    ]
    const categories = [
        {
            id: 1,
            name: 'Category 1',
            count: 10,

        },
        {
            id: 2,
            name: 'Category 2',
            count: 20,
        }
    
    ]
    const subCategories = [
        {
            id: 1,
            name: 'Sub Category 1',
        },
        {
            id: 2,
            name: 'Sub Category 2',
        },
        {
            id: 3,
            name: 'Sub Category 3',
        }
    ]
    const selectedCategory = 1;
    const handleCategory = (category) => {
        console.log(category);
    }
    const handleSelect = (item) => {
        console.log(item);
    }
    return (
        <div className='flex flex-col gap-4'>
            <DualList categories={categories} columns={columns} subCategories={subCategories} selectableItem={'name'} selectedCategory={selectedCategory} handleCategory={handleCategory} handleSelect={handleSelect} />
            <SimpleList data={data} columns={columns} />
        </div>
    );
};

export default EditHistory;