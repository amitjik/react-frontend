import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar } from 'antd';
import { jwtDecode } from "jwt-decode";
import { LeftArrowIcon } from './icon'

import { DashboardMenuitems, copsInvocingMenuitems, PaxInvocingMenuitems, PaxInvocingNCSMenuitems } from './helper';
import logo from './../../Assests/images/icIndigoLogoWhiteR-new.svg'
import './style.css';

const { Sider } = Layout;
interface MenuCloseInterface {
    collapsedSlide: boolean;
    selectedApp: string;
    setSelectedApp: any;
}
const HeaderNav = ({ collapsedSlide, selectedApp, setSelectedApp }: MenuCloseInterface) => {
    const token = sessionStorage.getItem('token') || '';
    // console.log(token, 'token')
    const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '', unique_name: 'admin@123' };
    // console.log(decoded, 'decoded')
    const getMenu = (app: string) => {
        switch (app) {
            case 'PAXINVOICING-CODE-SHARE':
                return PaxInvocingMenuitems;
            case 'PAXINVOICING-NON-CODE-SHARE':
                return PaxInvocingNCSMenuitems;
            case 'COPSINVOICING':
                return copsInvocingMenuitems;
            default:
                return DashboardMenuitems;
        }
    }
    const navigate = useNavigate();
    console.log(window.location.pathname, 'window.location.pathname')
    return (
        <Sider
            className='sidebar-nav'
            breakpoint="lg"
            width="300"
            collapsed={collapsedSlide}
            collapsedWidth={window.matchMedia("(max-width: 991px)").matches && collapsedSlide ? '0' : "90"}
            onBreakpoint={(broken) => {
                // if(window.matchMedia("(max-width: 991px)").matches){
                //     setCollapsedSlide(true)
                //  }
                //  if(window.matchMedia("(min-width: 991px)").matches){
                //     setCollapsedSlide(true)
                //  }
                console.log(broken, 'broken');
            }}
        // onCollapse={(collapsed, type) => {
        //     setCollapsedSlide(!collapsedSlide)
        // }}
        >
            <div className="logo-vertical">
                <a href="/"><img src={logo} alt='logo' /></a>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[window.location.pathname]} items={getMenu(selectedApp)} onClick={({ item, key }) => {
                console.log(window.location.pathname, 'window.location.pathname>>>>>.')
                navigate(key)
                if (key === '/') {
                    setSelectedApp('DASHBOARD')
                }
            }} />
            <div className="user-info-section">
                <div className="user-info-content">
                    <span className="user-info-description">
                        <Avatar size="large" style={{ backgroundColor: '#fff', color: '#25304B' }}>{decoded?.given_name.charAt(0)}{decoded?.family_name.charAt(0)}</Avatar>
                        <span className="user-name"><h4>{decoded?.given_name} {decoded?.family_name}</h4><span className="user-degination">{decoded?.unique_name}</span></span>
                    </span>
                    {/* <span className="user-info-arrow" style={{marginTop: '4px'}}><LeftArrowIcon/></span> */}
                </div>
            </div>
        </Sider>
    );
}

export default HeaderNav;
