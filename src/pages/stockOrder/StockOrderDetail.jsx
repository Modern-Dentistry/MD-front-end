import React from "react";
import StockOrderForm from "../../components/StockOrderForm.jsx";
import { useNavigate, useParams } from "react-router-dom";

const StockOrderDetail = ({mode}) => {
    const navigate = useNavigate();
    const { id } = useParams();


    const mockData = {
        orderDate: "2024-03-20",
        orderTime: "14:30",
        typeCount: 5,
        note: "Test note",
        products: [
            {
                id: 1,
                category: 1,
                name: 1,
                quantity: 10,
                price: 100,
                categoryName: "Dental Materials",
                productName: "Composite Resin"
            }
        ]
    };

    const handleSubmit = (formData) => {
        // Here you would typically make an API call to update the data
        console.log("Form submitted:", formData);
        // After successful submission, navigate back to the list view
        navigate("/stock/order");
    };

    const handleCancel = () => {
        navigate("/stock/order");
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Sifaris Detallari</h1>
            <StockOrderForm 
                initialData={mockData}
                mode={mode}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default StockOrderDetail; 