import type { TableProps } from 'antd';
import { Button } from 'antd';
import { DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';


export interface DataType {
    key: number;
    fileName: string;
    date:string;
}



export const data: DataType[] = [
    {
        key: 1,
        date: '10-April-2024',
        fileName: 'EY_April_2024',
    },
    {
        key: 2,
        date: '10-May-2024',
        fileName: 'EY_May_2024',
    },
    {
        key: 3,
        date: '10-June-2024',
        fileName: 'EY_June_2024',
    },
    {
        key: 4,
        date: '10-Jyly-2024',
        fileName: 'EY_July_2024',
    },
];

export const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'File Name',
        dataIndex: 'fileName',
        key: 'name',
    },
    {
        title: 'Status',
        dataIndex: '',
        key: 'status',
        render: (value, record) => <div className='action-table-btn'>
            <Button type="link" icon={<DownloadOutlined />} href={'/'}>
                Download
            </Button>
            <Button type="primary" className='secondary-button' icon={<EyeOutlined />} >
                View
            </Button>
            <Button type="primary" className='secondary-button' icon={<CloseCircleOutlined />} >
                Reject
            </Button>
           
            <Button type="primary" className='primary-button' icon={<CheckCircleOutlined />}>
                Approve
            </Button>
        </div>
    },

];