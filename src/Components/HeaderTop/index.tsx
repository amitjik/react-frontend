import { Input, Button } from 'antd';
import { SearchOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { NotificationIcon, LogOutIcon, ArrowIcon } from './icon'
import logo from './../../Assests/images/icIndigoLogoWhiteR-new.svg'

import './style.css';

interface MenuCloseInterface {
    collapsedSlide: boolean;
    setCollapsedSlide: (collapsedSlide: boolean) => void;
    handleLogout: () => void;
    selectedApp:string;
}

const HeaderTop = ({ collapsedSlide, setCollapsedSlide, handleLogout, selectedApp }: MenuCloseInterface) => {
    console.log('selectedApp', selectedApp)
    return (
        <div className="header-top">
             <div className="logo-vertical">
                    <img src={logo} alt='logo' />
                </div>
            <div className='menu-button'>
               
                <Button
                    type="text"
                    icon={collapsedSlide ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsedSlide(!collapsedSlide)}
                    style={{
                        fontSize: '16px',
                        
                        width: 40,
                        height: 40,
                        zIndex: 99,
                    }}
                />
                <span style={{
                        fontSize: '20px',
                        marginLeft: "15px",
                        color: "#25304B",
                        fontWeight: "600"
                    }}>{selectedApp === "PAXINVOICING-CODE-SHARE" ? 'Pax Invoicing (Code Share)' : selectedApp === "PAXINVOICING-NON-CODE-SHARE" ? "Pax Invoicing (Non Code Share)" : ""}</span>
            </div>
            {/* <div className="search-bar">
                <Input addonBefore={<SearchOutlined />} placeholder="Search" />
            </div> */}
            <div className='top-bar-right'>
                
                {/* <div className='notification'>
                    <span className='circle-round'><NotificationIcon /></span>
                </div> */}
                <div className='logout'>
                    <span className='circle-round' onClick={handleLogout}><LogOutIcon /></span>
                </div>
            </div>
            

        </div>
    );
}

export default HeaderTop;
