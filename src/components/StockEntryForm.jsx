import React, { useState, useEffect } from "react";
import CustomDropdown from "./CustomDropdown";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import ToothSelector from "./ToothSelector";
import MultiFileForm from "./MultiFileForm";
import SimpleList from "../components/list/SimpleList";
import ListWithSubtotal from "../components/list/ListwithSubtotal";
import EditIcon from "../assets/icons/edit";
import SearchIcon from "../assets/icons/Search";
import DeleteIcon from "../assets/icons/delete";
import { se } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

const StockEntryForm = ({ initialData, mode = "create", onSubmit, onCancel, handleStatusChange }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, reset } = useForm({
        defaultValues: initialData,
    });

    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({
        category: '',
        name: '',
        quantity: '',
        price: ''
    });
    const [status, setStatus] = useState('pending');

    // Reset form when initialData changes
    useEffect(() => {
        if (initialData) {
            reset(initialData);
            if (initialData.products) {
                setProducts(initialData.products);
            }
        }
    }, [initialData, reset]);

    const categories = [
        { value: 1, label: 'Dental Materials' },
        { value: 2, label: 'Instruments' },
        { value: 3, label: 'Consumables' },
        { value: 4, label: 'Equipment' },
        { value: 5, label: 'Laboratory Supplies' }
    ];

    // Fake data for products based on categories
    const productsByCategory = [
        { value: 1, label: 'Composite Resin' },
        { value: 2, label: 'Glass Ionomer' },
        { value: 3, label: 'Amalgam' },
        { value: 4, label: 'Dental Mirror' },
        { value: 5, label: 'Explorer' },
        { value: 6, label: 'Periodontal Probe' },
        { value: 7, label: 'Gloves' },
        { value: 8, label: 'Masks' },
        { value: 9, label: 'Syringes' },
        { value: 10, label: 'Dental Chair' },
        { value: 11, label: 'X-ray Machine' },
        { value: 12, label: 'Autoclave' },
        { value: 13, label: 'Impression Material' },
        { value: 14, label: 'Dental Stone' },
        { value: 15, label: 'Wax' }
    ];

    const handleProductChange = (field, value) => {
        setCurrentProduct(prev => ({
            ...prev,
            [field]: value,
            // Reset product name when category changes
            ...(field === 'category' ? { name: '' } : {})
        }));
    };

    const handleAddProduct = () => {
        if (currentProduct.category && currentProduct.name && currentProduct.quantity && currentProduct.price) {
            const newProduct = {
                id: Date.now(),
                ...currentProduct,
                // Add category name for display
                categoryName: categories.find(cat => cat.value === currentProduct.category)?.label,
                // Add product name for display
                productName: productsByCategory.find(prod => prod.value === currentProduct.name)?.label
            };
            setProducts(prev => [...prev, newProduct]);
            setCurrentProduct({
                category: '',
                name: '',
                quantity: '',
                price: ''
            });
        }
    };

    const handleFormSubmit = (data) => {
        const formData = {
            ...data,
            products
        };
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    const samplDataforList = [
        {
            id: 1,
            name: "Məhsul 1",
            price: 100,
        },
        {
            id: 2,
            name: "Məhsul 2",
            price: 200,
        },
        {
            id: 3,
            name: "Məhsul 3",
            price: 300,
        },
        {
            id: 4,
            name: "Məhsul 4",
            price: 400,
        },
    ];

    const columns = [
        {
            key: "categoryName",
            label: "Kategoriya",
        },
        {
            key: "productName",
            label: "Məhsul",
        },
        {
            key: "quantity",
            label: "Miqdar",
        },
        {
            key: "price",
            label: "Qiymət",
        }
    ];

    const handleDeleteProduct = (id) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const handleEditProduct = (product) => {
        // Find the category and product objects to set as values
        const categoryObj = categories.find(cat => cat.value === product.category);
        const productObj = productsByCategory.find(prod => prod.value === product.name);
        
        setCurrentProduct({
            category: product.category,
            name: product.name,
            quantity: product.quantity,
            price: product.price
        });

        // Remove the product being edited from the list
        setProducts(prev => prev.filter(p => p.id !== product.id));
    };

    const handleDelete = () => {
        if (onCancel) {
            onCancel();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            setMode('view');
        }
    };

    const statusOptions = [
        { value: 'pending', label: 'Gözləyir', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'approved', label: 'Təsdiqlənib', color: 'bg-green-100 text-green-800' },
        { value: 'rejected', label: 'Rədd edilib', color: 'bg-red-100 text-red-800' }
    ];


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">

            <div className="flex justify-between items-center gap-2">
                <label htmlFor="status">Status <span className="text-red-500">*</span></label>
                <div className="w-[950px]">
                    <button
                        type="button"
                        onClick={handleStatusChange}
                        className={`w-[200px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${
                            statusOptions.find(option => option.value === status)?.color
                        } 'cursor-pointer'}`}
                    >
                        {statusOptions.find(option => option.value === status)?.label}
                    </button>
                </div>
            </div>

            
            <div className="flex justify-between items-center gap-2">
                <label htmlFor="orderDate">Sifariş tarixi <span className="text-red-500">*</span></label>
                <div className="w-[950px]">
                    <input
                        id="orderDate"
                        type="date"
                        {...register('orderDate', { required: true })}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center gap-2">
                <label htmlFor="orderTime">Saat <span className="text-red-500">*</span></label>
                <div className="w-[950px]">
                    <input
                        id="orderTime"
                        type="time"
                        {...register('orderTime', { required: true })}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                </div>
            </div>
            
            <div className="flex justify-between items-center gap-2">
                <label htmlFor="typeCount">Çeşid sayı <span className="text-red-500">*</span></label>
                <div className="w-[950px]">
                    <input
                        id="typeCount"
                        type="number"
                        {...register('typeCount', { required: true })}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-10 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center gap-2">
                <label htmlFor="note">Qeyd <span className="text-red-500">*</span></label>
                <div className="w-[950px]">
                    <textarea
                        id="note"
                        {...register('note', { required: true })}
                        readOnly={mode === 'view'}
                        className={`w-[950px] h-25 border border-[#D4DCE8] rounded-lg px-4 py-2 ${mode === 'view' ? 'bg-gray-200' : ''}`}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center gap-2">
                <label htmlFor="documents">Məhsullar</label>
                <div className="w-[950px]">
                    <SimpleList
                        columns={columns}
                        data={products}
                    />
                </div>
            </div>


            {mode !== 'view' && (
                <div className="self-end flex gap-4 m-4">
                    <button 
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center px-4 py-2 border text-[#155EEF] border-[#155EEF] rounded-lg hover:bg-gray-100 w-[184px] h-[44px] gap-2"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                        Ləğv et
                    </button>
                    <button 
                        type="submit"
                        className="flex items-center justify-center px-4 py-2 bg-[#155EEF] text-white rounded-lg hover:bg-[#155EEF] w-[184px] h-[44px] gap-2"
                    >
                        <FontAwesomeIcon icon={faCheck} />
                        Yadda saxla
                    </button>
                </div>
            )}
        </form>
    );
};

export default StockEntryForm;