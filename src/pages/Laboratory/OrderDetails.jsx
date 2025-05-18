import React from 'react'
import { useNavigate } from 'react-router-dom'

// Style
import "../../assets/style/LabList/orderdetails.css"

// Icons
import { CiSearch, CiCircleInfo, CiEdit, CiTrash } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { FiDownload } from 'react-icons/fi'
import { HiArrowsUpDown } from 'react-icons/hi2'

function OrderDetails() {
  const navigate = useNavigate()

  const tableHead = [
    'Sifariş tarixi',
    'Həkim',
    'Texnik',
    'Pasiyent',
    'Status'
  ]
  
  const tableKeys = [
    'date',
    'doctor',
    'technician',
    'patient',
    'status'
  ]

  const tableData = [
    {
      date: '06.03.2025',
      doctor: 'Məzahir Əfəndiyev',
      technician: 'Azər Mürsəlov',
      patient: 'Rüstəm Məmmədov',
      status: 'Həkimə göndərilib',
      statusType: 'hakim'
    }
  ]

  const actionIcons = [
    {
      icon: CiCircleInfo,
      action: row => console.log('Info:', row),
      className: 'info-icon'
    },
    {
      icon: CiEdit,
      action: row => navigate(`/lab/order/edit/${row.patient}`),
      className: 'edit-icon'
    },
    {
      icon: CiTrash,
      action: row => console.log('Delete:', row),
      className: 'trash-icon'
    }
  ]

  return (
    <div className="orderDetailsContainer">
      <div className="sentOrdersHeader">
        <div className="leftPartHeader">
          <select>
            <option value="">Hamısı</option>
          </select>
          <div className="searchOrderNow">
            <input type="text" placeholder="Axtarış" />
            <CiSearch className="search-btn" />
          </div>
        </div>
        <div className="rightPartHeader">
          <p
            className="addNowOrder"
            onClick={() => navigate('/lab/order/add')}
          >
            <FaPlus className="plusBTN" /> Yenisini əlavə et
          </p>
          <FiDownload
            className="exportDataNow"
            onClick={() => navigate('/data/export')}
          />
        </div>
      </div>

      <div className="tableWrapper">
        <table className="labTable">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="arrowsIcon" />
                  <span>
                    {tableData.length === 0
                      ? '0'
                      : `1-${tableData.length}`}
                  </span>
                </div>
              </th>
              {tableHead.map((title, i) => (
                <th key={i}>
                  <div className="th-content">
                    <HiArrowsUpDown className="arrowsIcon" />
                    <span>{title}</span>
                  </div>
                </th>
              ))}
              <th>
                <div className="th-content">
                  <HiArrowsUpDown className="arrowsIcon" />
                  <span>Düzəliş</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, ri) => (
              <tr key={ri}>
                <td>{ri + 1}</td>
                {tableKeys.map((key, ci) => {
                  const value = row[key]
                  if (key === 'status') {
                    return (
                      <td key={ci}>
                        <span className={`status ${row.statusType}`}>
                          {value}
                        </span>
                      </td>
                    )
                  }
                  return <td key={ci}>{value}</td>
                })}
                <td className="actions">
                  <div className="actionsWrapper">
                    {actionIcons.map((ico, ii) => (
                      <span
                        key={ii}
                        onClick={() => ico.action(row)}
                        className={ico.className}
                      >
                        {React.createElement(ico.icon, {
                          className: 'icon'
                        })}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderDetails
