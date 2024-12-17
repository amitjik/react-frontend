import React, { useEffect, useState } from 'react';
import { Space, notification, Table, Spin, Checkbox, Modal, Pagination } from 'antd';
// import { CSVLink } from "react-csv";
import dayjs from 'dayjs';
import Loader from '../../../../../../Components/Loader';
import type { TableColumnsType, CheckboxOptionType, TableProps, CheckboxProps, PaginationProps } from 'antd';
import api from '../../../../../../axios';
import { RecordDataType2, RecordDataType, DataType, columns2, columns, options, columnsAutoCorrection } from './help'

type TableRowSelection<T> = TableProps<T>['rowSelection'];



// rowSelection objects indicates the need for row selection
interface TabledataProps {
  year: string,
  month: string,
  status: string,
  selectedRows: any,
  setSelectedRows: any
}

const TableComponent = ({ year, month, status, selectedRows, setSelectedRows }: TabledataProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceData, setInvoiceData] = useState([])
  const [expandedRowData, setExpandedRowData] = useState<any>({});
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoCOrrectiondata, setAutoCOrrectiondata] = useState<any>(null);
  const [pageNumberCount, setPageNumberCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedErrorType, setSelectedErrorType] = useState('');
  const [checkedList, setCheckedList] = useState(["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus"]);
  const plainOptions = ["importFileName", "Records", "PNR", "NonTaxableComponent", "TaxableComponent", "CESSAmount", "CGSTAmount", "IGSTAmount", "SGSTAmount", "UGSTAmount", "InvoiceStatus"];
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;


  const getData = async (month: string, year: string, status: string) => {
    setIsLoading(true)
    try {

      const [SlefDataList, glDataList] = await Promise.all([
        api.get(`/api/v1/getSlfe?status=${status}&month=${month}&year=${year}`),
        api.get(`/api/v1/getGl?month=${month}&year=${year}`)
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

      // console.log(res);
      if (res.status === 200) {
        setAutoCOrrectiondata(res?.data)
        setIsModalOpen(true)
        notification.success({
          message: 'UPload File Sussessfully',
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


  const downloadReports = async (date: any, errorType: any) => {
    // setIsModalOpen(true);
    try {
      setIsLoading(true)
      const type = errorType === 'Auto Corrections' ? 'downloadAutoCorrectionData' : errorType === 'Pre Invoice Error Count' ? 'downloadPreInvoice' : 'downloadPostInvoice'
      const res = await api.get(`/api/v1/${type}?pageNumber=1&pageSize=100&transactionDate=${dayjs(date).format('MM/DD/YYYY')}`)

      // console.log(res);
      if (res.status === 200) {
        // setIsModalOpen(true)
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const contentDisposition = res.headers['Content-Disposition'];
      let fileName = 'downloaded-file.xlsx'; // Default filename
      // Extract the filename from the 'Content-Disposition' header if available
      // if (contentDisposition && contentDisposition.includes('filename')) {
      //   const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      //   if (fileNameMatch.length > 1) {
      //     fileName = fileNameMatch[1]; // Use the extracted filename
      //   }
      // }

      const url = window.URL.createObjectURL(blob); // Create a URL for the blob
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Use extracted or default filename
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
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
      }
    } else {
      // Collapse logic if needed
      setExpandedRowData((prev: any) => {
        const { [record.key]: _, ...rest } = prev;
        return rest;
      });
    }
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
          <span onClick={() => {console.log(pageNumberCount, 'pageNumberCount'); showModal(record?.TransactionDate, pageNumberCount, 'Auto Corrections')}}>Auto-Corrections Done: {data[0]?.correctionfiledata?.AutoCorrectionCount || 0}</span>
          <span onClick={() => showModal(record?.TransactionDate, pageNumberCount, 'Pre Invoice Error Count')}>Pre Invoice Error Count: {data[0]?.correctionfiledata?.PreInvoiceErrorCount || 0}</span>
          <span onClick={() => showModal(record?.TransactionDate, pageNumberCount, 'Post Invoice Error Count')}>Post Invoice Error Count: {data[0]?.correctionfiledata?.PostInvoiceErrorCount || 0}</span>
          <span onClick={() => downloadReports(record?.TransactionDate, 'Auto Corrections')}>Download Auto-Corrections Reports</span>
          <span onClick={() => downloadReports(record?.TransactionDate, 'Pre Invoice Error Count')}>Download Pre Invoice Error Count</span>
          <span onClick={() => downloadReports(record?.TransactionDate, 'Post Invoice Error Count')}>Download Post Invoice Error Count</span>

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

  const onchangeCheckbox = (value: string[]) => {
    // const updateCheckList = ["transactionDate", "TransactionDate"]
    // console.log(updateCheckList, value, [...updateCheckList, ...value])
    setCheckedList([...value] as string[]);
  }

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const onchangePagination: PaginationProps['onChange'] = (page) => {
    setAutoCOrrectiondata(null)
    setPageNumberCount(page);
    showModal(selectedDate, page, selectedErrorType)
  };




  return (

    <>
      {/* <CSVLink data={invoiceData} headers={headers}>
        Download me
      </CSVLink> */}
      {isLoading && <Loader />}
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} style={{ marginRight: '10px' }} >
        All
      </Checkbox>
      <Checkbox.Group
        value={checkedList}
        options={plainOptions}
        onChange={onchangeCheckbox}
        style={{ marginBottom: '20px' }}
      />
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
        <Table dataSource={selectedErrorType === 'Auto Corrections' ? autoCOrrectiondata?.autoCorrectionData : selectedErrorType === 'Pre Invoice Error Count' ? autoCOrrectiondata?.preInvoiceError : autoCOrrectiondata?.postInvoiceError} columns={columnsAutoCorrection} className='autocorrection-table' pagination={false} />
        <Pagination defaultCurrent={pageNumberCount} onChange={onchangePagination} total={autoCOrrectiondata?.totalRecords} style={{ marginTop: '30px' }} />
      </Modal>}
    </>
  );
};

export default TableComponent;