
import { Button } from 'antd';
import MapIcon from './../../../../Assests/images/map-icon.svg'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import './style.css';
// const { Option } = Select;
interface AirportStationItemInterface {
  code?: string;
  title: string;
  className?: string;
  subTitle?: string;
  address?: string;
  gstInvoiceNo?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const AirportStationItem = ({ title, subTitle, address, gstInvoiceNo, className, code , handleEdit, handleDelete}: AirportStationItemInterface) => {

 

  return (<div className={`${className ? className : ''} station-item`}>
    <div className='code'>Airport Code: {code}</div>
    <div className='station-item-title'>
      <img src={MapIcon} alt='map' />
      <h3><span className='title'>{title}</span> <span className='sub-title'>{subTitle}</span></h3>
    </div>
    <address>{address}</address>
    <div className='station-item-footer'>
    <div className='gst-text'>{gstInvoiceNo && `GSTIN of IndiGo: ${gstInvoiceNo}`}
    </div>
    <div className='action-button'>
    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} onClick={handleEdit}/>
    {/* <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} onClick={handleDelete}/> */}

    </div>
    </div>
    
  </div>)

};

export default AirportStationItem;