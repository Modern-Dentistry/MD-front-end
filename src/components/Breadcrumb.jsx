import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';

const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  const getBreadcrumbName = (segment, index, segments) => {
    // Handle dynamic segments (IDs)
    if (params[segment] || Object.values(params).includes(segment)) {
      const paramKey = Object.keys(params).find(key => params[key] === segment);
      if (paramKey) {
        switch (paramKey) {
          case 'id':
            // Check the context to determine what kind of ID it is
            const context = segments[index - 1];
            switch (context) {
              case 'patient':
                return 'Xəstə #' + segment;
              case 'user':
                return 'İşçi #' + segment;
              case 'employee':
                return 'İşçi #' + segment;
              case 'stock':
                return 'Anbar #' + segment;
              case 'insurance':
                return 'Sığorta #' + segment;
              case 'prescription':
                return 'Reçete #' + segment;
              default:
                return '#' + segment;
            }
          case 'mode':
            return segment === 'view' ? 'Baxış' : 'Redaktə';
          default:
            return segment;
        }
      }
    }

    // Handle static segments
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
      case 'compare-plans':
        return 'Müqayisə';
      case 'stock':
        return 'Anbar';
      case 'clinic':
        return 'Klinika';
      case 'cabinet':
        return 'Kabinet';
      case 'import':
        return 'Medaxil';
      case 'order':
        return 'Sifariş';
      case 'entry':
        return 'Daxilolma';
      case 'delete':
        return 'Silinmə';
      case 'usage':
        return 'İstifadə';
      case 'settings':
        return 'Tənzimləmələr';
      case 'laboratory':
        return 'Laboratoriya';
      case 'employees':
        return 'İşçilər';
      case 'patients':
        return 'Pasiyentlər';
      case 'queue':
        return 'Növbə';
      case 'appointments':
        return 'Randevular';
      case 'employee-schedule':
        return 'İş qrafiki';
      case 'randevu-card':
        return 'Randevu kartı';
      case 'add-new-appointment':
        return 'Yeni randevu';
      case 'receiving-orders':
        return 'Sifarişlərin qəbulu';
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
            <span className="breadcrumb-item active">
              {getBreadcrumbName(segment, index, pathSegments)}
            </span>
          ) : (
            <Link 
              to={`/${pathSegments.slice(0, index + 1).join('/')}`} 
              className="breadcrumb-item"
            >
              {getBreadcrumbName(segment, index, pathSegments)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 