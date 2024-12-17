import React, { useEffect, useState } from 'react';
import ContentSection from '../../../Components/ContentSection';
import { useParams, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import api from '../../../axios';
import PageTitle from '../../../Components/PageTitle';
import { SearchOutlined, UnorderedListOutlined, AppstoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Radio, notification, Input, Button, Divider, Pagination } from 'antd';
import Loader from '../../../Components/Loader';

import './style.css';
import AirportStationItem from './SezItem';

const SEZConfig: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [position, setPosition] = useState<'list' | 'app'>('app');
  const [saveListData, setSaveListData] = useState<any[]>([]);
  const [totalItemData, setTotalItemData] = useState<any[]>([]);
  const [itemData, setItemData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(10); // Items per page
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const {  paxInvoicingType  } = useParams<{ paxInvoicingType: string | undefined }>();
  // Fetch airport details with pagination
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


  const getSezDetails = async () => {
    setIsLoading(true);
    try {
      const url = paxInvoicingType === 'pax-invoicing-code-share' 
        ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez`
        : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez`;
      
      const res = await api.get(url);
      
      if (res.status === 200) {
        const data = res?.data?.data || [];
        setTotalItemData(data);
        setSaveListData(data);
  
        // Calculate start and end indices for pagination
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        
        // Slice data for the current page
        const slicedData = data.slice(startIndex, endIndex);
  
        setItemData(slicedData);
        setTotalItems(data.length); // Assuming the API provides the total item count
      } else {
        setItemData([]);
        setTotalItems(0);
      }
    } catch (err) {
      handleError(err)
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSezDetails(); 
  }, []); 

  const handleDeleteSez = async (item: any) => {
    setIsLoading(true);
    
    try {
      // Define the URL dynamically based on the `paxInvoicingType`
      const url = paxInvoicingType === 'pax-invoicing-code-share'
        ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${item.id}`
        : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${item.id}`;
  
      const res = await api.delete(url);
        if (res.status === 200) {
        getSezDetails();
        
        // Show a success notification
        notification.success({
          message: 'Delete Record Successfully',
        });
      }
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number, pageSize: number) => {
    const itemList = [...totalItemData]
    setCurrentPage(page); 
    setPageSize(pageSize); 
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const slicedData = itemList.slice(startIndex, endIndex); // Get the sliced portion for current page
    setItemData(slicedData);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Filter airports based on the first 3 characters of airportCode or location
    const data = [...saveListData]
    const filtered = data.filter((sez) => sez.gstin.toLowerCase().includes(value.toLowerCase()));
    setItemData(filtered);
    setTotalItems(filtered.length)
  };

  return (
    <div className='add-airport-page'>
      {isLoading && <Loader />}

      <PageTitle
        className="site-page-header"
        title="SEZ Config"
        desc="List of SEZ in different locations"
      />
      <ContentSection>
        <div className='add-airport-top-bar'>
          <div className="search-bar">
            <Input addonBefore={<SearchOutlined />} placeholder="Search by GSTIN" onChange={(e) => handleSearch(e.target.value)}/>
          </div>
          <div className='right-seaction-bar'>
            <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
              <Radio.Button value="app"><AppstoreOutlined /></Radio.Button>
              <Radio.Button value="list"><UnorderedListOutlined /></Radio.Button>
            </Radio.Group>
            <Divider type="vertical" />
            <Button type='primary' className='airport-add-btn' onClick={() => navigate(paxInvoicingType === 'pax-invoicing-code-share' ? '/pax-invoicing-code-share/self-service/sez-config/add' : '/pax-invoicing-non-code-share/self-service/sez-config/add')}>
              <PlusCircleOutlined /> Add SEZ
            </Button>
          </div>
        </div>
        <div className={`airport-lists-section ${position}`}>
        {itemData.length === 0 ? <div style={{display:'flex', alignItems: "center", justifyContent: "center", margin: '30px 0', textAlign: 'center', width: "100%"}}>No SEZ Found</div> : itemData.map((item, index) => (
            <AirportStationItem
              key={index}
              date={`${dayjs(item?.fromDate, "YYYY-MM-DD").format("DD MMM YYYY")} ${item?.toDate ? `- ${dayjs(item?.toDate, "YYYY-MM-DD").format("DD MMM YYYY")}` : ''}`}
              gstIn={item?.gstin}
              createdBy={item?.createdBy}
              createdTime={item?.createdTime}
              handleEdit={() => navigate(paxInvoicingType === 'pax-invoicing-code-share' ? `/pax-invoicing-code-share/self-service/sez-config/edit/${item?.id}` : `/pax-invoicing-non-code-share/self-service/sez-config/edit/${item?.id}`)}
              handleDelete={() => handleDeleteSez(item)}
            />
          ))}
        </div>
        {itemData.length !== 0 && <Pagination
          className='pagination-list'
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10', '20', '30', '40']}
            showTotal={(total) => `Total ${total} items`}
          />}
      </ContentSection>
    </div>
  );
};

export default SEZConfig;