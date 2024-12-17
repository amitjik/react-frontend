import { ReactNode } from 'react';
import { ArrowLeftOutlined, FilterOutlined } from '@ant-design/icons';
import './style.css';

interface ContentSectionInterface {
    children?: ReactNode;
    className?: string;
    style?:object
   
}
const ContentSection = ({ children, className, style }: ContentSectionInterface) => (
    <div className={`${className} content-section`} style={style}>
        {children}
    </div>
);

export default ContentSection;