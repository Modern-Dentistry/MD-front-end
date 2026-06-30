import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/style/Technicians/techniciansprices.css";

// Icons
import { CiSearch } from "react-icons/ci";
import { LuPencilLine } from "react-icons/lu";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineDone } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";

// Stores
import useTechnicianStore from "../../../stores/technicianStore";
import useDentalOrderStore from "../../../stores/dentalOrderStore";

function TechniciansPrices() {
  const { id } = useParams(); // Technician UUID
  const navigate = useNavigate();

  const { selectedTechnician, fetchTechnicianById } = useTechnicianStore();
  const { orders, fetchOrders, editTechnicOrderPrice } = useDentalOrderStore();

  const [ordersList, setOrdersList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (id) {
      fetchTechnicianById(id);
      fetchOrders();
    }
  }, [id, fetchTechnicianById, fetchOrders]);

  useEffect(() => {
    if (selectedTechnician) {
      const fullName = `${selectedTechnician.name} ${selectedTechnician.surname}`.trim().toLowerCase();
      const techOrders = orders.filter(
        (o) => o.technician && o.technician.trim().toLowerCase() === fullName
      );
      setOrdersList(techOrders);
    }
  }, [orders, selectedTechnician]);

  const handleEditToggle = async () => {
    if (isEditing) {
      // Clicked Save/Done
      setSaving(true);
      try {
        for (const order of ordersList) {
          const original = orders.find((o) => o.id === order.id);
          if (original && Number(original.price) !== Number(order.price)) {
            await editTechnicOrderPrice(order.id, { price: Number(order.price) });
          }
        }
        await fetchOrders();
        setIsEditing(false);
      } catch (error) {
        console.error("Error saving prices:", error);
        alert("Qiymətlər yadda saxlanılarkən xəta baş verdi.");
      } finally {
        setSaving(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handlePriceChange = (orderId, value) => {
    setOrdersList((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, price: value } : ord))
    );
  };

  const filteredOrders = ordersList.filter((op) => {
    const query = searchQuery.toLowerCase();
    return (
      op.id.toString().includes(query) ||
      op.patient?.toLowerCase().includes(query) ||
      op.doctor?.toLowerCase().includes(query) ||
      op.dentalWorkType?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="techniciansPricesPage">
      <div className="techniciansPricesPageTopPart">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/technicians")}
            className="flex items-center justify-center p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            title="Geri qayıt"
          >
            <IoArrowBackOutline size={20} />
          </button>
          {selectedTechnician && (
            <h2 className="text-xl font-bold text-gray-800">
              {selectedTechnician.name} {selectedTechnician.surname} - Qiymət siyahısı
            </h2>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="searchPriceNow">
            <input
              type="text"
              placeholder="Axtarış"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CiSearch className="search-btn" />
          </div>
          <div className="topPartIconsWrapper">
            {isEditing ? (
              <MdOutlineDone
                className="verifyIcon"
                onClick={handleEditToggle}
                title="Təsdiqlə"
                style={{ cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.5 : 1 }}
              />
            ) : (
              <LuPencilLine
                className="penIconForTopPartIcon"
                onClick={handleEditToggle}
                title="Redaktə et"
              />
            )}
          </div>
        </div>
      </div>

      <div className="techniciansPricesTableWrapper">
        <table className="techniciansTable">
          <thead>
            <tr>
              <th className="w-16">
                <div className="th-content">
                  <span>№</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="tableArrowIcon" />
                  <span>Sifariş №</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="tableArrowIcon" />
                  <span>Pasiyent</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="tableArrowIcon" />
                  <span>Həkim</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="tableArrowIcon" />
                  <span>Sifariş Tipi</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="tableArrowIcon" />
                  <span>Qiymət</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                  Sifariş tapılmadı.
                </td>
              </tr>
            ) : (
              filteredOrders.map((op, index) => (
                <tr key={op.id}>
                  <td>{index + 1}</td>
                  <td>{op.id}</td>
                  <td className="operationColumn">{op.patient || "-"}</td>
                  <td>{op.doctor || "-"}</td>
                  <td>{op.dentalWorkType || "-"}</td>
                  <td className="priceEditData">
                    {isEditing ? (
                      <input
                        type="number"
                        value={op.price || ""}
                        onChange={(e) => handlePriceChange(op.id, e.target.value)}
                        className="editableInput"
                        placeholder="Məbləğ"
                      />
                    ) : (
                      <span className="priceText">
                        {op.price !== null && op.price !== undefined ? `${op.price} AZN` : "-"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TechniciansPrices;
