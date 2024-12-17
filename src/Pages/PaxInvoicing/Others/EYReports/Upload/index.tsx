import React, { useEffect, useState } from 'react';
import { Button, Form, Select, message, Space, Tabs, Table, Upload, notification, Radio, DatePicker } from 'antd';
import { data, columns, DataType, monthList, stepListData } from '../helper';
import dayjs from 'dayjs';
import { UploadFile } from 'antd/es/upload/interface';
import UploadButton from '../../../../../Components/UploadButton'
import ContentSection from '../../../../../Components/ContentSection';
import Loader from '../../../../../Components/Loader';
import api from '../../../../../axios';


interface UploadInterfaceProps {
    onNext:(value: number)=> void; 
    current:number;
}


const UploadTab = ({onNext, current}: UploadInterfaceProps ) => {
  const [glFileList, setGLFileList] = useState<UploadFile[]>([]);
  const [itRawFileList, setItRawFileList] = useState<UploadFile[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [selectMonth, setSelectMonth] = useState<string>('');
  const [selectDate, setSelectDate] = useState<string>('');
  const [isUpload, setIsUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [form] = Form.useForm();

  const handleGLFileChange = (info: { fileList: UploadFile[] }) => {
    setGLFileList(info?.fileList);
  };

  const handleITFileChange = (info: { fileList: UploadFile[] }) => {
    setItRawFileList(info?.fileList);
  };

  const glProps = {
    fileList: glFileList,
    accept: '.csv,text/csv',
    beforeUpload: (file: UploadFile) => {
      //const isCVS = file.type === '.csv' || file.type === 'text/csv';
      const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === '.csv' || file.type === 'text/csv';
      //if (!isCVS) {
      if (!isXls) {
        message.error('You can only upload Xls and CSV file!');
      }
      //return isCVS || Upload.LIST_IGNORE;
      return isXls || Upload.LIST_IGNORE;
    },
    onChange: handleGLFileChange
  }

  const itRowProps = {
    fileList: itRawFileList,
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    beforeUpload: (file: UploadFile) => {
      const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === '.csv' || file.type === 'text/csv';
      if (!isXls) {
        message.error('You can only upload Xls and CSV  file!');
      }
      return isXls || Upload.LIST_IGNORE;
    },
    onChange: handleITFileChange
  }


  useEffect(() => {
    const currentDate = new Date();
    let monthName = monthList[currentDate.getMonth()];
    console.log(monthName, monthName.value, 'monthname')
    setSelectMonth(monthName.value)
  }, [])

  const onReset = () => {
    form.resetFields();
    setIsUpload(false)
    setItRawFileList([])
    setGLFileList([])

  };

  const onMonthChange = (value: string) => {
    setSelectMonth(value)
  }

  const onDateChange = (value: string) => {
    setSelectDate(value)
  }
  const onFinish = async (values: any) => {
    const fileArr = glFileList.concat(itRawFileList)
    let formData = new FormData()

    fileArr.forEach((item: any) => {
      // console.log(item, 'item')
      formData.append(item?.name, item?.originFileObj
      )

    })
    try {
      setIsLoading(true)
      const res = await api.post(`/execute/upload?date=${dayjs(selectDate).format('DD-MM-YYYY')}`, formData)
      // console.log(res);
      if (res.status === 200) {
        if (res.data === 'File name not valid, moved to the ERROR folder') {
          notification.error({
            message: res.data,
          });
        } else {
          setIsUpload(true)
          notification.success({
            message: res.data,
          });
          // const date = new Date();
          // let year = date.getFullYear();
          // const monthYear = `${year}_${selectMonth}`
          //   getReports(reportType, monthYear)
          //   setTimeout(() => {
          //     setIsProcessing(true)
          //     setSelectActiveKey('2')
          //   }, 10000)
        }
        setItRawFileList([])
        setGLFileList([])
        form.resetFields();
        onNext(current+1)
      }
    } catch (err) {
      console.log('An error occurred:', err);
      setIsUpload(false)
      notification.error({
        message: 'Error Network',
      });
    }
    setIsLoading(false)

  };

  return (<ContentSection style={{ marginBottom: "20px" }}>
    {isLoading && <Loader />}
    {isProcessing ? <p style={{ textAlign: 'center' }}>Your Report generation is currently in progress. Please navigate to the Download tab in a few minutes and refresh the page to be able to download it.</p> :
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="date" label="Select Date">
            {/* <Select
              placeholder="Select Month"
              onChange={onMonthChange}
              defaultValue={selectMonth && selectMonth}
              options={monthList}
              allowClear
            /> */}
            <DatePicker defaultValue={selectDate && selectDate} onChange={onDateChange} needConfirm placeholder="Select Date" />
          </Form.Item>

        </Space>
        <Space className='form-group-item'>
          <Form.Item name="glFile" label="GL File">
            <UploadButton title="Click or drag file to this area to upload" desc="Only excel files with .csv, .xls and .xlsx can up uploaded. File size cannot be more that 10mb" multiple={true} name="glFile" props={glProps} />
          </Form.Item>
          <Form.Item name="itRawFile" label="SLFE File">
            <UploadButton title="Click or drag file to this area to upload" desc="Only excel files with .csv, .xls and .xlsx can up uploaded. File size cannot be more that 10mb" multiple={true} name="itFile" props={itRowProps} />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn'>
          {/* {isUpload && <p style={{ color: 'green' }}>Your file w. Please come back in some time and navigate to the Download section to download the file.</p>} */}

          <Form.Item>
            <Space>
            <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit" disabled={!(glFileList?.length && itRawFileList?.length && selectMonth) || isLoading}>
                Upload
              </Button>
              <Button type="primary" onClick={() => onNext(current+1)}>
                Next
              </Button>

            </Space>
          </Form.Item>
        </Space>

      </Form>}
  </ContentSection>)
}


export default UploadTab;