import React, { useEffect, useState } from 'react';
import { Space, notification, Table, Spin, Checkbox, Modal, Pagination, Button, Tooltip, Form, Input, Popconfirm } from 'antd';
import { jwtDecode } from "jwt-decode";
import { CSVLink } from "react-csv";
import Icon, { FilterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {  RightCircleIcon } from './../icon';
import ContentSection from '../../../../../../Components/ContentSection'
import dayjs from 'dayjs';
import Loader from '../../../../../../Components/Loader';
import type { TableColumnsType, CheckboxOptionType, TableProps, CheckboxProps, PaginationProps } from 'antd';
import api from '../../../../../../axios';
import { RecordDataType2, RecordDataType, DataType, columns2, columns, options, columnsAutoCorrection, columnsInvoice, columnsPostInvoice, headers } from './help'
import { render } from '@testing-library/react';

type TableRowSelection<T> = TableProps<T>['rowSelection'];



// rowSelection objects indicates the need for row selection
interface TabledataProps {
  year: string,
  month: string,
  status: string,
  selectedRows: any,
  setSelectedRows: any,
  handleApprovalSetvalue: () => void;
}

const TableComponent = ({ year, month, status, selectedRows, setSelectedRows, handleApprovalSetvalue }: TabledataProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState([])
  const [expandedRowData, setExpandedRowData] = useState<any>({});
  const [columnFilter, setColumnFilter] = useState<any>(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [errorInformation, setErrorInformation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoCOrrectiondata, setAutoCOrrectiondata] = useState<any>(null);
  const [isRejectedReasonModal, setIsRejectedReasonModal] = useState(false);
  const [pageNumberCount, setPageNumberCount] = useState(1);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedErrorType, setSelectedErrorType] = useState('');
  const [checkedList, setCheckedList] = useState(["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus", "GSTAmount"]);
  const plainOptions = ["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus", "GSTAmount"];
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const [form] = Form.useForm();
  const token = sessionStorage.getItem('token') || '';
  const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '', unique_name: 'admin@123' };

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

  const getData = async (month: string, year: string, status: string) => {
    setIsLoading(true)
    try {

      const [SlefDataList, glDataList] = await Promise.all([
        api.get(`/api/v1/getSlfe?status=${status}&month=${month}&year=${year}`),
        api.get(`/api/v1/getGl?month=${month}&year=${year}`),
      ]);

      if (SlefDataList.status === 200 && glDataList.status === 200) {
        const res = SlefDataList.data.slfeData.map((item: RecordDataType, index: number) => {
          const glDataItem = glDataList.data.glData.find((glItem: RecordDataType) => glItem.TransactionDate === item.TransactionDate);
          return {
            key: index + 1,
            TransactionDate: item.TransactionDate,
            SlefData: item,
            GLData: glDataItem
          };
        });
        setInvoiceData(res)
        setExpandedRowKeys([]);
        setExpandedRowData({});
        if (selectedRows.length) {
          setSelectedRows([])
        }
      }

    } catch (err) {
      console.log('An error occurred:', err);
      notification.error({
        message: 'Error Network',
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData(month, year, status)
  }, [month, year, status])

  useEffect(() => {
    // Add the event listener to the body
    const handleBodyClick = (event:any) => {
      event.stopPropagation()
      setColumnFilter(false)
    };
    document.body.addEventListener('click', handleBodyClick);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);

  const newColumns = columns.map((item: any) => {
    if (item?.children) {
      item.children = item?.children && item?.children.map((list: any) => {

        return {
          ...list,
          hidden: !checkedList.includes(list.key as string)
        }
      })
    }
    return { ...item }
  });

  const showModal = async (date: any, pageNumber: any, errorType: any) => {
    // setIsModalOpen(true);
    setSelectedDate(date)
    setSelectedErrorType(errorType)
    try {
      setIsLoading(true)
      const type = errorType === 'Auto Corrections' ? 'getAutoCorrectionData' : errorType === 'Pre Invoice Error Count' ? 'getPreInvoiceError' : 'getPostInvoiceError'
      const res = await api.get(`/api/v1/${type}?pageNumber=${pageNumber}&pageSize=10&transactionDate=${dayjs(date).format('MM/DD/YYYY')}`)
      const errorTypevalue = errorType === 'Auto Corrections' ? 'autocorrection_reason' : errorType === 'Pre Invoice Error Count' ? 'pre_invoice_reason' : 'error_reason'
      const errorInfo = await api.get(`/api/v1/masters/invoiceReasonsDesc?reasonType=${errorTypevalue}`)

      // console.log(res);
      if (res.status === 200 && errorInfo.status === 200) {
        setAutoCOrrectiondata(res?.data)
        setErrorInformation(errorInfo?.data)
        setIsModalOpen(true)
        notification.success({
          message: 'Data loaded successfully',
        });
      }
    } catch (err) {
      console.log('An error occurred:', err);
      // setAutoCOrrectiondata([])
      //   setIsModalOpen(true)
      notification.error({
        message: 'Error Network',
      });
    }
    setIsLoading(false)
  };


  const downloadReports = async (date: any, errorType: string) => {
    // setIsModalOpen(true);
    try {
      setIsLoading(true)
      const type = errorType === 'Auto Corrections' ? 'downloadAutoCorrectionData' : errorType === 'Pre Invoice Error Count' ? 'downloadPreInvoice' : 'downloadPostInvoice'
      const res = await api.get(`/api/v1/${type}?transactionDate=${dayjs(date).format('MM/DD/YYYY')}`, {
        responseType: 'blob', // Set the response type to 'blob'
        headers: {
          'Accept': '*/*',
        }
      })
      // console.log(res);
      if (res.status === 200) {
        // setIsModalOpen(true)

        let fileName = ''; // Default filename
        const contentDisposition = res.headers['content-disposition'];
        if (contentDisposition && contentDisposition.includes('filename')) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (fileNameMatch.length > 1) {
            fileName = fileNameMatch[1]; // Use the extracted filename
          }
        }
        const urlBlob: string = window.URL.createObjectURL(new Blob([res.data]));
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', fileName); // Set the desired file name
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(urlBlob); // Clean up the URL object

        notification.success({
          message: 'Download File Sussessfully',
        });
      }
    } catch (err) {
      console.log('An error occurred:', err);
      notification.error({
        message: 'Error Network',
      });
    }
    setIsLoading(false)
  };

  const handleCancel = () => {
    setPageNumberCount(1)
    setIsModalOpen(false);
    setSelectedDate('')
    setSelectedErrorType('')
    setSelectedErrorType('')
  };

  const newColumns2 = columns2.map((item: any) => {
    if (item?.children) {
      item.children = item?.children && item?.children.map((list: any) => {

        return {
          ...list,
          hidden: !checkedList.includes(list.key as string)
        }
      })
    }
    return { ...item }
  });

  const handleExpand = async (expanded: boolean, record: any) => {
    if (expanded && record?.SlefData?.SlfeGlDataDateWise) {
      try {
        const correctionData = await api.get(`/api/v1/getCounters?transactionDate=${dayjs(record.TransactionDate).format('MM/DD/YYYY')}`);
        // Check for API response validity
        if (correctionData.status !== 200) {
          throw new Error('Failed to fetch correction data');
        }
        console.log(correctionData?.data?.data, 'correctionData.data?.data')
        const recordData = await Promise.all(record.SlefData.SlfeGlDataDateWise.map(async (item: RecordDataType2, i: number) => {
          const glDataItem = record.GLData?.SlfeGlDataDateWise?.[i];
          return {
            key: `${record.key}${i + 1}`,
            transactionDate: item.transactionDate,
            SlefData: item,
            GLData: glDataItem,
            correctionfiledata: correctionData.data || {}
          };
        }));

        setExpandedRowData((prev: any) => ({
          ...prev,
          [record.key]: recordData
        }));
      } catch (err) {
        console.error('Error fetching correction data:', err);
        notification.error({
          message: 'Error fetching correction data',
          description: 'An unexpected error occurred',
        });
      }
    } else {
      // Collapse logic if needed
      setExpandedRowData((prev: any) => {
        const { [record.key]: _, ...rest } = prev;
        return rest;
      });
    }
  }

  const expandedRowRender = (record: any) => {
    const data = expandedRowData[record.key] || [];
    return (
      <>
        <Table
          bordered
          columns={newColumns2}
          dataSource={data}
          pagination={false}
          //scroll={{ x: 5000 }}
          className="expanded-table"
        />
        <div className='correction-data'>
          <span onClick={() => { showModal(record?.TransactionDate, pageNumberCount, 'Auto Corrections') }} style={{ pointerEvents: !data[0]?.correctionfiledata?.AutoCorrectionCount ? 'none' : 'unset' }}>Auto-Corrections Done: {data[0]?.correctionfiledata?.AutoCorrectionCount || 0}</span>
          <span onClick={() => showModal(record?.TransactionDate, pageNumberCount, 'Pre Invoice Error Count')} style={{ pointerEvents: !data[0]?.correctionfiledata?.PreInvoiceErrorCount ? 'none' : 'unset' }}>Pre Invoice Error Count: {data[0]?.correctionfiledata?.PreInvoiceErrorCount || 0}</span>
          <span onClick={() => showModal(record?.TransactionDate, pageNumberCount, 'Post Invoice Error Count')} style={{ pointerEvents: !data[0]?.correctionfiledata?.PostInvoiceErrorCount ? 'none' : 'unset' }}>Post Invoice Error Count: {data[0]?.correctionfiledata?.PostInvoiceErrorCount || 0}</span>


        </div>
      </>
    );
  };

  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows)
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const onchangeCheckbox = (e:any, value:any) => {
    e.stopPropagation()
   
    const newCheckedList = e.target.checked
    ? [...checkedList, value] // Add the value to the checked list
    : checkedList.filter(item => item !== value);
    setCheckedList(newCheckedList as string[]);
  }

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onchangePagination: PaginationProps['onChange'] = (page) => {
    setAutoCOrrectiondata(null)
    setPageNumberCount(page);
    showModal(selectedDate, page, selectedErrorType)
  };


  const columnsAutoCorrectionList = () => {
    const errorId = [
      {
        title: 'AutoCorrection Ids',
        dataIndex: '',
        key: 'autoCorrectionIds',
        render: (text: string, record: any, index: number) => {
          const errorObj: any = errorInformation?.find((item: any) => {
            console.log(item.acId, record?.autoCorrectionIds, record?.autoCorrectionIds === item.acId, 'AAAA')
            return record?.autoCorrectionIds === item.acId
          });
          return <Tooltip placement="top" title={errorObj?.description}>
            <Button>{record?.autoCorrectionIds}</Button>
          </Tooltip>
        }
      },
    ]

    return errorId.concat(columnsAutoCorrection)
  }

  const columnsPostInvoiceList = () => {
    const errorId = [
      {
        title: 'Error Ids	',
        dataIndex: '',
        key: 'errorIds',
        render: (text: string, record: any, index: number) => {
          return (<div className='' style={{ display: "flex", gap: "5px" }}>{
            record?.errorIds.split(',').map((item: any) => {
              console.log(item, 'item>>>>')
              const errorObj: any = errorInformation?.find((err: any) => {
                return item === err.errorReasonId
              });
              return (<Tooltip placement="top" title={errorObj?.errorDescription}>
                <Button>{item}</Button>
              </Tooltip>)
            })

          }</div>)

        }
      },
    ]

    return errorId.concat(columnsPostInvoice)
  }

  const handleApproval = async() => {
    setIsLoading(true)
    if(selectedRows.length){
      try{
        const updateStatus = await api.put(`/api/v1/updateStatus?newStatus=Approved&transactionDate=${dayjs(selectedRows[0]?.TransactionDate).format('MM/DD/YYYY')}&user=${decoded?.given_name} ${decoded?.family_name}`)
        if(updateStatus?.status === 200){
          // console.log(updateStatus, 'res.put')
          setSelectedRows([])
          // setSelectStatus('Approved');
          // const formdata =  form.getFieldsValue();
          // formdata.reportType = 'Approved';
          // form.setFieldsValue(formdata)
          handleApprovalSetvalue()
        }
      }
      catch(error){
        console.log(error)
      }
      
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    setIsRejectedReasonModal(true)
  };

  const handleReasonCancel = async () => {
    setIsRejectedReasonModal(false)
    form.resetFields()
  };

  const onFinish = async (values: any) => {
    setIsLoading(true)

    if (selectedRows.length) {
      const formattedDate = dayjs(year).format('YYYY');
      const status = selectedRows[0]?.SlefData?.invoiceStatus

      const url = `/api/v1/reject-unapproved-slfe-gl?date=${dayjs(selectedRows[0]?.TransactionDate).format('MM/DD/YYYY')}&reason=${values.reason}&user=${decoded?.given_name} ${decoded?.family_name}`;

      // Debugging: log the URL and parameters to check for any mistakes

      try {
        const deleteRow = await api.delete(url);

        // Log the response to check for errors
        console.log('Response:', deleteRow?.data);

        if (deleteRow?.data?.status) {
          setSelectedRows([]);
          setIsRejectedReasonModal(false)
          form.resetFields()
          getData(month, year, status)
          notification.success({
            message: deleteRow?.data?.message,
          });
        } else {
          notification.error({
            message: deleteRow?.data?.message,
          });
        }
      } catch (error: any) {
        handleError(error)
      }
    }
    setIsLoading(false)
  };



  return (

    <>

      {isLoading && <Loader />}
      <div className='table-button-row'>
        <div className='select-columns-section'>
          {/* <CSVLink data={invoiceData} headers={headers}>
        Download me
      </CSVLink> */}
          <Button type='primary' className='column-filter' onClick={(event) => {
            event.stopPropagation()
              setColumnFilter(!columnFilter)
            }}>
            <FilterOutlined /> Select Columns Filter
          </Button>
          <div className={columnFilter ? 'select-columns-list show' : 'select-columns-list'}>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} style={{ marginRight: '10px' }} >
              All
            </Checkbox>
            {plainOptions.map((item, index) => {
        return (
          <Checkbox
            key={index} // Unique key for each checkbox
            checked={checkedList.includes(item)} // Control checked state
            onChange={(e) => onchangeCheckbox(e, item)} // Handle change
          >
            {item}
          </Checkbox>
        );
      })}
          </div>
        </div>
        <div className='right-seaction-bar'>
          {/* <Button type='primary' className='export-add-btn secondary-button' onClick={() => console.log('Approved')}><ExcelIcon /> Export Data</Button> */}
          <Popconfirm title={<>
            Are you sure you want to reject this record?.<br />
            The file will be deleted permanently
          </>} okText="Confirm" onConfirm={() => handleDelete()}>
          <Button type='primary' className='approved-btn secondary-button' disabled={selectedRows.length === 0} onClick={() => handleDelete()}><CloseCircleOutlined /> Reject</Button>
          </Popconfirm>
          <Button type='primary' className='approved-btn primary-button' disabled={selectedRows.length === 0} onClick={() => handleApproval()}><RightCircleIcon /> Approve</Button>


        </div>
      </div>


      <Table
        bordered
        columns={newColumns}
        rowSelection={{
          type: 'radio', // ensures only one row can be selected at a time
          selectedRowKeys: selectedRows.map((row: any) => row.key), // ensure the selected row is highlighted
          getCheckboxProps: (record) => ({
            disabled: record?.SlefData?.InvoiceStatus !== 'Approval Pending',
          }),
          ...rowSelection
        }}
        expandable={{
          expandedRowRender,
          //onExpand: handleExpand,
          expandedRowKeys,
          onExpand: (expanded, record) => {
            handleExpand(expanded, record);
            // Update the expanded row keys
            setExpandedRowKeys(expanded ? [record.key] : []);
          },
        }}
        dataSource={invoiceData}
        //scroll={{ x: 5000 }}
        style={{ marginBottom: '30px' }}
      />
      {isModalOpen && <Modal className="autocorrection-modal" title={selectedErrorType} open={isModalOpen} onCancel={() => handleCancel()} footer={null}>
        <div style={{ display: "flex", justifyContent: "end", marginBottom: '20px' }}>
          {selectedErrorType === 'Auto Corrections' ? <Button type='default' onClick={() => downloadReports(selectedDate, 'Auto Corrections')}>Download Auto-Corrections Reports</Button> : selectedErrorType === 'Pre Invoice Error Count' ? <Button type='default' onClick={() => downloadReports(selectedDate, 'Pre Invoice Error Count')}>Download Pre Invoice Error Count</Button> :
            <Button type='default' onClick={() => downloadReports(selectedDate, 'Post Invoice Error Count')}>Download Post Invoice Error Count</Button>}</div>
        <Table
          bordered
          dataSource={selectedErrorType === 'Auto Corrections' ? autoCOrrectiondata?.autoCorrectionData : selectedErrorType === 'Pre Invoice Error Count' ? autoCOrrectiondata?.preInvoiceError : autoCOrrectiondata?.postInvoiceError}
          columns={selectedErrorType === 'Auto Corrections' ? columnsAutoCorrectionList() : selectedErrorType === 'Post Invoice Error Count' ? columnsPostInvoiceList() : columnsInvoice} className='autocorrection-table' pagination={false} />
        <Pagination defaultCurrent={pageNumberCount} onChange={onchangePagination} total={autoCOrrectiondata?.totalRecords} style={{ marginTop: '30px' }} />
      </Modal>}
      {
        <Modal
          title="Reject Reason"
          onCancel={() => handleReasonCancel()}
          open={isRejectedReasonModal}
          footer={null}
          className="reason-modal"
        >
          <ContentSection >
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Space className='form-group-item'>
                <Form.Item name="reason" label="" rules={[
                  { required: true, message: 'Reason is required' },
                  {
                    max: 150,
                    message: 'Reason cannot exceed 150 characters'
                  },
                  {
                    validator: (_, value) => {
                      if (value && value.startsWith(' ')) {
                        return Promise.reject('Reason cannot start with a space');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}>
                  <Input placeholder='Enter Reason' />
                </Form.Item>

              </Space>
              <Space className='form-group-item'>
                <Form.Item>
                  <Space>

                    <Button type="primary" htmlType="submit" >
                      Submit
                    </Button>
                  </Space>
                </Form.Item>

              </Space>
            </Form>
          </ContentSection>

        </Modal>
      }
    </>
  );
};

export default TableComponent;