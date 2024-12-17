import PageTitle from '../../../Components/PageTitle';
import { Button, Form, DatePicker, Space, notification, Table } from 'antd';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import ContentSection from '../../../Components/ContentSection';
import api from '../../../axios';
import Loader from '../../../Components/Loader';
import dayjs from 'dayjs';
import {columns} from './helper'
import './style.css';


const EyReports = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false)
  const [selectMonthYear, setSelectMonthYear] = useState(dayjs())
  const [reportList, setReportList] = useState([])
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


  const getdata = async() => {
    setIsLoading(true)

    try {
      const res = await api.get(`https://fp-report-manager-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/report/EY`)

      // console.log(res);
      if (res.status === 200) {
        setReportList(res?.data)
      }
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getdata()
  }, [])

  const onFinish = async (values: any) => {
    const firstDate = values.month.startOf('month').format('YYYY-MM-DD');
    const lastDate = values.month.endOf('month').format('YYYY-MM-DD');

    const data = {
      reportName: "EY",
      reportStatus: "PENDING",
      inputParams: `'${firstDate}'::'${lastDate}'`,
      templateUuid: "184489b3-197a-4e0c-979e-305d762d4080",
    }
    try {
      setIsLoading(true)
      const res = await api.post(`https://fp-report-manager-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/report?createdBy=${decoded?.given_name} ${decoded?.family_name}`, data)

      // console.log(res);
      if (res.status === 200) {
        form.resetFields()
        getdata()
        notification.success({
          message: 'Report Genrate Sussessfully',
        });
        //return res;
      }
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    form.setFieldsValue({ month: selectMonthYear })
    getdata()

  }, [])

  const handleRefresh = () => {
    getdata()
  }



  return (<div className='report-page'>
    {isLoading && <Loader />}
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Reports"
    />
    <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      //style={{ maxWidth: '300px' }}
      >
        <Space className='form-group-item' style={{maxWidth: '300px'}}>
          <Form.Item name="month" label="Month">
            <DatePicker picker="month" defaultValue={selectMonthYear} onChange={(value) => setSelectMonthYear(value)} />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn' style={{ marginTop: '20px' }}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Generate Report
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </ContentSection>
    <ContentSection style={{ marginBottom: "20px" }}>
    <div className='refresh-btn'><Button type="primary" onClick={handleRefresh} > <ReloadOutlined /> Refresh</Button></div>

      <Table bordered columns={columns} dataSource={reportList} rowKey="key" />
    </ContentSection>
  </div>)

};

export default EyReports;