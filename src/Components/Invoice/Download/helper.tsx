import type { TableProps } from 'antd';

export interface DataType {
  key: number;
  fileName: string;
  status: string;
  fileUrl?: string;
}


export const data: DataType[] = [
  {
    key: 1,
    fileName: 'EY_April_2024',
    status: 'In Progress'
  },
  {
    key: 2,
    fileName: 'EY_May_2024',
    status: 'In Progress'
  },
  {
    key: 1,
    fileName: 'EY_June_2024',
    fileUrl: 'http://localhost:3000/pax-invoicing/reports/ey-reports',
    status: 'Download'
  },
];

export const columns: TableProps<DataType>['columns'] = [
  {
    title: 'File Name',
    dataIndex: 'fileName',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: '',
    key: 'status',
    render: (value, record) => (record.fileUrl ? <a href={record.fileUrl}>Download</a> : record.status === 'In Progress' ? <>In Progress <div className='loading-dots'><span className="loading__dot"></span><span className="loading__dot"></span><span className="loading__dot"></span></div></> : record.status)
  },

];

