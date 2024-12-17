import { useEffect, useState } from 'react';
import { Button, Form, Select, message, Upload, Space, notification } from 'antd';
import ContentSection from '../../ContentSection';
import UploadButton from '../../UploadButton';
import { UploadFile } from 'antd/es/upload/interface';

interface UploadInterfaceProps {
  FileTypeList: any,
  handleFileUpload: any,
}
const ErrorCorrectionsUpload = ({ FileTypeList, handleFileUpload }: UploadInterfaceProps) => {
  const [form] = Form.useForm();
  const [errorFile, setErrorFile] = useState<UploadFile[]>([]);

  const onFinish = (values: any) => {
    let formData = new FormData()
    const filedata = {
      fileName: errorFile[0].name.split('.')[0],
      file: formData
    }
    handleFileUpload(values, filedata, form, setErrorFile)
    // if (fileUpload.status === 200) {
    //   form.resetFields()
    //   setErrorFile([])
    //   notification.success({
    //     message: 'Upload File Sussessfully',
    //   });
    // }
  };


  const handleErrorFileChange = (info: { fileList: UploadFile[] }) => {
    setErrorFile(info?.fileList);
  };

  const fileProps = {
    fileList: errorFile,
    accept: '.csv,text/csv',
    beforeUpload: (file: UploadFile) => {
      const isCVS = file.type === '.csv' || file.type === 'text/csv';
      if (!isCVS) {
        message.error('You can only upload CSV file!');
        return isCVS || Upload.LIST_IGNORE;
      }
      return false;
      
    },
    onChange: handleErrorFileChange
  }


  return (
    <ContentSection style={{ marginBottom: "20px" }}>
      <h3 className='heading'>Upload Error Corrections</h3>
      <Form
        form={form}
        layout="vertical"
        name="error-upload"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>

          <Form.Item name="fileType" label="File type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              options={FileTypeList}
              allowClear
            />

          </Form.Item>
        </Space>
        <Space className='form-group-item'>
          <Form.Item name="errorFile" label="Upload File">
            <UploadButton className='upload-file-error' title="choose file" desc="" multiple={true} name="glFile" props={fileProps} plusIconVIew={true} />
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
  )

};

export default ErrorCorrectionsUpload;