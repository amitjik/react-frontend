import type { TableProps } from 'antd';
import gifAnimation from './../../../Assests/images/dot-animation.gif'
import { title } from 'process';

export interface DataType {
  key: number;
  fileName: string;
  status: string;
  fileUrl?: string;
}

export const monthList = [
  { value: 'January ', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' }
]


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

export const stepListData = [
  {
    title: 'Step 1 : Invoice Approve',
  },
  {
    title: 'Step 2 : Upload / Download Error Report',
  },
  {
    title: 'Step 3 : Pending Mails',
  }
]

export const stepListCOdeShare = [
  {
    title: 'Step 1 : Upload file',
  },
  {
    title: 'Step 2 : Invoice Approve',
  },
  {
    title: 'Step 3 : Upload / Download Error Report',
  },
  {
    title: 'Step 4 : Pending Mails',
  }
]
