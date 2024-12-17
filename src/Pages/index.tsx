import React, { useEffect, useState } from 'react';
import PageTitle from './../Components/PageTitle';
import { jwtDecode } from "jwt-decode";
import ContentSection from './../Components/ContentSection';
import UploadTab from './PaxInvoicing/CodeShare/Invoice/Upload'
import reportImg from './../Assests/images/report.svg';
import archiveImg from './../Assests/images/archive.svg';
import errorImg from './../Assests/images/error.svg';
import totalImg from './../Assests/images/total.svg';
import InvoiceDoenloadReports from './../Components/Invoice/Download'
import { notification, Modal, Form, Table, Button, Space, DatePicker } from 'antd';
import Loader from './../Components/Loader';
import dayjs from 'dayjs';
import type { TableProps } from 'antd';

import axios from "axios";
import './style.css';


// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

interface ValuesInterface {
  selectedApp: string
}


interface paxStateInterface {
  archiveCount: Number;
  errorCount: Number;
  receiveCount: Number
}
// const { Option } = Select;
//const {instance} = useMsal()


const Dashboard = ({ selectedApp }: ValuesInterface) => {
  const token = sessionStorage.getItem('token') || '';
  const [selectedBlob, setSelectedBlob] = useState('paxinv-cs-archive')
  const [isModalShow, setIsModalShow] = useState(false)
  const [isModalGenrateShow, setIsModalGenrateShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm();
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [reportList, setReportList] = useState([])
  const [paxState, setPaxState] = useState<paxStateInterface>({
    archiveCount: 0,
    errorCount: 0,
    receiveCount: 0
  })

  // const [columnData, setColumnData] = useState<ColumnChartType[]>()
  console.log(token, 'token')
  const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '' };

//  interface DataType {
//     key: number;
//     fileName: string;
//     status: string;
//     fileUrl?: string;
// }

//   const columns: TableProps<DataType>['columns'] = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//     },
//     {
//         title: 'Completed on',
//         dataIndex: 'completedOn',
//         key: 'completedOn',
//     },
//     {
//         title: 'Month',
//         dataIndex: 'month',
//         key: 'month',
//     },
//     {
//         title: 'Status',
//         dataIndex: 'reportStatus',
//         key: 'reportStatus',
//     },
//     {
//         title: 'Action',
//         dataIndex: '',
//         key: 'action',
//         render: (text, record) => {
//             console.log(text)
//         return text?.action && <a href={text.action}>Download</a>
//         }
//     },

// ];
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

  // const getdata = async() => {
  //   setIsLoading(true)

  //   try {
  //     const res = await axios.get(`https://fp-report-manager-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/report/EY`)

  //     // console.log(res);
  //     if (res.status === 200) {
  //       setReportList(res?.data)
  //       getPaxInfo(res?.data.length)
  //     }
  //   } catch (err) {
  //     handleError(err)
  //   }
  //   setIsLoading(false)
  // }

  useEffect(() => {
    if (selectedApp === 'PAXINVOICING-CODE-SHARE') {
      getPaxInfo()
            
    } else {
      setPaxState({
        archiveCount: 0,
        errorCount: 0,
        receiveCount:0,
      })
    }
  }, [selectedApp])

  const getPaxInfo = () => {
    // const { REACT_APP_BACKEND_URI } = process.env;
    try {
      axios.all([
        axios.get(`https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob/cs/counts`),
        // axios.get(`${REACT_APP_BACKEND_URI}/execute/listBlobs?blobfolder=ARCHIVE`),
        // axios.get(`${REACT_APP_BACKEND_URI}/execute/listBlobs?blobfolder=ERROR`)
      ]).then(axios.spread((results: any) => {
        if (results?.status) {
          // const data = {
          //   reportCount: reportCount ? reportCount : paxState.reportCount,
          //   archiveCount: results?.data?.data.archiveCount,
          //   errorCount: results?.data?.data.errorCount,
          //   totalCount: results?.data?.data.errorCount
          // }
          // const updateState = {...paxState, ...data};
          setPaxState(results?.data?.data)
        }
      })).catch(err => {
        handleError(err)
      })
    } catch (err) {
      handleError(err)
    }
  }

  const handleSelectBlob = (value: string) => {
    setSelectedBlob(value)
    // if(value === 'paxinv-cs-reports'){
    //   getdata()
    // }
  }

  // const handleUploadModal = () => {
  //   setIsModalShow(true)
  // }

  // const handleGenrateReportsModal = () => {
  //   setIsModalGenrateShow(true)
  // }

  

  // const handleCancel = () => {
  //   setIsModalShow(false)
  //   setIsModalGenrateShow(false)
  // }

  // const onFinish = async (values: any) => {
  //   const firstDate = values.month.startOf('month').format('YYYY-MM-DD');
  //   const lastDate = values.month.endOf('month').format('YYYY-MM-DD');

  //   const data = {
  //     reportName: "EY",
  //     reportStatus: "PENDING",
  //     inputParams: `'${firstDate}'::'${lastDate}'`,
  //     templateUuid: "184489b3-197a-4e0c-979e-305d762d4080",
  //   }
  //   try {
  //     setIsLoading(true)
  //     const res = await axios.post(`https://fp-report-manager-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/report?createdBy=${decoded?.given_name} ${decoded?.family_name}`, data)

  //     // console.log(res);
  //     if (res.status === 200) {
  //       form.resetFields()
  //       getdata()
  //       notification.success({
  //         message: 'Report Genrate Sussessfully',
  //       });
  //       //return res;
  //     }
  //   } catch (err) {
  //     handleError(err)
  //   }
  //   setIsLoading(false)
  // }

  // const handleRefresh = () => {
  //   getdata()
  // }

  return (<div className='dashboard-page'>
     {isLoading && <Loader />}
    {(selectedApp === 'PAXINVOICING-CODE-SHARE' || selectedApp === 'PAXINVOICING-NON-CODE-SHARE') && <>
      <PageTitle
        className="site-page-header"
        //onBack={() => null}
        // handleUpload={() => handleUploadModal()}
        // handleGenrateReports={() => handleGenrateReportsModal()}
        title={'Dashboard'}
        desc=""
      />
      <div className='dashboard-section pax-list'>
        <div className='dashboard-left-section'>
          <ul className='list-section'>
            {/* <li onClick={() => handleSelectBlob('paxinv-cs-reports')} className={selectedBlob === 'paxinv-cs-reports' ? 'active' : ''}>
              <div className='img-section'>
                <div>
                  <img src={reportImg} alt='report' />
                  <h4>Report</h4>
                </div>
                <h3>{paxState?.reportCount ? paxState?.reportCount.toString() : 0}</h3></div>

            </li> */}
            <li onClick={() => handleSelectBlob('paxinv-cs-archive')} className={selectedBlob === 'paxinv-cs-archive' ? 'active' : ''}>

              <div className='img-section'>
                <div>
                  <img src={archiveImg} alt='report' />
                  <h4>Archive</h4>
                </div>
                <h3>{paxState?.archiveCount ? paxState?.archiveCount.toString() : 0}</h3></div>

            </li>
            <li onClick={() => handleSelectBlob('paxinv-cs-error')} className={selectedBlob === 'paxinv-cs-error' ? 'active' : ''}>

              <div className='img-section'>
                <div>
                  <img src={errorImg} alt='report' />
                  <h4>Error</h4>
                </div> <h3>{paxState?.errorCount ? paxState?.errorCount.toString() : 0}</h3></div>

            </li>
            <li onClick={() => handleSelectBlob('paxinv-cs-final-receive')} className={selectedBlob === 'paxinv-cs-final-receive' ? 'active' : ''}>
              <div className='img-section'>
                <div>
                  <img src={totalImg} alt='report' />
                  <h4>Received</h4>
                </div><h3>{paxState?.receiveCount ? paxState?.receiveCount.toString() : 0}</h3></div>
            </li>
          </ul>
          {/* {selectedBlob === 'paxinv-cs-reports' ? <ContentSection style={{ marginTop: "20px" }} className='report-page'>
            <div className='flex-section'>
            <h3>Report </h3>
            <div className='refresh-btn'><Button type="primary" onClick={handleRefresh} > 
      {/* <ReloadOutlined /> */}
       {/* Refresh</Button></div>
            </div>
    

      <Table bordered columns={columns} dataSource={reportList} rowKey="key" />
    </ContentSection>:  */}
    
          <ContentSection style={{ marginTop: "20px" }}>
            <h3>Report </h3>
            <InvoiceDoenloadReports reportType={selectedBlob} />
          </ContentSection>
          {/* // } */}
        </div>

      </div>
    </>}
    {/* <Modal
      title="Upload File"
      onCancel={() => handleCancel()}
      open={isModalShow}
      footer={null}
      className="upload-modal"
    >
      <UploadTab />
    </Modal>
    <Modal
      title="Upload File"
      onCancel={() => handleCancel()}
      open={isModalGenrateShow}
      footer={null}
      className="upload-modal"
    >
       <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      //style={{ maxWidth: '300px' }}
      >
        <Space className='form-group-item'>
          <Form.Item name="month" label="Month">
            <DatePicker picker="month" defaultValue={selectMonthYear} onChange={(value) => setSelectMonthYear(value)} />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn' style={{ marginTop: '20px' }}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Genrate Report
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </ContentSection>
    </Modal> */}

  </div>)

};

export default Dashboard;