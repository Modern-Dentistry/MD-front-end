// React-Icons
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowForward as IoIosChevronRight } from 'react-icons/io';

// Libraries
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Style
import '../assets/style/sidebar-menu.css';

// Images
import mdLogo from '../assets/images/md-logo.svg';

// Icons 
import DoctorIcon from './sidebar-icons/DoctorIcon.jsx';
import CalendarIcon from './sidebar-icons/CalendarIcon.jsx';
import PatientsIcon from './sidebar-icons/PatientsIcon.jsx';
import WorkDoneIcon from './sidebar-icons/WorkDoneIcon.jsx';
import LaboratoryIcon from './sidebar-icons/LaboratoryIcon.jsx';
import WarehouseIcon from './sidebar-icons/WarehouseIcon.jsx';
import SettingsIcon from './sidebar-icons/SettingsIcon.jsx';
import ExitIcon from './sidebar-icons/ExitIcon.jsx';

const SidebarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      title: 'İşçilər',
      icon: (isActive) => <DoctorIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 11, title: 'İşçilərin siyahısı', path: '/employees' },
        { id: 12, title: 'İşçilərin iş qrafiki', path: '/employee-schedule' },
        { id: 13, title: 'Yeni işçi əlavə et', path: '/employee-add' }
      ]
    },
    {
      id: 2,
      title: 'Randevular',
      path: '/appointments',
      icon: (isActive) => <CalendarIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 21, title: 'Növbə gözləyənlər', path: '/queue' },
        { id: 22, title: 'Bütün Randevular', path: '/appointments' },
        { id: 23, title: 'Yeni Randevu', path: '/appointment/add' },
        { id: 24, title: 'Randevu Kartı', path: '/appointment/card' }
      ]
    },
    {
      id: 3,
      title: 'Pasiyentlər',
      icon: (isActive) => <PatientsIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 31, title: 'Pasiyent Siyahısı', path: '/patients' },
        { id: 32, title: 'Yeni Pasiyent', path: '/patient/add' },
        { id: 33, title: 'Növbə', path: '/queue' }
      ]
    },
    {
      id: 4,
      title: 'Görülmüş işlər',
      path:'reports',
      icon: (isActive) => <WorkDoneIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 41, title: 'Həkim Siyahısı', path: '/employees' },
        { id: 42, title: 'Yeni Həkim', path: '/user/add' }
      ]
    },
    {
      id: 5,
      title: 'Laboratoriya',
      icon: (isActive) => <LaboratoryIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 51, title: 'Göndərilən sifarişlər', path: '/sent-orders' },
        { id: 52, title: 'Gələn sifarişlər', path: '/received-orders' },
        { id: 53, title: 'Texniklər üzrə hesabat', path: '/technicals-report' }
      ]
    },
    {
      id: 6,
      title: 'Anbar əməliyyatları',
      icon: (isActive) => <WarehouseIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 61, title: 'Klinika Anbarı', path: '/stock/clinic' },
        { id: 62, title: 'Kabinet Anbarı', path: '/stock/cabinet' },
        { id: 63, title: 'Medaxil', path: '/stock/import' },
        { id: 64, title: 'Sifarişlər', path: '/stock/order' },
        { id: 65, title: 'Daxilolma', path: '/stock/entry' },
        { id: 66, title: 'Silinmə', path: '/stock/delete' },
        { id: 67, title: 'İstifadə', path: '/stock/usage' }
      ]
    },
    {
      id: 7,
      title: 'Tənzimləmələr',
      icon: (isActive) => <SettingsIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 71, title: 'Müayinələr', path: '/settings/examination' },
        { id: 72, title: 'Rənglər', path: '/settings/color' },
        { id: 73, title: 'Sığorta', path: '/settings/insurance' },
        { id: 74, title: 'Qiymət kateqoriyaları', path: '/settings/price-category' },
        { id: 75, title: 'Diş dəstləri', path: '/settings/dental-set' },
        { id: 76, title: 'Kabinetlər', path: '/settings/cabinet' },
        { id: 77, title: 'Əməliyyat növləri', path: '/operations' },
        { id: 78, title: 'Dişlər', path: '/teeth' },
        { id: 79, title: 'Rənglər', path: '/colors' },
        { id: 80, title: 'İmplantlar', path: '/implants' },
        { id: 81, title: 'İxtisaslar', path: '/specialities' },
        { id: 82, title: 'Keramikalar', path: '/ceramics' },
        { id: 83, title: 'Elmi dərəcələr', path: '/academic-degrees' },
        { id: 84, title: 'Metallar', path: '/metals' },
        { id: 85, title: 'İcazələr', path: '/permissions' },
        { id: 86, title: 'Sifariş statusları', path: '/order-status' },
      ]
    }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const expanded = [];

    menuItems.forEach(item => {
      const hasActiveChild = item.children?.some(child => child.path === currentPath);
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
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    alert('Loged out!')
  };

  return (
    <div className={`sidebar-menu ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && <img src={mdLogo} alt="MD Logo" className="logo-image" />}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
      </div>

      <div className="menu-items">
        {menuItems.map(item => {
          const isItemActive = expandedItems.includes(item.id);
          const isItemPathActive = isActive(item.path);
          const hasActiveChild = item.children?.some(child => isActive(child.path));
          const isHighlighted = isItemPathActive || hasActiveChild;

          return (
            <div key={item.id}>
              <div
                className={`menu-item-header ${isHighlighted ? 'active-header' : ''}`}
                onClick={() => {
                  if (item.children.length > 0) {
                    toggleItem(item.id);
                  }
                }}
              >
                <span className={`menu-item-icon ${isHighlighted ? 'active' : ''}`}>
                  {typeof item.icon === 'function' ? item.icon(isHighlighted) : item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="menu-item-title">{item.title}</span>
                    {item.children.length > 0 && (
                      <IoIosArrowDown
                        className={`arrow-icon ${expandedItems.includes(item.id) ? 'rotated' : ''}`}
                      />
                    )}
                  </>
                )}
              </div>

              {!isCollapsed && expandedItems.includes(item.id) && item.children.length > 0 && (
                <div className="submenu">
                  {item.children.map(child => {
                    const isChildActive = isActive(child.path);
                    return (
                      <Link
                        key={child.id}
                        to={child.path}
                        className={`submenu-item ${isChildActive ? 'active-rov' : ''}`}
                      >
                        {isChildActive && (
                          <IoIosChevronRight className="submenu-active-indicator" />
                        )}
                        <span className="submenu-item-title">{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div className="menu-item-header logout-button" onClick={handleLogout}>
          <span className="menu-item-icon">
            <ExitIcon width={20} height={20} fill="#155EEF" />
          </span>
          {!isCollapsed && <span className="menu-item-title">Çıxış</span>}
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
