import React from "react";
import EditIcon from "../assets/icons/edit";
import DeleteIcon from "../assets/icons/delete";
import OrderForm from "../components/OrderForm";
const AddOrder = () => {
    return (
        <div className="w-full h-full flex flex-col">
           <OrderForm />
        </div>
    );
}

export default AddOrder;