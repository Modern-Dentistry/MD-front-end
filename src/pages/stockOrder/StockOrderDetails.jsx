import { useParams } from "react-router-dom";
import useOrderFromWarehouseStore from "../../../stores/orderFromWarehouseStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StockOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchOrderById, currentOrder } = useOrderFromWarehouseStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  if (!currentOrder) return <div className="p-4">Yüklənir...</div>;

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg bg-white p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#155EEF] mb-4">
        <BackIcon /> Geri qayıt
      </button>

      <h2 className="text-xl font-bold mb-4">Sifariş detalları</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-500">Sifariş №</p>
          <p className="font-medium">{currentOrder.number}</p>
        </div>
        <div>
          <p className="text-gray-500">Tarix</p>
          <p className="font-medium">
            {new Date(currentOrder.date).toLocaleDateString("az-AZ")}{" "}
            {currentOrder.time}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Otaq</p>
          <p className="font-medium">{currentOrder.room || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Sifariş verən</p>
          <p className="font-medium">
            {currentOrder.personWhoPlacedOrder || "Anonim"}
          </p>
        </div>
      </div>

      <h3 className="font-semibold mb-2">Məhsullar</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Məhsul adı
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Kateqoriya
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Miqdar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Qiymət
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrder.products?.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.categoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.quantity} ədəd
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.price} AZN
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOrderDetails;
