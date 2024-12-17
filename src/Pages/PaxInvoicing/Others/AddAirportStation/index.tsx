import React, { useState } from 'react';
import ContentSection from '../../../../Components/ContentSection';
import { useNavigate } from "react-router-dom";
import PageTitle from '../../../../Components/PageTitle';
import { SearchOutlined, UnorderedListOutlined, AppstoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input, Radio, Divider } from 'antd';
import './style.css';
import AirportStationItem from './StationItem';
import Item from 'antd/es/list/Item';
// const { Option } = Select;

const AddAirportStation: React.FC = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<'list' | 'app'>('app');

  const itemData = [
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    },
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    },
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    },
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    },
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    },
    {
      title: 'Andaman & Nicobar Islands',
      subTitle: 'Port Blair',
      address: 'Veer Savarkar International Airport, Lamba Lime, Port Blair, Andaman & Nicobar Islands - 744103',
      code: 'IXZ',
      gstInvoiceNo: '35AABCI2726B1Z5'
    }
  ]

  return (<div className='add-airport-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Add Airport Station"
      desc="List of airports in different locations"
    />
    <ContentSection>
      <div className='add-airport-top-bar'>
        <div className="search-bar">
          <Input addonBefore={<SearchOutlined />} placeholder="Search" />
        </div>
        <div className='right-seaction-bar'>
          <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
            <Radio.Button value="app"><AppstoreOutlined /></Radio.Button>
            <Radio.Button value="list"><UnorderedListOutlined /></Radio.Button>
          </Radio.Group>
          <Divider type="vertical"/>
          <Button type='primary' className='airport-add-btn' onClick={() => navigate('/pax-invoicing/add-airport-station/add')}><PlusCircleOutlined /> Add Airport</Button>
        </div>
      </div>
      <div className={`airport-lists-section ${position}`}>
          {itemData.map(item => <AirportStationItem title={item.title} subTitle={item.subTitle} address={item.address} code={item.code} gstInvoiceNo={item.gstInvoiceNo} />)}
      </div>
    </ContentSection>

  </div>)

};

export default AddAirportStation;