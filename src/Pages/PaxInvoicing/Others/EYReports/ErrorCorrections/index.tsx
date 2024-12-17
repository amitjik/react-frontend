import PageTitle from '../../../../../Components/PageTitle';
import { Button, Form, DatePicker, Select, message, Upload, Space, notification } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../../../../axios';
import dayjs from 'dayjs';
import { UploadFile } from 'antd/es/upload/interface';
import ContentSection from '../../../../../Components/ContentSection';
import UploadButton from '../../../../../Components/UploadButton';
import { FileTypeList } from './helper';
import Loader from '../../../../../Components/Loader';

import './style.css';
const { Option } = Select;

interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}
const ErrorCorrections = ({ onNext, current }: UploadInterfaceProps) => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [errorFile, setErrorFile] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const onFinish = async(values: any) => {
    console.log(values);
    console.log(values, 'values');
    try {
      setIsLoading(true)

      let formData = new FormData()
      errorFile.forEach((item: any) => {
        formData.append(item?.name, item?.originFileObj)
      })
      console.log('aaaa', formData)
      const filedata  = {
        fileName: errorFile[0].name.split('.')[0],
        file: formData
      }
      const res = await api.post(`/api/v1/uploadfile?fileType=${values.fileType}`, filedata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      } )
      
      // console.log(res);
      if (res.status === 200) {
        form2.resetFields()
        setErrorFile([])
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

  const onFinishDownload = async(values: any) => {
    console.log(values, 'values');
    try {
      setIsLoading(true)
      const res = await api.get(`/v1/downloadReport?endDate=${dayjs(values.fromDate).format('YYYY-MM-DD')}&fileType=${values.fileType}&startDate=${dayjs(values.toDate).format('YYYY-MM-DD')}`)
      // console.log(res);
      if (res.status === 200) {
        form.resetFields()
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

  const handleErrorFileChange = (info: { fileList: UploadFile[] }) => {
    setErrorFile(info?.fileList);
  };

  const props = {
    fileList: errorFile,
    accept: '.csv,text/csv',
    beforeUpload: (file: UploadFile) => {
      const isCVS = file.type === '.csv' || file.type === 'text/csv';
      if (!isCVS) {
        message.error('You can only upload CSV file!');
      }
      return isCVS || Upload.LIST_IGNORE;
    },
    onChange: handleErrorFileChange
  }


  return (<div className='error-report-page'>
      {isLoading && <Loader />}
    <div className='error-content'>
      <ContentSection style={{ marginBottom: "20px" }}>
        <h3 className='heading'>DOWNLOAD Error Report</h3>
        <Form
          form={form}
          layout="vertical"
          name="error-download"
          onFinish={onFinishDownload}
        >
          <Space className='form-group-item'>
            <Form.Item name="fromDate" label="From Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>

          </Space>
          <Space className='form-group-item'>

            <Form.Item name="toDate" label="To Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>

          </Space>
          <Space className='form-group-item'>
            <Form.Item name="fileType" label="File type" rules={[{ required: true }]}>
              <Select
                placeholder="Select Status"
                options={FileTypeList}
                allowClear
              />
            </Form.Item>
          </Space>
          <Space className='form-group-item form-btn'>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Download
                </Button>
              </Space>
            </Form.Item>
          </Space>


        </Form>
      </ContentSection>
      <ContentSection style={{ marginBottom: "20px" }}>
        <h3 className='heading'>Upload Error Corrections</h3>
        <Form
          form={form2}
          layout="vertical"
          name="error-upload"
          onFinish={onFinish}
        >
          {/* <Space className='form-group-item'>
            <Form.Item name="fromDate" label="From Date" rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>

          </Space> */}
          <Space className='form-group-item'>

            <Form.Item name="fileType" label="File type" rules={[{ required: true }]}>
              <Select
                placeholder="Select Status"
                //onChange={onGenderChange}
                options={FileTypeList}
                allowClear
              />

            </Form.Item>
          </Space>
          <Space className='form-group-item'>
            <Form.Item name="errorFile" label="Upload File">
              <UploadButton className='upload-file-error' title="choose file" desc="" multiple={true} name="glFile" props={props} plusIconVIew={true} />
            </Form.Item>
          </Space>
          <Space className='form-group-item form-btn'>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Upload
                </Button>
              </Space>
            </Form.Item>
          </Space>


        </Form>


      </ContentSection>

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

  </div>)

};

export default ErrorCorrections;