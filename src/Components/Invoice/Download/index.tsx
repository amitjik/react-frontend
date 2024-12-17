import React, { useEffect, useState } from 'react';
import { Button, Select, Space, Table, notification, Radio } from 'antd';
import { data, columns, DataType } from './helper';
import api from '../../../axios';
import Loader from '../../Loader';
import ContentSection from '../../ContentSection';
import './style.css';

const InvoiceDoenloadReports = ({reportType}: {reportType:string}) => {
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
  



  return (
    <div className='monthly-report-page'>
      {isLoading && <Loader />}

      <ContentSection>
        <Table bordered columns={columns} dataSource={reportList} rowKey="key" />
      </ContentSection>
    </div>
  );
};

export default InvoiceDoenloadReports;
