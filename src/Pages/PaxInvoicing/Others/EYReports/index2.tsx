import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection';
import { Button, Form, Select, message, Space, Tabs, Table, Upload, notification, Radio } from 'antd';
import { DownloadOutlined, UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import UploadButton from '../../../../Components/UploadButton'
import type { TabsProps } from 'antd';
import { data, columns, DataType, monthList } from './helper'
import './style.css';
import { useEffect, useState } from 'react';
import api from '../../../../axios';
import Loader from '../../../../Components/Loader';

const { Option } = Select;


// const { Option } = Select;

const EYReports: React.FC = () => {
  const [form] = Form.useForm();
  const [glFileList, setGLFileList] = useState<UploadFile[]>([]);
  const [itRawFileList, setItRawFileList] = useState<UploadFile[]>([]);
  const [reportType, setReportType] = useState<string>('REPORT');
  const [selectMonth, setSelectMonth] = useState<string>('');
  const [reportList, setReportList] = useState<DataType[]>(data || []);
  const [selectActiveKey, setSelectActiveKey] = useState<string>('1');
  const [isUpload, setIsUpload] = useState(false)
  // const [isFileReportGenrate, setIsFileReportGenrate] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // const [currentCount, setCount] = useState(1);



  const handleGLFileChange = (info: { fileList: UploadFile[] }) => {
    setGLFileList(info?.fileList);
  };

  const handleITFileChange = (info: { fileList: UploadFile[] }) => {
    setItRawFileList(info?.fileList);
  };

  const getReports = async (value?: string, month?: string) => {
    try {
      setIsLoading(true)
      const res = await api.get(`/execute/listBlobs?blobfolder=${value}`)
      const res2 = await api.get(`/execute/listBlobs?blobfolder=PROCESSING`)
      if ((res2.status === 200 && res2?.data.length) || month ) {
        setIsProcessing(true)
        setSelectActiveKey('2')
      } else {
        setIsProcessing(false)
        setIsUpload(false)
      }
      // console.log(res);
      if (res.status === 200) {
        // notification.success({
        //   message: 'hello',
        // });
        const dataList: DataType[] = []
        if ((res2.status === 200 && res2?.data.length && value === 'REPORT') || (month && value === 'REPORT')) {
          // console.log(res2?.data, res2?.data?.[0], res2?.data?.[0]?.split('_'), 'file Error')
          const name = res2?.data && res2?.data?.[0]?.split('_')
          const data: DataType = {
            key: 0,
            fileName: month ? `EY_Report_${month}.csv` : `EY_Report_${name[name.length - 3].substring(0, 4)}_${name[name.length - 1]}`,
            fileUrl: '',
            status: 'In Progress'
          }
          dataList.push(data)
        }
        res?.data.forEach((item: string, index: number) => {
          const name = item.split('_');
          const data: DataType = {
            key: index + 1,
            fileName: value === 'REPORT' ? `EY_Report_${name[name.length - 3].substring(0, 4)}_${name[name.length - 1]}` : item,
            fileUrl: value === 'PROCESSING' ? '' : `${process.env.REACT_APP_BACKEND_URI}/execute/download?blobName=${item}&blobFolder=${value}`,
            status: value === 'PROCESSING' ? 'In Progress' : 'Download'
          }
          dataList.push(data)
        })

        setReportList(dataList)
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
    const currentDate = new Date();
    let monthName = monthList[currentDate.getMonth()];
    // console.log(monthName, monthName.value, 'monthname')
    setSelectMonth(monthName.value)
    getReports(reportType)
  }, [])

  // useEffect(()=> {
  //   if (currentCount <= 0) {
  //     return;
  //   }
   
  //   const id = setInterval(timer, 180000);
  //   return () => clearInterval(id);
  // }, [])

  // const timer = () => {
  //   setCount(currentCount + 1);
  //   getReports(reportType)
  // }

  const props = {
    fileList: glFileList,
    accept: '.csv,text/csv',
    beforeUpload: (file: UploadFile) => {
      const isCVS = file.type === '.csv' || file.type === 'text/csv';
      if (!isCVS) {
        message.error('You can only upload CSV file!');
      }
      return isCVS || Upload.LIST_IGNORE;
    },
    onChange: handleGLFileChange
  }

  const itRowProps = {
    fileList: itRawFileList,
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    beforeUpload: (file: UploadFile) => {
      const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXls) {
        message.error('You can only upload Xls  file!');
      }
      return isXls || Upload.LIST_IGNORE;
    },
    onChange: handleITFileChange
  }

  const onMonthChange = (value: string) => {
    setSelectMonth(value)
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
      const res = await api.post(`/execute/upload?month=${selectMonth}`, formData)
      // console.log(res);
      if (res.status === 200) {
        if( res.data === 'File name not valid, moved to the ERROR folder'){
          notification.error({
            message: res.data,
          });
        }else{
          setIsUpload(true)
          notification.success({
            message: res.data,
          });
          const date = new Date();
          let year = date.getFullYear();
          const monthYear = `${year}_${selectMonth}`
          getReports(reportType, monthYear)
          setTimeout(() => {
            setIsProcessing(true)
            setSelectActiveKey('2')
          }, 10000)
        }
        setItRawFileList([])
        setGLFileList([])
        form.resetFields();
        
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

  const onReset = () => {
    form.resetFields();
    setIsUpload(false)
    setItRawFileList([])
    setGLFileList([])

  };

  const onChange = (key: string) => {
    setSelectActiveKey(key)
  };

  const handleReportList = (e: any) => {
    setReportType(e.target.value);
    getReports(e.target.value)
  }

  const handleRefresh = () => {
    setIsProcessing(true)
    setSelectActiveKey('2')
    const currentDate = new Date();
    let monthName = monthList[currentDate.getMonth()];
    // console.log(monthName, monthName.value, 'monthname')
    setSelectMonth(monthName.value)
    getReports(reportType)
  }


  const UploadTab = () => <ContentSection style={{ marginBottom: "20px" }}>
    {isProcessing ? <p style={{ textAlign: 'center' }}>Your Report generation is currently in progress. Please navigate to the Download tab in a few minutes and refresh the page to be able to download it.</p> :
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="month" label="Select Month">
            <Select
              placeholder="Select Month"
              onChange={onMonthChange}
              defaultValue={selectMonth}
              options={monthList}
              allowClear
            />
          </Form.Item>

        </Space>
        <Space className='form-group-item'>
          <Form.Item name="glFile" label="GL">
            <UploadButton title="Click or drag file to this area to upload" desc="Only excel files with .xls and .xlsx can up uploaded. File size cannot be more that 10mb" multiple={true} name="glFile" props={props} />
          </Form.Item>
          <Form.Item name="itRawFile" label="IT Raw Report File">
            <UploadButton title="Click or drag file to this area to upload" desc="Only excel files with .xls and .xlsx can up uploaded. File size cannot be more that 10mb" multiple={true} name="itFile" props={itRowProps} />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn'>
          {isUpload && <p style={{ color: 'green' }}>Your file will take some time to generate. Please come back in some time and navigate to the Download section to download the file.</p>}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" disabled={!(glFileList?.length && itRawFileList?.length && selectMonth) || isLoading}>
                Upload
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>

            </Space>
          </Form.Item>
        </Space>

      </Form>}
  </ContentSection>

  const DownloadTab = () => <ContentSection >
    <div className='tab-buttons'>
      <h3>{reportType}</h3>
      <Radio.Group value={reportType} onChange={handleReportList}>
        {/* <Radio.Button value="reports">Reports</Radio.Button>
        <Radio.Button value="archive">Archive</Radio.Button> */}
        {/* <Radio.Button value="error">Error</Radio.Button> */}
        <Radio.Button value="REPORT">Report</Radio.Button>
        <Radio.Button value="ARCHIVE">Archive</Radio.Button>
        <Radio.Button value="ERROR">Error</Radio.Button>
        {/* <Radio.Button value="RECEIVED">Received</Radio.Button> */}
      </Radio.Group>
    </div>
    <Table columns={columns} dataSource={reportList} />
  </ContentSection>
  // console.log(isProcessing, selectActiveKey,  'isProcessing')
  const items: TabsProps['items'] = [
    {
      label: `Upload`,
      key: '1',
      children: <UploadTab />,
      icon: <UploadOutlined />,
      disabled: isProcessing,
    },
    {
      label: `Download`,
      key: '2',
      children: <DownloadTab />,
      icon: <DownloadOutlined />
    }
  ]
  return (<div className='monthly-report-page'>
    {isLoading && <Loader />}
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="EY Reports"
    />
    <div className='refresh-btn'><Button type="primary" onClick={handleRefresh} > <ReloadOutlined /> Refresh</Button></div>
    <Tabs
      className='ey-report-tab'
      defaultActiveKey={selectActiveKey}
      onChange={onChange}
      type="card"
      items={items}
    />


  </div>)

};

export default EYReports;