import { Button, Space, notification } from 'antd';
import { useState } from 'react';
import api from '../../../../../axios';
import dayjs from 'dayjs';
import ErrorCorrectionsDownload from './../../../../../Components/Invoice/ErrorDownload';
import ErrorCorrectionsUpload from './../../../../../Components/Invoice/ErrorUpload'
import { FileTypeList } from './helper';
import Loader from '../../../../../Components/Loader';
import './style.css';


interface UploadInterfaceProps {
  onNext: (value: number) => void;
  current: number;
}
const ErrorCorrections = ({ onNext, current }: UploadInterfaceProps) => {
  const [isLoading, setIsLoading] = useState(false)

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
  const handleFileUpload = async (values: any, filedata: any, form:any, setErrorFile:any) => {
    try {
      setIsLoading(true)
      const res = await api.post(`/api/v1/uploadfile?fileType=${values.fileType}`, filedata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // console.log(res);
      if (res.status === 200) {
        form.resetFields()
        setErrorFile([])
        notification.success({
          message: 'UPload File Sussessfully',
        });
        setIsLoading(false)
       
      }
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  };

  const handleFileDownload = async (values: any, form:any) => {
    console.log(values, 'values');
    try {
      setIsLoading(true)
      const res = await api.get(`/api/v1/downloadReport?fileType=${values.fileType}&startDate=${dayjs(values.startDate).format('MM/DD/YYYY')}&endDate=${dayjs(values.endDate).format('MM/DD/YYYY')}`, {
        responseType: 'blob', // Set the response type to 'blob'
        headers: {
          'Accept': '*/*',
        }
      })
      // console.log(res);
      if (res.status === 200) {
        notification.success({
          message: 'Download File Sussessfully',
        });
        let fileName = ''; // Default filename
        const contentDisposition = res.headers['content-disposition'];
        if (contentDisposition && contentDisposition.includes('filename')) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (fileNameMatch.length > 1) {
            fileName = fileNameMatch[1]; // Use the extracted filename
          }
        }
        const urlBlob: string = window.URL.createObjectURL(new Blob([res.data]));
        const link: HTMLAnchorElement = document.createElement('a');
        link.href = urlBlob;
        link.setAttribute('download', fileName); // Set the desired file name
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(urlBlob);
        form.resetFields()
      }
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false)
  };




  return (<div className='error-report-page'>
    {isLoading && <Loader />}
    <div className='error-content'>
      <ErrorCorrectionsDownload FileTypeList={FileTypeList} handleFileDownload={handleFileDownload} />
      <ErrorCorrectionsUpload FileTypeList={FileTypeList} handleFileUpload={handleFileUpload} />


    </div>
    <div className='next-btn-section'>
      <Space className='form-group-item form-btn'>
        <Button onClick={() => onNext(current - 1)}>
          Previous
        </Button>
      </Space>
    </div>

  </div>)

};

export default ErrorCorrections;