import React, { useEffect, useState } from 'react';
import { Button, Form, Space, message, notification, Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import api from '../../../../../axios';
import Loader from '../../../../../Components/Loader';
import UploadButton from '../../../../../Components/UploadButton';
import ContentSection from '../../../../../Components/ContentSection';
import { BlockList } from 'net';

const CodeShareInvoiceApprove = ({ onNext, current }: { onNext?: (value: number) => void; current?: any }) => {
  const [form] = Form.useForm();
  const [glFileList, setGLFileList] = useState<UploadFile[]>([]);
  const [itRawFileList, setItRawFileList] = useState<UploadFile[]>([]);
  const [isUpload, setIsUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // URL constants
  const REPORT_URL = 'https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob/paxinv-cs-reject';
  const RECEIVE_URL = 'https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob/paxinv-cs-final-receive';
  const UPLOAD_URL = 'https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob';

  // Handle IT File Changes
  const handleITFileChange = (info: { fileList: UploadFile[] }) => {
    setItRawFileList(info?.fileList);
  };

  const getReports = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(REPORT_URL);
      if (res.status === 200 && res?.data?.data.length) {
        setIsProcessing(true);
      } else {
        setIsProcessing(false);
        setIsUpload(false);
      }
    } catch (err) {
      console.error('Error fetching reports:', err);
      notification.error({
        message: 'Network Error',
        description: 'Unable to fetch reports at this time. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  // IT File Upload Validation and File Processing
  const itRowProps = {
    fileList: itRawFileList,
    accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    beforeUpload: async (file: UploadFile) => {
      const isXls = file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXls) {
        message.error('You can only upload .xls and .xlsx files!');
        return Upload.LIST_IGNORE;
      }
      const MAX_FILE_SIZE = 50 * 1024 * 1024;
      if (file?.size > MAX_FILE_SIZE) {
        message.error('File size must be less than 50MB!');
        return Upload.LIST_IGNORE;
      }

      const fileName = file.name || '';
      const fileNameRegex = /^IT Raw Report for [A-Za-z]{3}'\d{2}\(.*\)$/;
      if (fileNameRegex.test(fileName)) {
        message.error(`Invalid file name format. Expected: "IT Raw Report for Oct'24"`);
        return Upload.LIST_IGNORE;
      }

      try {
        setIsLoading(true);
        const res = await api.get(RECEIVE_URL);
        if (res.status === 200 && res?.data?.data.length) {
          const receiveData = res?.data?.data;
          const fileExists = receiveData.includes(fileName);
          if (fileExists) {
            message.error('File has already been uploaded.');
            return Upload.LIST_IGNORE;
          }
        }
      } catch (err) {
        console.error('Error validating file:', err);
        notification.error({
          message: 'Network Error',
          description: 'Unable to validate the file at this time. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
      return false;
    },
    onChange: handleITFileChange,
  };

  // Handle Form Submission
  const onFinish = async (values: any) => {
    const fileArr = [...glFileList, ...itRawFileList];
    const formData = new FormData();

    fileArr.forEach((item: any) => {
      if (item?.originFileObj) {
        formData.append('file', item?.originFileObj); 
      }
    });

    formData.append('container_name', 'paxinv-cs-reject');
    formData.append('file_path', fileArr[fileArr.length - 1]?.name); 

    try {
      setIsLoading(true);
      const res = await api.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        if (res.data?.data === 'File name not valid, moved to the ERROR folder') {
          notification.error({ message: res.data?.data });
        } else {
          setIsUpload(true);
          notification.success({ message: res.data?.data });
          getReports();
          setTimeout(() => setIsProcessing(true), 10000);
        }
        setItRawFileList([]);
        setGLFileList([]);
        form.resetFields();
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      notification.error({
        message: 'Network Error',
        description: 'An error occurred while uploading the files. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Form Reset
  const onReset = () => {
    form.resetFields();
    setIsUpload(false);
    setItRawFileList([]);
    setGLFileList([]);
  };

  return (
    <div className="monthly-report-page">
      {isLoading && <Loader />}

      <ContentSection style={{ marginBottom: '20px' }}>
        {isProcessing ? (
          <div>
            <p style={{ textAlign: 'center' }}>
              Your report generation is in progress. Please check the Download tab in a few minutes and refresh the page to
              download it.
            </p>
            {(onNext) ? <Space className="form-group-item form-btn" style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={() => onNext(current + 1)}>
                Next
              </Button>
            </Space> : ""}
          </div>
        ) : (
          <Form form={form} layout="vertical" name="invoice-approved" onFinish={onFinish}>
            <Space className="form-group-item">
              <Form.Item name="itRawFile" label="IT Raw Report File">
                <UploadButton
                  title="Click or drag file to this area to upload"
                  desc="Only excel files with .xls and .xlsx can be uploaded. File size must not exceed 50MB."
                  multiple={true}
                  name="itFile"
                  props={itRowProps}
                />
              </Form.Item>
            </Space>

            <Space className="form-group-item form-btn">
              {isUpload && (
                <p style={{ color: 'green' }}>
                  Your file is being processed. Please come back later and check the Download section for the file.
                </p>
              )}

              <Form.Item>
                <Space>
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit" disabled={itRawFileList.length === 0 || isLoading}>
                    Upload
                  </Button>
                 {(onNext && current) ? <Button type="primary" onClick={() => onNext(current + 1)}>
                    Next
                  </Button> : ""}
                </Space>
              </Form.Item>
            </Space>
          </Form>
        )}
      </ContentSection>
    </div>
  );
};

export default CodeShareInvoiceApprove;
