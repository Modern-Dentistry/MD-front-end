import React from "react";
import StockDeleteForm from "../../components/StockDeleteForm.jsx";
import { useNavigate } from "react-router-dom";

const AddStockDelete = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        // Here you would typically make an API call to save the data
        console.log("Form submitted:", formData);
        // After successful submission, navigate back to the list view
        navigate("/stock/delete");
    };

    const handleCancel = () => {
        navigate("/stock/delete");
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Yeni Məhsul Sil</h1>
            <StockDeleteForm 
                initialMode="create"
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AddStockDelete; 