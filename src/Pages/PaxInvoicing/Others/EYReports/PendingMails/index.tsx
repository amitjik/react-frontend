import PageTitle from '../../../../../Components/PageTitle';
import { Button, Form, DatePicker, Select, Space, Table, notification } from 'antd';
import { useEffect, useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import ContentSection from '../../../../../Components/ContentSection';
import api from '../../../../../axios';
import { FileTypeList } from './helper';
import Loader from '../../../../../Components/Loader';

import dayjs from 'dayjs';
import './style.css';
const { Option } = Select;

interface DataType {
  key: React.Key;
  TransactionDate: string;
  PendingMails: number;
}
type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}

const PendingMails = ({ onNext, current }: UploadInterfaceProps) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [pendingMailData, setPendingMailData] = useState<DataType[]>([])



  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const getMonthsName = (value:number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    return months[value]
   }

  const getData = async(month:string, year:string) => {
    try {
        setIsLoading(true)
        const res = await api.get(`/api/v1/getPendingMails?month=${month}&year=${year}`)
        // console.log(res);
        if (res.status === 200) {
            const data = res?.data?.mailList.map((item:DataType, i:number) => {
                item.key = i+1;
                return item
            })
            setPendingMailData(data)
        }
      } catch (err) {
        console.log('An error occurred:', err);
        notification.error({
          message: 'Error Network',
        });
      }
      setIsLoading(false)
}

useEffect(() => {
  const month = getMonthsName(dayjs(selectMonthYear).month())
    getData(month, dayjs(selectMonthYear).year().toString())
}, [selectMonthYear])

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Transition Date',
      dataIndex: 'TransactionDate',
    },
    {
      title: 'Pending Mails',
      dataIndex: 'PendingMails',
    },

  ];



  return (<div>
    {isLoading && <Loader />}
    <ContentSection style={{ marginBottom: "20px" }}>
    <Form
            form={form}
            layout="vertical"
            style={{maxWidth: '300px'}}
          >
            <Space className='form-group-item'>
      <Form.Item name="fromDate" label="From Date">
        <DatePicker picker="month" defaultValue={selectMonthYear} onChange={(value) => setSelectMonthYear(value)}/>
      </Form.Item>
      </Space>
      </Form>
      <Table rowSelection={rowSelection} columns={columns} dataSource={pendingMailData} pagination={false} />
      
    </ContentSection>
    <div className='next-btn-section'>
    <Space className='form-group-item form-btn' style={{ marginTop: '20px' }}>
        <Form.Item>
          <Space>
          <Button onClick={() => onNext(current - 1)}>
          Previous
        </Button>
            <Button type="primary" htmlType="submit">
              Move Mail
            </Button>
          </Space>
        </Form.Item>
      </Space>
    </div>
    

  </div>)

};

export default PendingMails;