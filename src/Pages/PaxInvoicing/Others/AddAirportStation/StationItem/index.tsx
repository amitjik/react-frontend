
// import { Button, Form, Input, Select, Space } from 'antd';
import MapIcon from './../../../../../Assests/images/map-icon.svg'
import './style.css';
// const { Option } = Select;
interface AirportStationItemInterface {
  code?: string;
  title: string;
  className?: string;
  subTitle?: string;
  address?: string;
  gstInvoiceNo?: string;
}

const AirportStationItem = ({ title, subTitle, address, gstInvoiceNo, className, code }: AirportStationItemInterface) => {

 

  return (<div className={`${className ? className : ''} station-item`}>
    <div className='code'>Airport Code: {code}</div>
    <div className='station-item-title'>
      <img src={MapIcon} alt='map' />
      <h3><span className='title'>{title}</span> <span className='sub-title'>{subTitle}</span></h3>
    </div>
    <address>{address}</address>
    {gstInvoiceNo && <div className='gst-text'>
    GSTIN of IndiGo: {gstInvoiceNo}
    </div>}

  </div>)

};

export default AirportStationItem;