import { useEffect, useState, useCallback } from 'react';
import PageTitle from '../../../../../Components/PageTitle';

import ContentSection from '../../../../../Components/ContentSection'
import { Button, Form, Select, Space, DatePicker, Table, notification, message } from 'antd';
// import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import TableComponent from './TableComponent'
import dayjs from 'dayjs';
import { ExcelIcon, FilterIcon, RightCircleIcon } from './icon'
import { columnsFilePassing, DataTypeFilePassing, monthsName, RejectFileDataType, columnsRejectFile, expandColumnsRejectFile } from './helper'
import { DataType } from './TableComponent/help'
import api from '../../../../../axios';

import './style.css';
const { Option } = Select;

interface UploadInterfaceProps {
  onNext?: (value: number) => void;
  current?: number;
}

const EyInvoceApproved = ({ onNext, current }: UploadInterfaceProps) => {
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [selectStatus, setSelectStatus] = useState('Approval Pending')
  const [statusList, setStatusList] = useState<any>([])
  const [selectedRows, setSelectedRows] = useState<DataType[]>([])
  const [filePassingDataError, setFilePassingDataError] = useState<DataTypeFilePassing[]>([])
  const [filePassingData, setFilePassingData] = useState<DataTypeFilePassing[]>([])
  const [rejectFileData, setRejectFileDataData] = useState<RejectFileDataType[]>([])
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  const [form] = Form.useForm();
  const formdata = form.getFieldsValue();
  console.log(formdata, 'form')

  // const getMonthsName = (value: number) => {
  //   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  //   return months[value]
  // }


  const handleError = (error: any) => {
    if (error.response) {
      // API-specific errors (e.g., 400, 500 responses)
      console.error('API error:', error.response);
      notification.error({
        message: `${error.response.data.message || 'Something went wrong'}`,
      });
    } else if (error.request) {
      // No response received from the server
      console.error('No response received:', error.request);
      notification.error({
        message: 'Network error: No response from the server.',
      });
    } else {
      // Any other error (e.g., invalid setup or unexpected issue)
      console.error('Unexpected error:', error.message);
      notification.error({
        message: `Unexpected error: ${error.message}`,
      });
    }
  }

  const getStatusList = useCallback(async () => {
    try {
      // Make the API request
      const res = await api.get('https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getinvoicingstatus');

      // Check if the response has the expected data
      if (res?.data?.status) {
        // Map through the data to build the list
        const statusListData = res.data.data.map((item: any) => ({
          label: item.statusDescription,
          value: item.statusDescription,
        }));

        // Default status to prepend
        // const defaultStatus = [{
        //   label: "File Parsing Success",
        //   value: "File Parsing Success"
        // }];

        // Combine the default status with the fetched list
        const combinedStatusList = [...statusListData];

        // Update the status list state
        setStatusList(combinedStatusList);

        // notification.success({
        //   message: res?.data?.message,
        // });
      } else {
        notification.error({
          message: res?.data?.message,
        });
      }
    } catch (error: any) {
      // Handle network or request errors
      handleError(error);
    }
  }, [statusList]);

  useEffect(() => {
    if(!statusList.length){
      getStatusList()
    }
    
  }, [!statusList])

  const handleSelectStatus = async (value: string) => {
    setFilePassingData([]);
    setFilePassingDataError([]);
    setSelectStatus(value);
    setIsErrorMessage(true)
    try {
      if (value === 'File Parsing Error' || value === 'File Parsing Success') {
        // Fetch the audit data for file parsing status
        const res = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getAudit`);
        
        if (res?.data?.status) {
          // Split data based on description value (Success or Error)
          const { successfuldata, errordata } = res.data?.data.reduce(
            (acc: any, item: DataTypeFilePassing) => {
              if (item.description === "Success") {
                acc.successfuldata.push(item);
              } else {
                acc.errordata.push(item);
              }
              return acc;
            },
            { successfuldata: [], errordata: [] }
          );

          // Update states with the parsed data
          setFilePassingData(successfuldata);
          setFilePassingDataError(errordata);
          // notification.success({
          //   message: res?.data?.message,
          // });
        } else {
          notification.success({
            message: res?.data?.message,
          });
        }
      } 
      if (value === 'Reject File') {
        // Fetch the audit data for file parsing status
        const res = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getDeletedFileStatus?year=${dayjs(selectMonthYear).year()}`);
        
        if (res?.data?.status) {
          setRejectFileDataData(res?.data?.data);
          
        } else {
          notification.success({
            message: res?.data?.message,
          });
        }
      } 
    } catch (error: any) {
      // Log the error to the console for debugging
      console.error('Error in handleSelectStatus:', error);
      // Handle different types of errors for better feedback
      handleError(error)
    }
  };

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


  console.log(selectStatus, 'selectStatus')
  return (<div className='invoice-approved-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Invoice Approve"
    />
    <ContentSection >
      <div className='table-filter'>
        <div className="search-bar">
          <Form
            form={form}
            layout="vertical"
          >
            <Space className='form-group-item'>
              <Form.Item name="month" label="Select Year" rules={[{ required: true }]}>
                <DatePicker allowClear={false} picker="year" defaultValue={selectMonthYear} onChange={(value) => {
                  setIsErrorMessage(true)
                  setSelectMonthYear(value)
                }} disabledDate={disabledDate} />
              </Form.Item>
              <Form.Item name="reportType" label="Status" rules={[{ required: true }]}>
                <Select
                  placeholder="Status"
                  defaultValue={selectStatus}
                  onChange={(value: any) => handleSelectStatus(value)}
                  allowClear={false}
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
        </div> : <TableComponent handleApprovalSetvalue={handleApprovalSetvalue} year={dayjs(selectMonthYear).year().toString()} status={selectStatus} selectedRows={selectedRows} setSelectedRows={setSelectedRows} isErrorMessage={isErrorMessage} setIsErrorMessage={setIsErrorMessage}/>
        }

      </div>
      {/* <div className='next-btn-section'> */}
        {/* <Space className='form-group-item form-btn'> */}
          {/* <Button onClick={() => onNext(current - 1)}>
            Previous
          </Button> */}
          {/* <Button type="primary" onClick={() => onNext(current + 1)}>
            Next
          </Button> */}
        {/* </Space> */}
      {/* </div> */}
    </ContentSection>

  </div>)

};

export default EyInvoceApproved;