import React, { useEffect, useState } from 'react';
import { Button, Select, Space, Table, notification, Radio } from 'antd';
import { data, columns, DataType } from './helper';
import api from '../../../../../axios';
import Loader from '../../../../../Components/Loader';
import ContentSection from '../../../../../Components/ContentSection';
import './style.css';

const CodeShareInvoiceApprove = ({ onNext, current }: { onNext: (value: number) => void; current: number }) => {
  const [reportType, setReportType] = useState<string>('paxinv-cs-archive');
  const [reportList, setReportList] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch reports
  const getReports = async (value: string) => {
    try {
      setIsLoading(true);
      const res = await api.get(`https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob/${value}`);

      if (res.status === 200) {
        const dataList: DataType[] = res?.data?.data.reverse().map((item: string, index: number) => {
          return {
            key: index + 1,
            fileName: item,
            fileUrl: `https://finance-platform-blob-service-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/blob/download/${value}?path=${item}`,
            status: 'Download',
          };
        });
        setReportList(dataList);
      } else {
        throw new Error('No data found');
      }
    } catch (err:any) {
      console.error('Error fetching reports:', err);
      notification.error({
        message: 'Error fetching reports',
        description: err?.message || 'There was an error fetching the reports. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch reports when the component mounts
  useEffect(() => {
    getReports(reportType);
  }, [reportType]);

  // Handle report type change (Archive/Error)
  const handleReportList = (e: any) => {
    const newReportType = e.target.value;
    setReportType(newReportType);
    getReports(newReportType);
  };



  return (
    <div className='monthly-report-page'>
      {isLoading && <Loader />}

      <ContentSection>
        <div className='tab-buttons'>
          <h3>{reportType === 'paxinv-cs-archive'? "Download SLFE File" : "Download Error File"}</h3>
          <Radio.Group value={reportType} onChange={handleReportList}>
            <Radio.Button value="paxinv-cs-archive">SLFE</Radio.Button>
            <Radio.Button value="paxinv-cs-error">Error</Radio.Button>
          </Radio.Group>
        </div>

        <Table bordered columns={columns} dataSource={reportList} rowKey="key" />

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
      </ContentSection>
    </div>
  );
};

export default CodeShareInvoiceApprove;
