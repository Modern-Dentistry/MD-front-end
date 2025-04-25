import React from "react";
import StockOrderForm from "../../components/StockOrderForm.jsx";
import { useNavigate } from "react-router-dom";

const AddStockOrder = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        // Here you would typically make an API call to save the data
        console.log("Form submitted:", formData);
        // After successful submission, navigate back to the list view
        navigate("/stock/order");
    };

    const handleCancel = () => {
        navigate("/stock/order");
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Yeni Məhsul Daxil Et</h1>
            <StockOrderForm 
                initialMode="create"
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AddStockOrder; 