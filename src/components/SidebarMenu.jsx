// React-Icons
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosArrowForward as IoIosChevronRight,
} from "react-icons/io";

// Libraries
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Style
import "../assets/style/sidebar-menu.css";

// Images
import mdLogo from "../assets/images/md-logo.svg";

// Icons
import DoctorIcon from "./sidebar-icons/DoctorIcon.jsx";
import CalendarIcon from "./sidebar-icons/CalendarIcon.jsx";
import PatientsIcon from "./sidebar-icons/PatientsIcon.jsx";
import WorkDoneIcon from "./sidebar-icons/WorkDoneIcon.jsx";
import LaboratoryIcon from "./sidebar-icons/LaboratoryIcon.jsx";
import WarehouseIcon from "./sidebar-icons/WarehouseIcon.jsx";
import SettingsIcon from "./sidebar-icons/SettingsIcon.jsx";
import ExitIcon from "./sidebar-icons/ExitIcon.jsx";
import useAuthStore from "../../stores/authStore.js";
import "../../logout.css";

const SidebarMenu = () => {
  const { logout } = useAuthStore();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/";
    }, 1000); // 1 saniyəlik gözləmə (animasiya üçün)
  };

  const menuItems = [
    {
      id: 1,
      title: "İşçilər",
      icon: (isActive) => (
        <DoctorIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        { id: 11, title: "İşçilərin siyahısı", path: "/employees" },
        { id: 12, title: "İşçilərin iş qrafiki", path: "/employees/employee-schedule" },
        { id: 13, title: "Yeni işçi əlavə et", path: "/employees/employee-add" },
      ],
    },
    {
      id: 2,
      title: "Ümumi təqvim",
      icon: (isActive) => (
        <CalendarIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        { id: 22, title: "Randevular", path: "/appointments" },
        { id: 21, title: "Növbə gözləyənlər", path: "/queue" },
        // { id: 23, title: "Yeni Randevu", path: "/appointment/add" },
        // { id: 24, title: "Randevu Kartı", path: "/appointment/card" },
      ],
    },
    {
      id: 3,
      title: "Pasiyentlər",
      path: "/patients",
      icon: (isActive) => (
        <PatientsIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        // { id: 31, title: "Pasiyent Siyahısı", path: "/patients" },
        // { id: 32, title: "Yeni Pasiyent", path: "/add-patient" },
        // { id: 33, title: "Növbə", path: "/queue" },
      ],
    },
    {
      id: 4,
      title: "Görülmüş işlər",
      path: "reports",
      icon: (isActive) => (
        <WorkDoneIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        // { id: 41, title: "Həkim Siyahısı", path: "/employees" },
        // { id: 42, title: "Yeni Həkim", path: "/user/add" },
      ],
    },
    {
      id: 5,
      title: "Laboratoriya",
      icon: (isActive) => (
        <LaboratoryIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        { id: 51, title: "Göndərilən sifarişlər", path: "/sent-orders" },
        { id: 52, title: "Gələn sifarişlər", path: "/received-orders" },
        { id: 53, title: "Texniklər üzrə hesabat", path: "/technicals-report" },
      ],
    },
    {
      id: 6,
      title: "Anbar əməliyyatları",
      icon: (isActive) => (
        <WarehouseIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        { id: 61, title: "Klinikanın stoku", path: "/stock/clinic" },
        { id: 62, title: "Kabinet/Obyekt stoku", path: "/stock/cabinet" },
        { id: 63, title: "Anbara mədaxil", path: "/stock/import" },
        { id: 64, title: "Anbara sifariş", path: "/stock/order" },
        { id: 65, title: "Anbardan məxaric", path: "/stock/entry" },
        { id: 66, title: "Anbardan daxilolmalar", path: "/stock/delete" },
        { id: 67, title: "Anbardan silinmə", path: "/stock/usage" },
        { id: 68, title: "Məhsul istifadəsi", path: "/" },
      ],
    },
    {
      id: 7,
      title: "Tənzimləmələr",
      icon: (isActive) => (
        <SettingsIcon
          width={20}
          height={20}
          stroke={isActive ? "#fff" : "#155EEF"}
        />
      ),
      children: [
        { id: 71, title: "İcazələr", path: "/permissions" },
        { id: 72, title: "Admin istifadəçiləri", path: "/admin-users" },
        { id: 73, title: "Texniklər", path: "/technicians" },
        { id: 74, title: "Randevu tipləri", path: "/appointment-types" },
        { id: 75, title: "Müayinə siyahısı", path: "/settings/examination" },
        { id: 76, title: "Əməliyyat növləri", path: "/operations" },
        { id: 77, title: "Dişlər", path: "/teeth" },
        { id: 78, title: "Rənglər", path: "/colors" },
        { id: 79, title: "İmplantlar", path: "/implants" },
        { id: 80, title: "Qarniturlar", path: "/dental-set" }, // Sənin "Diş dəstləri" path-ı "/settings/dental-set" idi, istersen dəyiş
        { id: 81, title: "Sığorta şirkətləri", path: "/settings/insurance" },
        { id: 82, title: "Qiymət kateqoriyaları", path: "/settings/price-category" },
        { id: 83, title: "Kabinetlər", path: "/settings/cabinet" },
        { id: 84, title: "Digər obyektlər", path: "/other-objects" },
        { id: 85, title: "Reseptlər", path: "/prescriptions" },
        { id: 86, title: "Tövsiyə edilənlər", path: "/recommendations" },
        { id: 87, title: "Anamnez siyahısı", path: "/anamnesis" },
        { id: 88, title: "Elmi dərəcələr", path: "/academic-degrees" },
        { id: 89, title: "İxtisaslar", path: "/specialities" },
        { id: 90, title: "Metallar", path: "/metals" },
        { id: 91, title: "Keramikalar", path: "/ceramics" },
        { id: 92, title: "Məhsul kateqoriyaları", path: "/product-categories" },
        { id: 93, title: "Qara siyahı səbəbləri", path: "/blacklist-reasons" },
        { id: 94, title: "Ümumi tənzimləmələr", path: "/general-settings" },
      ],
      
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const expanded = [];

    menuItems.forEach((item) => {
      const hasActiveChild = item.children?.some(
        (child) => child.path === currentPath
      );
      if (hasActiveChild) {
        expanded.push(item.id);
      }
    });

    setExpandedItems(expanded);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleItem = (itemId) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  const Spinner = () => (
    <div className="spinner-overlay">
      <div className="spinner" />
    </div>
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar-menu ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <img src={mdLogo} alt="MD Logo" className="logo-image" />
        )}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
      </div>

      <div className="menu-items">
        {menuItems.map((item) => {
          const isItemActive = expandedItems.includes(item.id);
          const isItemPathActive = isActive(item.path);
          const hasActiveChild = item.children?.some((child) =>
            isActive(child.path)
          );
          const isHighlighted = isItemPathActive || hasActiveChild;

          return (
            <div key={item.id}>
              <Link to={item.path}
                className={`menu-item-header ${
                  isHighlighted ? "active-header" : ""
                }`}
                onClick={() => {
                  if (item.children.length > 0) {
                    toggleItem(item.id);
                  }
                }}>
                <span
                  className={`menu-item-icon ${isHighlighted ? "active" : ""}`}>
                  {typeof item.icon === "function"
                    ? item.icon(isHighlighted)
                    : item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="menu-item-title">{item.title}</span>
                    {item.children.length > 0 && (
                      <IoIosArrowDown
                        className={`arrow-icon ${
                          expandedItems.includes(item.id) ? "rotated" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </Link>

              {!isCollapsed &&
                expandedItems.includes(item.id) &&
                item.children.length > 0 && (
                  <div className="submenu">
                    {item.children.map((child) => {
                      const isChildActive = isActive(child.path);
                      return (
                        <Link
                          key={child.id}
                          to={child.path}
                          className={`submenu-item ${
                            isChildActive ? "active-rov" : ""
                          }`}>
                          {isChildActive && (
                            <IoIosChevronRight className="submenu-active-indicator" />
                          )}
                          <span className="submenu-item-title">
                            {child.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
            </div>
          );
        })}

        {isLoggingOut && <Spinner />}
        <div
          onClick={handleLogout}
          className="menu-item-header logout-button">
          <span className="menu-item-icon">
           <ExitIcon width={20} height={20} fill="#155EEF" />
          </span>
           {!isCollapsed && <span className="menu-item-title">Çıxış</span>}
         </div>

        <div className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
          {/* qalan sidebar menyu kodları */}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
{
  /* <button
className="menu-item-header logout-button"
onClick={handleLogout}>
<span className="menu-item-icon">
  <ExitIcon width={20} height={20} fill="#155EEF" />
</span>
{!isCollapsed && <span className="menu-item-title">Çıxış</span>}
</button> */
}
