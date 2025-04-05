import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const getBreadcrumbName = (segment) => {
    switch (segment) {
      case 'patient':
        return 'Xəstə';
      case 'general':
        return 'Ümumi';
      case 'examination':
        return 'Müayinə';
      case 'plans':
        return 'Planlar';
      case 'add-user':
        return 'İşçi əlavə et';
      case 'view-user':
        return 'İşçilər';
      case 'add-patient':
        return 'Xəstə əlavə et';
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    }
  };

  return (
    <nav className="breadcrumb">
      <Link to="/" className="breadcrumb-item">Ana səhifə</Link>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment}>
          <IoIosArrowForward className="breadcrumb-separator" />
          {index === pathSegments.length - 1 ? (
            <span className="breadcrumb-item active">{getBreadcrumbName(segment)}</span>
          ) : (
            <Link 
              to={`/${pathSegments.slice(0, index + 1).join('/')}`} 
              className="breadcrumb-item"
            >
              {getBreadcrumbName(segment)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 