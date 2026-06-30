import React from 'react';
import { Table, Card, Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const PlansTable = ({ data = [], onDelete }) => {
  // Gələn datanı cədvəl formatına çevir
  const tableData = data.flatMap((item) => {
    const { patientPlansDto } = item;
    if (!patientPlansDto) return [];

    const toothNo = patientPlansDto.toothNo ? (Number(patientPlansDto.toothNo) % 10) : '-';
    const categoryName = patientPlansDto.operationOfCategoryDto?.categoryName || '-';
    const partOfTeethIds = patientPlansDto.partOfTeethIds || [];

    // Hər bir partOfTeeth üçün ayrı sətir yarat
    if (partOfTeethIds.length === 0) {
      return [{
        key: item.id,
        id: item.id,
        toothNo,
        categoryName,
        operationName: '-',
        price: '-',
      }];
    }

    return partOfTeethIds.map((part, index) => ({
      key: `${item.id}-${index}`,
      id: item.id,
      toothNo,
      categoryName,
      operationName: part.operationName || '-',
      price: part.price || 0,
    }));
  });

  const handleDelete = async (record) => {
    if (onDelete) {
      await onDelete(record.id);
    }
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
      title: 'Əməliyyat',
      dataIndex: 'operationName',
      key: 'operationName',
    },
    {
      title: 'Qiymət',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      align: 'right',
      render: (price) => {
        if (price === '-' || price === 0) return '-';
        return `${price} ₼`;
      },
    },
    {
      title: 'Əməliyyat',
      key: 'action',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <Popconfirm
          title="Bu əməliyyatı silmək istədiyinizə əminsiniz?"
          onConfirm={() => handleDelete(record)}
          okText="Bəli"
          cancelText="Xeyr"
          placement="left"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
          >
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card title="Plan Əməliyyatları">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        size="small"
        bordered
      />
    </Card>
  );
};

export default PlansTable;

