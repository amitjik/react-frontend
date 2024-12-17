import PageTitle from '../../../../../Components/PageTitle';
import ContentSection from '../../../../../Components/ContentSection'
import { Button, Form, Input, Select, Space, DatePicker } from 'antd';
import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TableComponent from './TableComponent'
import dayjs from 'dayjs';
import { ExcelIcon, FilterIcon, RightCircleIcon } from './icon'
import { statausList } from './helper'
import { DataType } from './TableComponent/help'
import api from '../../../../../axios';

import './style.css';
import { useState } from 'react';
const { Option } = Select;

interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}

const EyInvoceApproved = ({ onNext, current }: UploadInterfaceProps) => {
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [selectStatus, setSelectStatus] = useState('APPROVAL PENDING')
  const [selectedRows, setSelectedRows] = useState<DataType[]>([])
  const [form] = Form.useForm();
  const formdata =  form.getFieldsValue();
  console.log(formdata, 'form')

  const getMonthsName = (value:number) => {
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
   return months[value]
  }

  const handleApproval = async() => {
    if(selectedRows.length){
      try{
        const updateStatus = await api.put(`/api/v1/updateStatus?newStatus=Approved&transactionDate=${dayjs(selectedRows[0]?.TransactionDate).format('MM/DD/YYYY')}`)
        if(updateStatus?.status === 200){
          // console.log(updateStatus, 'res.put')
          setSelectedRows([])
          setSelectStatus('APPROVED');
          const formdata =  form.getFieldsValue();
          formdata.reportType = 'APPROVED';
          form.setFieldsValue(formdata)
        }
      }
      catch(error){
        console.log(error)
      }
      
    }
    
  }


  return (<div className='invoice-approved-page'>
    <ContentSection >
      <div className='table-filter'>
        <div className="search-bar">
          <Form
            form={form}
            layout="vertical"
          >
            <Space className='form-group-item'>
              <Form.Item name="month" label="Select Month and Years" rules={[{ required: true }]}>
                <DatePicker picker="month" defaultValue={selectMonthYear} onChange={(value) => setSelectMonthYear(value)} />
              </Form.Item>
              <Form.Item name="reportType" label="Status" rules={[{ required: true }]}>
                <Select
                  placeholder="Status"
                  defaultValue={selectStatus}
                  onChange={(value) => setSelectStatus(value)}
                  allowClear
                  options={statausList}
                />
              </Form.Item>
            </Space>
          </Form>
        </div>
        <div className='right-seaction-bar'>
          <Button type='primary' className='export-add-btn secondary-button' onClick={() => console.log('Approved')}><ExcelIcon /> Export Data</Button>
          <Button type='primary' className='approved-btn primary-button' disabled={selectedRows.length === 0} onClick={() => handleApproval()}><RightCircleIcon /> Approve</Button>


        </div>

      </div>
      <div className='table-section'>
        <TableComponent year={dayjs(selectMonthYear).year().toString()} month={getMonthsName(dayjs(selectMonthYear).month())} status={selectStatus} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      </div>
      <div className='next-btn-section'>
        <Space className='form-group-item form-btn'>
          <Button onClick={() => onNext(current - 1)}>
            Previous
          </Button>
          <Button type="primary" onClick={() => onNext(current + 1)}>
            Next
          </Button>
        </Space>
      </div>
    </ContentSection>

  </div>)

};

export default EyInvoceApproved;