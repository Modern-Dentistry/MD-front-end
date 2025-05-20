import React, { useEffect } from "react";
import StockOrderForm from "../../components/StockOrderForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import useOrderFromWarehouseStore from "../../../stores/orderFromWarehouseStore";

const StockOrderDetail = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();



  const { fetchOrderById, selectedOrder, loading, error } =
    useOrderFromWarehouseStore();

  useEffect(() => {
    if (id) {
      fetchOrderById(id);
    }
  }, [id, fetchOrderById]);

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
    navigate("/stock/order");
  };

  const handleCancel = () => {
    navigate("/stock/order");
  };

  if (loading) {
    return <div className="p-4">Yüklənir...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Xəta baş verdi: {error}</div>;
  }

  if (!selectedOrder) {
    return <div className="p-4">Sifariş tapılmadı.</div>;
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Sifariş Detalları</h1>
      <StockOrderForm
        initialData={selectedOrder}
        mode={mode}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default StockOrderDetail;
