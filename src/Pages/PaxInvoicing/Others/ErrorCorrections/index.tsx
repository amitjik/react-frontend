import PageTitle from '../../../../Components/PageTitle';
import { Button, Form, DatePicker, Select, message, Upload, Space } from 'antd';
import { useEffect, useState } from 'react';
import { UploadFile } from 'antd/es/upload/interface';
import ContentSection from '../../../../Components/ContentSection';
import UploadButton from '../../../../Components/UploadButton';
import { FileTypeList } from './helper';
import './style.css';
const { Option } = Select;

const ErrorCorrections: React.FC = () => {
  const [form] = Form.useForm();
  const [errorFile, setErrorFile] = useState<UploadFile[]>([]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
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
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Error Corrections (Manual)"
      desc='All fields mentioned are manadatory'
    />
    <ContentSection style={{ marginBottom: "20px" }}>
      <h3 className='heading'>Download</h3>
      <Form
        form={form}
        layout="vertical"
        name="error-download"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="fromDate" label="From Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="toDate" label="To Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="file" label="File type" rules={[{ required: true }]}>
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
      <h3 className='heading'>Upload</h3>
      <Form
        form={form}
        layout="vertical"
        name="error-upload"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="file" label="File type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              //onChange={onGenderChange}
              options={FileTypeList}
              allowClear
            />

          </Form.Item>
        </Space>
        <Space className='form-group-item'>
          <Form.Item name="errorFile" label="File">
            <UploadButton title="Click or drag file to this area to upload" desc="Only excel files with .xls and .xlsx can up uploaded. File size cannot be more that 10mb" multiple={true} name="glFile" props={props} />
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

  </div>)

};

export default ErrorCorrections;