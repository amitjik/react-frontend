import React, { useEffect, useState } from 'react';
import { Button, Form, message, Space, notification, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';
import api from '../../../../../axios';
import ContentSection from '../../../../../Components/ContentSection';
import Loader from '../../../../../Components/Loader';
import UploadButton from '../../../../../Components/UploadButton';

interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}

const UploadTab = ({ onNext, current }: UploadInterfaceProps) => {
  const [glFileList, setGLFileList] = useState<UploadFile[]>([]);
  const [itRawFileList, setItRawFileList] = useState<UploadFile[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectMonth, setSelectMonth] = useState<string>('');

  const [form] = Form.useForm();

  // Define accepted file types for validation
  const acceptedFileTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    '.csv',
  ];

  const handleFileChange = (type: 'gl' | 'itRaw') => (info: { fileList: UploadFile[] }) => {
    const setFileList = type === 'gl' ? setGLFileList : setItRawFileList;
    setFileList(info.fileList);
  };

  const validateFileType = (file: any) => {
    if (!acceptedFileTypes.includes(file?.type)) {
      message.error('You can only upload CSV, XLS, or XLSX files!');
      return Upload.LIST_IGNORE;
    }
    return false; // Allow file upload
  };

  const glProps = {
    fileList: glFileList,
    accept: '.csv, text/csv, .xls, .xlsx',
    beforeUpload: validateFileType,
    onChange: handleFileChange('gl'),
  };

  const itRowProps = {
    fileList: itRawFileList,
    accept: '.csv, text/csv, .xls, .xlsx',
    beforeUpload: validateFileType,
    onChange: handleFileChange('itRaw'),
  };

  useEffect(() => {
    const monthName = dayjs().format('MMMM'); // Use dayjs for month formatting
    setSelectMonth(monthName);
  }, []);

  const onReset = () => {
    form.resetFields();
    setGLFileList([]);
    setItRawFileList([]);
  };

  const onFinish = async (values: any) => {
    const fileArr = glFileList.concat(itRawFileList);
    const formData = new FormData();
    fileArr.forEach((file: UploadFile) => {
      formData.append(file.name, file.originFileObj as Blob);
    });

    try {
      setIsLoading(true);
      const res = await api.post(`/execute/upload?date=${dayjs().format('DD-MM-YYYY')}`, formData);
      if (res.status === 200) {
        const { data } = res;
        if (data === 'File name not valid, moved to the ERROR folder') {
          notification.error({
            message: data,
          });
        } else {
          notification.success({
            message: data,
          });
          setIsProcessing(true)
          setGLFileList([]);
          setItRawFileList([]);
          form.resetFields();
          onNext(current + 1);
        }
      }
    } catch (err) {
      console.error('Error occurred during upload:', err);
      notification.error({
        message: 'Error during file upload. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentSection style={{ marginBottom: '20px' }}>
      {isLoading && <Loader />}
      {isProcessing ? (
        <p style={{ textAlign: 'center' }}>
          Your report generation is in progress. Please navigate to the Download tab in a few minutes and refresh the page to download it.
        </p>
      ) : (
        <Form form={form} layout="vertical" name="upload-form" onFinish={onFinish}>
          <Space className="form-group-item" />

          <Space className="form-group-item">
            <Form.Item name="glFile" label="GL File">
              <UploadButton
                title="Click or drag file to this area to upload"
                desc="Only Excel files (.csv, .xls, .xlsx) can be uploaded."
                multiple={true}
                name="glFile"
                props={glProps}
              />
            </Form.Item>

            <Form.Item name="itRawFile" label="SLFE File">
              <UploadButton
                title="Click or drag file to this area to upload"
                desc="Only Excel files (.csv, .xls, .xlsx) can be uploaded."
                multiple={true}
                name="itFile"
                props={itRowProps}
              />
            </Form.Item>
          </Space>

          <Space className="form-group-item form-btn">
            <Form.Item>
              <Space>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!(glFileList.length && itRawFileList.length && selectMonth) || isLoading}
                >
                  Upload
                </Button>
                <Button type="primary" onClick={() => onNext(current + 1)}>
                  Next
                </Button>
              </Space>
            </Form.Item>
          </Space>
        </Form>
      )}
    </ContentSection>
  );
};

export default UploadTab;
