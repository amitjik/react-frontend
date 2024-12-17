
import { Button } from 'antd';
import MapIcon from './../../../../Assests/images/map-icon.svg'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import './style.css';
// const { Option } = Select;
interface AirportStationItemInterface {
  className?: string;
  date: string;
  gstIn?: string;
  createdTime?: string;
  createdBy?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const AirportStationItem = ({ date, gstIn, createdTime, className, createdBy , handleEdit, handleDelete}: AirportStationItemInterface) => {

 

  return (<div className={`${className ? className : ''} station-item`}>
    {/* <div className='code'>Airport Code: {code}</div> */}
    <div className='station-item-title'>
      <img src={MapIcon} alt='map' />
      <h3><span className='title'>{date}</span> <span className='sub-title'>GSTIN : {gstIn}</span></h3>
    </div>
    <div className='station-item-content'>
      <div className='gst-text'>
        <div className=''style={{fontWeight: 'bold'}}>Created By</div>
        {createdBy}
      </div>
      <div className='gst-text'>
        <div className=''style={{fontWeight: 'bold'}}>Created Time</div>
        {dayjs(createdTime, 'YYYY-MM-DD hh:mm:ss').format("DD MMM YYYY hh:mm:ss")}
      </div>
    </div>
    <div className='station-item-footer'>
      <div className='empty-text'></div>
    <div className='action-button'>
    <Button type="primary" shape="circle" icon={<EditOutlined />} size={'large'} onClick={handleEdit}/>
    <Button type="primary" shape="circle" icon={<DeleteOutlined />} size={'large'} onClick={handleDelete}/>

    </div>
    </div>
    
  </div>)

};

export default AirportStationItem;