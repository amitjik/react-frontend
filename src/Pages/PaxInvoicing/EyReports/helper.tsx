import type { TableProps } from 'antd';
import dayjs from 'dayjs';

export interface DataType {
    key: number;
    fileName: string;
    status: string;
    fileUrl?: string;
}

export const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Completed on',
        dataIndex: '',
        key: 'completedOn',
        render: (text, record) => {
            console.log(text)
        return dayjs(text.completedOn).format('DD/MM/YYYY HH:mm:ss')
        }
    },
    {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
    },
    {
        title: 'Status',
        dataIndex: 'reportStatus',
        key: 'reportStatus',
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: (text, record) => {
            console.log(text)
        return text?.action && <a href={text.action}>Download</a>
        }
    },

];