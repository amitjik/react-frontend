import React from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import { Table } from 'antd';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  transactionDate: string;
  count: string;
  fare: string;
  taxable: string;
  cgst: string;
  igst: string;
}

interface ExpandedDataType {
  key: React.Key;
  transactionDate: string;
  fileName: string;
  records: string;
  pnr: string;
  nonTaxable: string;
  taxable: string;
  cgst:string;
  igst:string;
}

const TableComponent: React.FC = () => {
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // const rowSelection2: TableRowSelection<ExpandedDataType> = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   onSelect: (record, selected, selectedRows) => {
  //     console.log(record, selected, selectedRows);
  //   },
  //   onSelectAll: (selected, selectedRows, changeRows) => {
  //     console.log(selected, selectedRows, changeRows);
  //   },
  // };

  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
      { title: 'Import filename', dataIndex: 'fileName', key: 'fileName' },
      { title: 'Records', dataIndex: 'records', key: 'records' },
      { title: 'PNR', dataIndex: 'pnr', key: 'pnr' },
      { title: 'Non Taxable Fare Component', dataIndex: 'nonTaxable', key: 'nonTaxable' },    
      { title: 'Taxable Component', dataIndex: 'taxable', key: 'taxable' },      
      { title: 'CGST Amount', dataIndex: 'cgst', key: 'cgst' },      
      { title: 'IGST Amount', dataIndex: 'igst', key: 'igst' },      

    ];

    const data = [];
    for (let i = 0; i < 2; ++i) {
      data.push({
        key: i.toString(),
        transactionDate: '02-May-2023',
        fileName: 'SLFE_April01.csv',
        records: '02',
        pnr: '302769',
        nonTaxable: '30279',
        taxable: '26601',
        cgst: '1596',
        igst: '0'

      });
    }
    return <Table columns={columns}  dataSource={data} pagination={false}
    //  rowSelection={{ ...rowSelection2 }} 
     />;
  };

  const columns: TableColumnsType<DataType> = [
    // { title: 'Name', dataIndex: 'name', key: 'name' },
    // { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    // { title: 'Version', dataIndex: 'version', key: 'version' },
    // { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    // { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    // { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    // { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
    { title: 'Transaction Date', dataIndex: 'transactionDate', key: 'transactionDate' },
    { title: 'STL-SLFEPNR Count', dataIndex: 'count', key: 'count' },
    { title: 'STL-SLFE Non Taxable Fare Component', dataIndex: 'fare', key: 'fare' },
    { title: 'STL-SLFE Taxable Component', dataIndex: 'taxable', key: 'taxable' },
    { title: 'STL-SLFE IGST Amount', dataIndex: 'igst', key: 'igst' },    
    { title: 'STL-SLFE CGST Amount', dataIndex: 'cgst', key: 'cgst' },    
  ];

  const data: DataType[] = [];
  
  for (let i = 0; i < 5; ++i) {
    data.push({
      key: i.toString(),
      transactionDate: '02-May-2023',
      count: '02',
      fare: '30279',
      taxable: '26601',
      cgst: '1596',
      igst: '1596',
    });
  }

  return (
    <div className='table-section'>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />
    </div>
  );
};

export default TableComponent;