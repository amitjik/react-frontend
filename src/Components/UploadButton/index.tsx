import { Upload } from 'antd';
import { InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import './style.css';
const { Dragger } = Upload;

interface ContentSectionInterface {
  className?: string;
  props?: object;
  multiple?: boolean;
  name: string;
  accept?: string;
  desc: string;
  title: string;
  plusIconVIew?: boolean
}

const UploadButton = ({ props, className, multiple, name, accept, desc, title, plusIconVIew }: ContentSectionInterface) => (
  <Dragger {...props} multiple={multiple} name={name} accept={accept} className={`${className} upload-btn-section`}>
    {plusIconVIew ? <div className='small-btn-upload'>
      <PlusCircleOutlined /> {title}
    </div> : <div>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{title}</p>
      <p className="ant-upload-hint">
        {desc}
      </p>
    </div>}
  </Dragger>
);

export default UploadButton;