import type { TableProps } from 'antd';
import { Button } from 'antd';
import { DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

export interface DataTypeFilePassing {
    key: any;
    importFileName: string;
    createdOn: string,
    records: number,
    description:string
  }

  export interface RejectFileDataType {
    key: any;
    month: string;
    fileCount: string,
    fileName: number,
    status: string,
    reason:string,
    modifiedBy:string,
    modifiedAt:string
  }

export const statausList = [
    { value: 'ALL', label: 'All' },
    { value: 'APPROVAL PENDING', label: 'Approval Pending' },
    { value: 'APPROVED', label: 'Approved' },
    { value: 'INVOICEPROGRESS', label: 'Invoice Progress' },
    { value: 'INVOICECOMPLETE', label: 'Invoice Complete' },
    { value: 'FILEPASSING', label: 'File Passing' },
]


export const columnsFilePassing: any = [
    {
      title: 'import File Name',
      dataIndex: 'importFileName',
      key: 'importFileName',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'Records',
      dataIndex: 'records',
      key: 'records',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }
]


export const columnsRejectFile: any = [
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'File Count',
    dataIndex: 'fileCount',
    key: 'fileCount',
  },
  
]

export const expandColumnsRejectFile = [
  {
    title: 'File Name',
    dataIndex: 'fileName',
    key: 'fileName',
  },
  
  {
    title: 'Reason',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: 'ModifiedBy',
    dataIndex: 'modifiedBy',
    key: 'modifiedBy',
  },
  {
    title: 'ModifiedAt',
    dataIndex: 'modifiedAt',
    key: 'modifiedAt',
  },{
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  }
]
