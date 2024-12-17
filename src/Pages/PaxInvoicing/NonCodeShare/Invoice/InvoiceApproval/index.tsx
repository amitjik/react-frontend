import { useEffect, useState } from 'react';
import ContentSection from '../../../../../Components/ContentSection'
import { Button, Form, Select, Space, DatePicker, Table, notification } from 'antd';
// import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TableComponent from './TableComponent'
import dayjs from 'dayjs';
import { columnsFilePassing, DataTypeFilePassing, RejectFileDataType, columnsRejectFile, expandColumnsRejectFile } from './helper'
import { DataType } from './TableComponent/help'
import api from '../../../../../axios';

import './style.css';
const { Option } = Select;

interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}

const EyInvoceApproved = ({ onNext, current }: UploadInterfaceProps) => {
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [selectStatus, setSelectStatus] = useState('Approval Pending')
  const [statusList, setStatusList] = useState([])
  const [selectedRows, setSelectedRows] = useState<DataType[]>([])
  const [filePassingDataError, setFilePassingDataError] = useState<DataTypeFilePassing[]>([])
  const [filePassingData, setFilePassingData] = useState<DataTypeFilePassing[]>([])
  const [rejectFileData, setRejectFileDataData] = useState<RejectFileDataType[]>([])


  const [form] = Form.useForm();
  const formdata =  form.getFieldsValue();
  console.log(formdata, 'form')

  const getMonthsName = (value:number) => {
   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
   return months[value]
  }

  const getStatusList = async() => {
    try{
      const res = await api.get(`/api/v1/getinvoicingstatus`)
      if(res?.status === 200){
        // console.log(updateStatus, 'res.put')
        let statausListData:any = [];
        res?.data.map((item:any) => {
          if(item.statusDescription !== "Reject File"){
            item.label = item.statusDescription;
            item.value = item.statusDescription;
            statausListData.push(item)
          }
            
          }
        )
       
        setStatusList(statausListData)
      }
    }
    catch(error){
      console.log(error)
    }

  }

  useEffect(() => {
    getStatusList()
  }, [])

  // const handleApproval = async() => {
  //   if(selectedRows.length){
  //     try{
  //       const updateStatus = await api.put(`/api/v1/updateStatus?newStatus=Approved&transactionDate=${dayjs(selectedRows[0]?.TransactionDate).format('MM/DD/YYYY')}`)
  //       if(updateStatus?.status === 200){
  //         // console.log(updateStatus, 'res.put')
  //         setSelectedRows([])
  //         setSelectStatus('Approved');
  //         const formdata =  form.getFieldsValue();
  //         formdata.reportType = 'Approved';
  //         form.setFieldsValue(formdata)
  //       }
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
      
  //   }
  // }

  // const handleDelete = async() => {
  //   if(selectedRows.length){
  //     try{
  //       const deleteRow = await api.delete(`/api/v1/delete-unapproved-slfe`, {data: selectedRows[0]})
  //       if(deleteRow?.status === 200){
  //         setSelectedRows([])
  //         // console.log(updateStatus, 'res.put')
          
  //         //setSelectStatus('Approved');
  //         //const formdata =  form.getFieldsValue();
  //         //formdata.reportType = 'Approved';
  //         //form.setFieldsValue(formdata)
  //       }
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
      
  //   }
  // }

  const handleSelectStatus = async(value: string) => {
      setFilePassingData([])
      setFilePassingDataError([])
      setSelectStatus(value)
    if(value === 'File Parsing Error' || value === 'File Parsing Sussess'){
      try{
        const res = await api.get(`/api/v1/getAudit`)
        if(res?.status === 200){
          // console.log(updateStatus, 'res.put')
          const successfuldata:DataTypeFilePassing[] = []
          const errordata:DataTypeFilePassing[] = []
          res?.data.forEach((item:DataTypeFilePassing) => {
            if(item.description === "Success"){
              successfuldata.push(item)
            }else{
              errordata.push(item)
            }
          })
          setFilePassingDataError(errordata)
          setFilePassingData(successfuldata)
          setSelectStatus(value);
        }else {
          notification.success({
            message: 'No data Found',
          });
        }
      }
      catch(error){
        console.log(error)
      }
    }
    if (value === 'Reject File') {
      // Fetch the audit data for file parsing status
      try{
      const res = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getDeletedFileStatus?year=${dayjs(selectMonthYear).year()}`);
      
      if (res?.data?.status) {
        setRejectFileDataData(res?.data?.data);
        
      } else {
        notification.success({
          message: 'No data Found',
        });
      }
    }
    catch(error){
      console.log(error)
    }
    } 

  }

  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select dates after today
    return current && current.isAfter(dayjs(), 'month');
  };

  const handleApprovalSetvalue = () => {
    setSelectStatus('Approved');
    const formdata = form.getFieldsValue();
    formdata.reportType = 'Approved';
    form.setFieldsValue(formdata);
  }

  const expandedRowRender = (record:any) => (
    <Table
      bordered
      columns={expandColumnsRejectFile}
      dataSource={record?.fileStatus}
      pagination={false}
    />
  );

  return (<div className='invoice-approved-page'>
    <ContentSection >
      <div className='table-filter'>
        <div className="search-bar">
          <Form
            form={form}
            layout="vertical"
          >
            <Space className='form-group-item'>
              <Form.Item name="month" label="Select Month and Year" rules={[{ required: true }]}>
                <DatePicker allowClear={false} picker="month" defaultValue={selectMonthYear} onChange={(value) => setSelectMonthYear(value)} disabledDate={disabledDate}/>
              </Form.Item>
              <Form.Item name="reportType" label="Status" rules={[{ required: true }]}>
                <Select
                  placeholder="Status"
                  defaultValue={selectStatus}
                  onChange={(value:any) => handleSelectStatus(value)}
                  allowClear
                  options={statusList}
                />
              </Form.Item>
            </Space>
          </Form>
        </div>
        {/* <div className='right-seaction-bar'> */}
          {/* <Button type='primary' className='export-add-btn secondary-button' onClick={() => console.log('Approved')}><ExcelIcon /> Export Data</Button> */}
          {/* <Button type='primary' className='approved-btn secondary-button' disabled={selectedRows.length === 0} onClick={() => handleDelete()}><CloseCircleOutlined /> Reject</Button>
          <Button type='primary' className='approved-btn primary-button' disabled={selectedRows.length === 0} onClick={() => handleApproval()}><RightCircleIcon /> Approve</Button> */}


        {/* </div> */}

      </div>
      <div className='table-section'>
        {selectStatus === 'File Parsing Error' || selectStatus === 'File Parsing Success' ? <div>
          <Table
          bordered
          dataSource={selectStatus === 'File Parsing Error' ? filePassingDataError : filePassingData}
          columns={columnsFilePassing} 
          pagination={false} />
        </div> : selectStatus === 'Reject File' ? <div>
          <Table
            bordered
            dataSource={rejectFileData}
            columns={columnsRejectFile}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
            className='reject-table'
            pagination={false} />
        </div> : <TableComponent handleApprovalSetvalue={handleApprovalSetvalue} year={dayjs(selectMonthYear).year().toString()} month={getMonthsName(dayjs(selectMonthYear).month())} status={selectStatus} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
      }
    
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