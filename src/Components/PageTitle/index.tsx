import { ArrowLeftOutlined, FilterOutlined, UploadOutlined } from '@ant-design/icons';
import './style.css';

interface PageHeaderInterface {
    onBack?: () => void;
    handlefilter?: () => void;
    title: string;
    className?: string;
    desc?: string;
    handleUpload?: () => void;
    handleGenrateReports?: () => void;

}
const PageTitle = ({ title, desc, onBack, handlefilter, className, handleUpload, handleGenrateReports }: PageHeaderInterface) => (
    <div className={`${className} page-header`}>
        <h3>
            {onBack && <span className='back-btn' onClick={onBack}><ArrowLeftOutlined /></span>} 
            <span className='content'>
                {title}
                <span className='description'>{desc}</span>
            </span>
            
        </h3>
        {handlefilter ? <span className="filter-icon" onClick={handlefilter}><FilterOutlined /></span> : ''}
        {handleUpload ? <span className="upload-button" onClick={handleUpload}><UploadOutlined /> Upload </span> : ''}
        {handleGenrateReports ? <span className="genrate-button" onClick={handleGenrateReports}><UploadOutlined /> Genrate reports </span> : ''}
    </div>
);

export default PageTitle;