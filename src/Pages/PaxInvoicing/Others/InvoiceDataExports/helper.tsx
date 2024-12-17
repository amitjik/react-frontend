import type { TableColumnsType, TableProps } from 'antd';

export interface DataType {
    key: React.Key;
    Parameters: string;
    CreatedOn: string;
    Remarks: string;
    Action: string,
  }

export const columns: TableColumnsType<DataType> = [
    {
      title: 'Parameters',
      dataIndex: 'Parameters',
    },
    {
      title: 'Created On',
      dataIndex: 'CreatedOn',
    },
    {
      title: 'Remarks',
      dataIndex: 'Remarks',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
    },
    
  ];

export const data = [
    {
      Parameters	: 'TransactionDate=16-Oct-2024,InvoiceNumber=,PNR=,Dep=A,Arr=A,StateCode=A,CustomerGSTIN=	',
      CreatedOn	: '16-Oct-2024 10:45:15 AM',
      Remarks:'Data is not available to generate the report. Kindly contact admin.',
      Action: '',
      
    },
]