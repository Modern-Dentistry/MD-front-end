import React from "react";
import StockEntryForm from "../../components/StockEntryForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import SimpleList from "../../components/list/SimpleList.jsx";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ProductUsageDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const mode = "view";

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

    const columns = [
        {
            key: "category",
            label: "Kategoriyası"
        },
        {
            key: "name",
            label: "Məhsulun adı"
        },
        {
            key: "code",
            label: "Məhsulun kodu"
        },
        {
            key: "quantity",
            label: "Məhsulun sayı"
        },
        
        
    ]

    const data = [
        {
            id: 1,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890",
            quantity: 100,
            status: "active"
        },
        {
            id: 2,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890",
            quantity: 100,
            status: "active"
        },
        {
            id: 3,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890",
            quantity: 100,
            status: "active"
        },
        {
            id: 4,
            category: "Dental Materials",
            name: "Composite Resin",
            code: "1234567890",
            quantity: 100,
            status: "active"
        }
    ]

    return (
        <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between ">
            <label className="text-base mb-4">Məhsul istifadəsi</label>
            <SimpleList
                columns={columns}
                data={data}
                pagination={false}
            />
            </div>

        </div>
    );
};

export default ProductUsageDetail; 