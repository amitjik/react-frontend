import React, { useEffect, useState, useCallback } from 'react';
import { Space, notification, Table, Spin, Checkbox, Modal, Pagination, Button, Tooltip, Popconfirm, Form, Input } from 'antd';
import { CSVLink } from "react-csv";
import ContentSection from './../../../../../../Components/ContentSection';
import Icon, { FilterOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { RightCircleIcon } from './../icon';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';
import Loader from '../../../../../../Components/Loader';
import type { TableColumnsType, CheckboxOptionType, TableProps, CheckboxProps, PaginationProps } from 'antd';
import api from '../../../../../../axios';
import { RecordDataType2, RecordDataType, DataType, columns2, columns, options, columnsAutoCorrection, columnsInvoice, columnsPostInvoice, headers, TabledataProps, TableRowSelection } from './help'
import { monthsName } from './../helper'
// import { render } from '@testing-library/react';
import RejectModal from './RejectModal';
import ReportModal from './ReportModal';


// rowSelection objects indicates the need for row selection


const TableComponent = ({ year, status, selectedRows, setSelectedRows, handleApprovalSetvalue, isErrorMessage, setIsErrorMessage }: TabledataProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState([])
  const [expandedRowData, setExpandedRowData] = useState<any>({});
  const [columnFilter, setColumnFilter] = useState<any>(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [errorInformation, setErrorInformation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoCorrectiondata, setAutoCorrectiondata] = useState<any>(null);
  const [pageNumberCount, setPageNumberCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedErrorType, setSelectedErrorType] = useState('');
  const [isRejectedReasonModal, setIsRejectedReasonModal] = useState(false);
  const [checkedList, setCheckedList] = useState(["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus"]);
  const plainOptions = ["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus"];
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
  const token = sessionStorage.getItem('token') || '';
  const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '', unique_name: 'admin@123' };
  const [form] = Form.useForm();

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

  const getData = async (year: string, status: string) => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getSlfe?status=${status}&year=${year}`
      );
      
      const { data } = response;
  
      if (data?.status) {
        const res = data?.data?.map((item: RecordDataType, index: number) => {
          return {
            key: index + 1,
            transactionMonth: item.transactionMonth,
            SlefData: item,
            GLData: [],
          };
        });
  
        setInvoiceData(res);
        setExpandedRowKeys([]);
        setExpandedRowData({});
        if (selectedRows.length > 0) {
          setSelectedRows([]);
        }
        // Optional: Add success notification
        // notification.success({
        //   message: data?.message,
        // });
  
      } else {
        // Clear data and reset UI state
        setInvoiceData([]);
        setExpandedRowKeys([]);
        setExpandedRowData({});
        if (selectedRows.length > 0) {
          setSelectedRows([]);
        }
  
        // Notify user of error
        if(isErrorMessage){
          notification.error({
            message: data?.message || "Error occurred while fetching data.",
          });
          setIsErrorMessage(true)
        }
        
      }
  
    } catch (err) {
      console.error('An error occurred:', err);
      handleError(err);
      setInvoiceData([]);
      setExpandedRowKeys([]);
      setExpandedRowData({});
      if (selectedRows.length > 0) {
        setSelectedRows([]);
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    getData(year, status)
  }, [year, status])

  

  useEffect(() => {
    // Add the event listener to the body
    const handleBodyClick = (event:any) => {
      event.stopPropagation()
      setColumnFilter(false)
    };
    // const handleRadioClick = (event:any) => {
    //   event.preventDefault();
    //   event.stopPropagation()
    // };
    document.body.addEventListener('click', handleBodyClick);
    // document.querySelectorAll('.ant-checkbox-wrapper').forEach(item => {
    //   item.addEventListener('click', handleRadioClick)
    // })
    // Clean up the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener('click', handleBodyClick);
      // document.querySelectorAll('.ant-checkbox-wrapper').forEach(item => {
      //   item.removeEventListener('click', handleRadioClick)
      // })
    };
  }, []);

  const newColumns = columns.map((item: any) => {
    if (item.key === 'TransactionMonth') {
      return { ...item }
    }
    return { ...item, hidden: !checkedList.includes(item.key as string) }
  });

  const showModal = async (date: any, pageNumber: any, errorType: any) => {
    // setIsModalOpen(true);
    setSelectedDate(date)
    setSelectedErrorType(errorType)
    const index = monthsName.findIndex((month: any) => month === date);
    try {
      setIsLoading(true)
      const type = errorType === 'Auto Corrections' ? 'getAutoCorrectionData' : errorType === 'Pre Invoice Error Count' ? 'getPreInvoiceError' : 'getPostInvoiceError'
      const res = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/${type}?pageNumber=${pageNumber}&pageSize=10&month=${index + 1}/${year}`)
      const errorTypevalue = errorType === 'Auto Corrections' ? 'autocorrection_reason' : errorType === 'Pre Invoice Error Count' ? 'pre_invoice_reason' : 'error_reason'
      const errorInfo = await api.get(`/api/v1/masters/invoiceReasonsDesc?reasonType=${errorTypevalue}`)

      // console.log(res);
      if (res.status === 200 && errorInfo.status === 200) {
        setAutoCorrectiondata(res?.data)
        setErrorInformation(errorInfo?.data)
        setIsModalOpen(true)
        // notification.success({
        //   message: 'Data loaded successfully',
        // });
      }
    } catch (err) {
      console.log('An error occurred:', err);
      handleError(err)
    }
    setIsLoading(false)
  };


  const downloadReports = async (date: any, errorType: string) => {
    // setIsModalOpen(true);
    try {
      setIsLoading(true)
      const index = monthsName.findIndex((month: any) => month === date);
      const type = errorType === 'Auto Corrections' ? 'downloadAutoCorrectionData' : errorType === 'Pre Invoice Error Count' ? 'downloadPreInvoice' : 'downloadPostInvoice'
      const res = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/${type}?month=${index + 1}/${year}`, {
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
      handleError(err)
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
    if (item.key === 'transactionDate') {
      return { ...item }
    }
    return { ...item, hidden: !checkedList.includes(item.key as string) }
  });

  const handleExpand = async (expanded: boolean, record: any) => {
    if (expanded && record?.SlefData?.slfeDataDateWise) {
      try {
        const index = monthsName.findIndex((month: any) => month === record?.transactionMonth);
        if (index === -1) {
          console.error('Invalid month index:', record?.transactionMonth);
          return;
        }
        // Debugging: Log the month index and the formatted date
        const correctionData = await api.get(`https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/getCounters?month=${index + 1}/${year}`);

        if (correctionData.status !== 200) {
          throw new Error('Failed to fetch correction data');
        }
        // debugger;
        console.log(correctionData.data?.data[0], 'correctionData.data?.data')
        const recordData = await Promise.all(record.SlefData.slfeDataDateWise.map(async (item: RecordDataType2, i: number) => {
          return {
            key: `${record.key}${i + 1}`,
            transactionDate: item.transactionDate,
            SlefData: item,
            GLData: [],
            correctionfiledata: correctionData.data?.data[0] || {}
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

  const handleApproval = async () => {
    setIsLoading(true)
    if (selectedRows.length) {

      const index = monthsName.findIndex((month: any) => month === selectedRows[0]?.transactionMonth);

      // Debugging: Log the month index and the formatted date
      const formattedDate = dayjs(year).format('YYYY');
      console.log('Month Index:', index, 'Formatted Date:', formattedDate);

      // Check if index is valid (should not be -1)
      if (index === -1) {
        console.error('Invalid month index:', selectedRows[0]?.transactionMonth);
        return;
      }

      const url = `https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/updateStatus?newStatus=Approved&month=${index + 1}/${formattedDate}&user=${decoded?.given_name} ${decoded?.family_name}`;

      try {
        // Log the full request URL for debugging
        console.log('Request URL:', url);

        const updateStatus = await api.post(url);

        if (updateStatus?.status === 200) {
          // Success: Update state and form
          console.log('Approval Success:', updateStatus);
          setSelectedRows([]);
          handleApprovalSetvalue()
          notification.success({
            message: updateStatus?.data?.message,
          });
        } else {
          // Handle unexpected status
          notification.error({
            message: updateStatus?.data?.message,
          });
        }
      } catch (error: any) {
        handleError(error)
      }
    }
    setIsLoading(false)
  };

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
      const index = monthsName.findIndex((month: any) => month === selectedRows[0]?.transactionMonth);
      const formattedDate = dayjs(year).format('YYYY');
      const status = selectedRows[0]?.SlefData?.invoiceStatus

      const url = `https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/delete-unapproved-slfe?month=${index + 1}/${formattedDate}&status=${status}&reason=${values.reason}&user=${decoded?.given_name} ${decoded?.family_name}`;

      // Debugging: log the URL and parameters to check for any mistakes

      try {
        const deleteRow = await api.delete(url);

        // Log the response to check for errors
        console.log('Response:', deleteRow?.data);

        if (deleteRow?.data?.status) {
          setSelectedRows([]);
          setIsRejectedReasonModal(false)
          form.resetFields()
          getData(year, status)
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
          <span onClick={() => { showModal(record?.transactionMonth, pageNumberCount, 'Auto Corrections') }} style={{ pointerEvents: !data[0]?.correctionfiledata?.AutoCorrectionCount ? 'none' : 'unset' }}>Auto-Corrections Done: {data[0]?.correctionfiledata?.AutoCorrectionCount || 0}</span>
          <span onClick={() => showModal(record?.transactionMonth, pageNumberCount, 'Pre Invoice Error Count')} style={{ pointerEvents: !data[0]?.correctionfiledata?.PreInvoiceErrorCount ? 'none' : 'unset' }}>Pre Invoice Error Count: {data[0]?.correctionfiledata?.PreInvoiceErrorCount || 0}</span>
          <span onClick={() => showModal(record?.transactionMonth, pageNumberCount, 'Post Invoice Error Count')} style={{ pointerEvents: !data[0]?.correctionfiledata?.PostInvoiceErrorCount ? 'none' : 'unset' }}>Post Invoice Error Count: {data[0]?.correctionfiledata?.PostInvoiceErrorCount || 0}</span>


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
    e.stopPropagation()
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onchangePagination: PaginationProps['onChange'] = (page) => {
    setAutoCorrectiondata(null)
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
          return (<div className='' style={{ display: "flex", gap: "5px" }}>{
            record?.autoCorrectionIds.split(',').map((item: any) => {
              const errorObj: any = errorInformation?.find((err: any) => {
                return item === err.acId
              });
              return (<Tooltip placement="top" title={errorObj?.description}>
                <Button>{item}</Button>
              </Tooltip>)
            })

          }</div>)
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
            {/* <Checkbox.Group
              value={checkedList}
              options={plainOptions}
              onChange={onchangeCheckbox}
              style={{ marginBottom: '20px' }}
            /> */}
          </div>
        </div>
        <div className='right-seaction-bar'>
          {/* <Button type='primary' className='export-add-btn secondary-button' onClick={() => console.log('Approved')}><ExcelIcon /> Export Data</Button> */}
          <Popconfirm title={<>
            Are you sure you want to reject this record?<br />
            This file will be deleted permanently.
          </>} okText="Confirm" onConfirm={() => handleDelete()}>
            <Button type='primary' className='approved-btn secondary-button' disabled={selectedRows.length === 0} ><CloseCircleOutlined /> Reject</Button>
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
            disabled: record?.SlefData?.invoiceStatus !== 'Approval Pending',
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
      
      <ReportModal
      handleCancel={handleCancel} 
      downloadReports={downloadReports} 
      selectedErrorType={selectedErrorType} 
      selectedDate={selectedDate} 
      autoCorrectiondata={autoCorrectiondata} 
      isModalOpen={isModalOpen} 
      onchangePagination={onchangePagination} 
      columns={selectedErrorType === 'Auto Corrections' ? columnsAutoCorrectionList() : selectedErrorType === 'Post Invoice Error Count' ? columnsPostInvoiceList() : columnsInvoice} 
      pageNumberCount={pageNumberCount}
      />
      <RejectModal 
        handleReasonCancel={handleReasonCancel} 
        isRejectedReasonModal={isRejectedReasonModal} 
        form={form} 
        onFinish={onFinish}
       />
    </>
  );
};

export default TableComponent;