import React, { useState, useEffect, useMemo } from 'react';
import { Table, Card, Button, Popconfirm, message, Space } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';

const PlansTable = ({ data = [], onDelete, onSelectionChange, onConfirmSelection, externalSelectedRowKeys = null }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  // Gələn datanı cədvəl formatına çevir - yalnız dişlər (ana sətirlər)
  // Yeni format: { key, patientPlanId, categoryId, categoryName, categoryCode, toothNo, details: [{ id, partOfToothId, operationName, price }] }
  const tableData = useMemo(() => {
    return data.map((item) => ({
      key: item.patientPlanId,
      id: item.patientPlanId,
      toothNo: item.toothNo ? (Number(item.toothNo) % 10) : '-',
      categoryName: item.categoryName || '-',
      categoryCode: item.categoryCode || '-',
      details: item.details || [],
      // Tüm details'lerin id-lərini topla
      allPartIds: (item.details || []).map(d => d.id).filter(Boolean),
    }));
  }, [data]);

  // External selectedRowKeys dəyişdikdə state-i yenilə
  useEffect(() => {
    if (externalSelectedRowKeys !== null) {
      if (externalSelectedRowKeys.length > 0) {
        // External selection varsa, onu istifadə et
        // External keys detail keys olabilir, bunları diş key'lerine çevir
        const toothKeys = externalSelectedRowKeys
          .map(key => {
            // Eğer detail key ise (format: patientPlanId-index), parent key'i al
            if (typeof key === 'string' && key.includes('-')) {
              const parts = key.split('-');
              if (parts.length > 1) {
                // Son kısmı index olabilir, parent key'i al
                const possibleParentKey = parts.slice(0, -1).join('-');
                // Eğer bu bir diş key'i ise döndür
                if (tableData.find(t => t.key === possibleParentKey)) {
                  return possibleParentKey;
                }
              }
            }
            // Direkt diş key'i ise
            return key;
          })
          .filter((key, index, self) => self.indexOf(key) === index); // Unique
        
        setSelectedRowKeys(toothKeys);
        const externalRows = tableData.filter(row => toothKeys.includes(row.key));
        setSelectedRows(externalRows);
      } else {
        setSelectedRowKeys([]);
        setSelectedRows([]);
      }
    } else {
      setSelectedRowKeys([]);
      setSelectedRows([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalSelectedRowKeys, tableData]);

  const handleDelete = async (record) => {
    if (onDelete) {
      await onDelete(record.id);
    }
  };

  // Detail'e tıklandığında - tüm details'leri seç
  const handleDetailClick = (record) => {
    if (!selectedRowKeys.includes(record.key)) {
      const newSelectedKeys = [...selectedRowKeys, record.key];
      const newSelectedRows = [...selectedRows, record];
      setSelectedRowKeys(newSelectedKeys);
      setSelectedRows(newSelectedRows);
      
      // Parent'a bildir
      if (onSelectionChange) {
        const selectedIds = [...new Set(newSelectedRows.map(row => row.id))];
        onSelectionChange(selectedIds, newSelectedRows);
      }
    }
  };

  // Seçim dəyişdikdə id-ləri parent-a göndər
  const handleSelectionChange = (selectedKeys, selectedRowsData) => {
    setSelectedRowKeys(selectedKeys);
    setSelectedRows(selectedRowsData);
    
    // Seçilmiş dişlərin tüm details'lerini topla
    const allSelectedDetails = [];
    selectedRowsData.forEach(row => {
      if (row.details && row.details.length > 0) {
        allSelectedDetails.push(...row.details.map(detail => ({
          ...row,
          operationName: detail.operationName,
          price: detail.price,
          partOfToothId: detail.partOfToothId,
          partId: detail.id,
        })));
      }
    });
    
    if (onSelectionChange) {
      // Seçilmiş dişlərin id-lərini göndər
      const selectedIds = [...new Set(selectedRowsData.map(row => row.id))];
      onSelectionChange(selectedIds, allSelectedDetails);
    }
  };

  // Təsdiq buttonuna basıldıqda
  const handleConfirmSelection = () => {
    // Seçilmiş dişlərin tüm details'lerini topla
    const allSelectedDetails = [];
    selectedRows.forEach(row => {
      if (row.details && row.details.length > 0) {
        allSelectedDetails.push(...row.details.map(detail => ({
          ...row,
          operationName: detail.operationName,
          price: detail.price,
          partOfToothId: detail.partOfToothId,
          partId: detail.id,
        })));
      }
    });
    
    const selectedIds = [...new Set(selectedRows.map(row => row.id))];
    if (onConfirmSelection) {
      onConfirmSelection(selectedIds, allSelectedDetails);
    }
  };

  // rowSelection konfiqurasiyası - yalnız ana sətirlər (dişlər) seçilə bilər
  const rowSelection = {
    selectedRowKeys: selectedRowKeys || [],
    onChange: handleSelectionChange,
    getCheckboxProps: (record) => ({
      // Yalnız ana sətirlər seçilə bilər (details deyil)
      disabled: false,
    }),
  };

  const columns = [
    {
      title: 'Diş Nömrəsi',
      dataIndex: 'toothNo',
      key: 'toothNo',
      width: 120,
      align: 'center',
    },
    {
      title: 'Kateqoriya',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
    },
    {
      title: 'Əməliyyat adı',
      key: 'operationName',
      width: 200,
      align: 'center',
      render: (_, record) => {
        return record.details?.[0]?.operationName || '-';
      },
    },
    {
      title: 'Əməliyyat Sayı',
      key: 'operationCount',
      width: 150,
      align: 'center',
      render: (_, record) => {
        return record.details?.length || 0;
      },
    },
    {
      title: 'Ümumi Qiymət',
      key: 'totalPrice',
      width: 120,
      align: 'right',
      render: (_, record) => {
        const totalPrice = (record.details || []).reduce((sum, detail) => sum + (detail.price || 0), 0);
        return totalPrice > 0 ? `${totalPrice} ₼` : '-';
      },
    }
  ];

  // Expandable row render - details'leri tree olaraq göstər
  const expandedRowRender = (record) => {
    if (!record.details || record.details.length === 0) {
      return <div style={{ padding: '8px 16px', color: '#999' }}>Əməliyyat yoxdur</div>;
    }

    return (
      <div style={{ padding: '8px 16px', backgroundColor: '#fafafa' }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>
          Diş Parçaları:
        </div>
        <div style={{ paddingLeft: '16px' }}>
          {record.details.map((detail, index) => (
            <div
              key={detail.id || index}
              onClick={() => handleDetailClick(record)}
              style={{
                padding: '8px',
                marginBottom: '4px',
                backgroundColor: selectedRowKeys.includes(record.key) ? '#e6f7ff' : '#fff',
                border: selectedRowKeys.includes(record.key) ? '1px solid #91d5ff' : '1px solid #e8e8e8',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!selectedRowKeys.includes(record.key)) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (!selectedRowKeys.includes(record.key)) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>
                    {detail.operationName || '-'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                    Parça ID: {detail.partOfToothId || '-'}
                  </div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                  {detail.price > 0 ? `${detail.price} ₼` : '-'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Seçilmiş dişlərin tüm details sayını hesabla
  const totalSelectedDetails = selectedRows.reduce((sum, row) => {
    return sum + (row.details?.length || 0);
  }, 0);

  return (
    <Card title="Plan Əməliyyatları">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
        pagination={false}
        size="small"
        bordered
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: (expanded, record) => {
            if (expanded) {
              setExpandedRowKeys([...expandedRowKeys, record.key]);
            } else {
              setExpandedRowKeys(expandedRowKeys.filter(key => key !== record.key));
            }
          },
          onExpandedRowsChange: setExpandedRowKeys,
        }}
      />
      
      {/* Table-in altında təsdiq buttonu - yalnız seçim edildikdə görünsün */}
      {selectedRowKeys.length > 0 && (
        <div className="mt-4 flex justify-start">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleConfirmSelection}
            size="large"
          >
            Təsdiqlə ({selectedRowKeys.length} diş, {totalSelectedDetails} əməliyyat)
          </Button>
        </div>
      )}
    </Card>
  );
};

export default PlansTable;

