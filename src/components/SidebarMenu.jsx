import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowForward as IoIosChevronRight } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import '../assets/style/sidebar-menu.css';
import mdLogo from '../assets/images/md-logo.svg';

// React komponentləri olan SVG ikonları import edək
import DoctorIcon from './sidebar-icons/DoctorIcon.jsx';
import CalendarIcon from './sidebar-icons/CalendarIcon.jsx';
import PatientsIcon from './sidebar-icons/PatientsIcon.jsx';
import WorkDoneIcon from './sidebar-icons/WorkDoneIcon.jsx';
import LaboratoryIcon from './sidebar-icons/LaboratoryIcon.jsx';
import WarehouseIcon from './sidebar-icons/WarehouseIcon.jsx';
import SettingsIcon from './sidebar-icons/SettingsIcon.jsx';

const SidebarMenu = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation(); // Cari səhifə yolunu əldə etmək üçün

  // URL-ə uyğun olan menyunun aktiv vəziyyətə gətirilməsi
  React.useEffect(() => {
    const currentPath = location.pathname;
    // Alt elementdə aktiv səhifə var mı yoxlayırıq
    menuItems.forEach(item => {
      const hasActiveChild = item.children.some(child => child.path === currentPath);
      if (hasActiveChild && !expandedItems.includes(item.id)) {
        setExpandedItems(prev => [...prev, item.id]);
      }
    });
  }, [location.pathname]);

  // Ana elementlərin məlumatları - funksiya ilə
  const menuItems = [
    {
      id: 1,
      title: 'İşçilər',
      icon: (isActive) => <DoctorIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 11, title: 'İşçilərin siyahısı', path: '/employees-list' },
        { id: 12, title: 'İşçilərin iş qrafiki', path: '/employee-schedule' },
        { id: 13, title: 'Yeni işçi əlavə et', path: '/add-user' }
      ]
    },
    {
      id: 2,
      title: 'Ümumi təqvim',
      path: '/calendar',
      icon: (isActive) => <CalendarIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 21, title: 'Bütün Randevular', path: '/appointments' },
        { id: 22, title: 'Yeni Randevu', path: '/add-new-appointment' }
      ]
    },
    {
      id: 3,
      title: 'Pasiyentlər',
      path: '/patients',
      icon: (isActive) => <PatientsIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 31, title: 'Pasiyent Siyahısı', path: '/' },
        { id: 32, title: 'Yeni Pasiyent', path: '/' }
      ]
    },
    {
      id: 4,
      title: 'Görülmüş işlər',
      path: '/work-done',
      icon: (isActive) => <WorkDoneIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 41, title: 'Həkim Siyahısı', path: '/' },
        { id: 42, title: 'Yeni Həkim',  path: '/new-patient' }
      ]
    },
    {
      id: 5,
      title: 'Laboratoriya',
      path: '/laboratory',
      icon: (isActive) => <LaboratoryIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 51, title: 'Otaq Siyahısı', path: '/' },
        { id: 52, title: 'Yeni Otaq', path: '/' }
      ]
    },
    {
      id: 6,
      title: 'Anbar əməliyyatları',
      path: '/warehouse',
      icon: (isActive) => <WarehouseIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 61, title: 'Əməliyyat Siyahısı', path: '/' },
        { id: 62, title: 'Yeni Əməliyyat', path: '/' }
      ]
    },
    {
      id: 7,
      title: 'Tənzimləmələr',
      path: '/settings',
      icon: (isActive) => <SettingsIcon width={20} height={20} stroke={isActive ? "#fff" : "#155EEF"} />,
      children: [
        { id: 71, title: 'Gəlirlər', path: '/' },
        { id: 72, title: 'Xərclər', path: '/' }
      ]
    },
    {
      id: 8,
      title: 'Çıxış',
      icon: '🚪',
      children: []
    }
  ];

  // Sidebar-ı yığmaq/açmaq üçün funksiya
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Alt elementləri açıb-bağlamaq üçün funksiya
  const toggleItem = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };
  // Elementin aktiv olub olmadığını yoxlayan funksiya
  const isActive = (path) => location.pathname === path;
  return (
    <div className={`sidebar-menu ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo və yığma/açma düyməsi */}
      <div className="sidebar-header">
        {!isCollapsed && <img src={mdLogo} alt="MD Logo" className="logo-image" />} 
        <button className="toggle-button" onClick={toggleSidebar}>
          {isCollapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
        </button>
      </div>

      {/* Menu elementləri */}
      <div className="menu-items">
        {menuItems.map(item => {
          // İtem aktiv vəziyyətdə olub olmadığını təyin edirik
          const isItemActive = expandedItems.includes(item.id);
          // Ana element özü aktiv mi?
          const isItemPathActive = isActive(item.path);
          // Alt elementlər arasında aktiv olan varmı?
          const hasActiveChild = item.children.some(child => isActive(child.path));
          
          return (
            <div key={item.id} className="menu-item">
              <div 
                className={`menu-item-header ${isItemPathActive || hasActiveChild ? 'active' : ''}`}
                onClick={() => item.children.length > 0 && toggleItem(item.id)}
              >
                <span className={`menu-item-icon ${(isItemActive || isItemPathActive || hasActiveChild) ? 'active' : ''}`}>
                  {typeof item.icon === 'function' ? item.icon(isItemActive || isItemPathActive || hasActiveChild) : item.icon}
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
              
              {/* Alt elementlər */}
              {!isCollapsed && expandedItems.includes(item.id) && item.children.length > 0 && (
                <div className="submenu">
                  {item.children.map(child => {
                    const isChildActive = isActive(child.path);
                    
                    return (
                      <Link 
                        key={child.id} 
                        to={child.path} 
                        className={`submenu-item ${isChildActive ? 'active' : ''}`}
                      >
                        {isChildActive && (
                          <IoIosChevronRight className="submenu-active-indicator" />
                        )}
                        {/* <span className={`submenu-item-icon ${isChildActive ? 'active' : ''}`}>
                          {child.icon}
                        </span> */}
                        <span className="submenu-item-title">{child.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarMenu;