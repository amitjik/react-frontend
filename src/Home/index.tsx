import PageTitle from '../Components/PageTitle';
import { jwtDecode } from "jwt-decode";

import {
    FilePdfOutlined
} from '@ant-design/icons';

import './style.css';


// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };


// const { Option } = Select;
//const {instance} = useMsal()


const Home = ({handleSelectApp}: {handleSelectApp: (value:string) => void,}) => {
    const token = sessionStorage.getItem('token') || '';
    console.log(token, 'token')
    const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '' };
    

    return (<div className='home-page'>
        <PageTitle
            className="site-page-header"
            //onBack={() => null}
            title={`Welcome ${decoded?.given_name} ${decoded?.family_name}`}
            desc="Have a great day ahead!"
        />
        <div className='home-section'>
            <div className='home-left-section'>
                <ul>
                    {decoded?.roles?.includes("Admin") || decoded?.roles?.includes("BusinessUser_CodeShare") && <li onClick={() => handleSelectApp('PAXINVOICING-CODE-SHARE')}>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Pax Invoicing (Code Share)</h3>
                        <h4>Invoicing related to passengers</h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") || decoded?.roles?.includes("BusinessUser_CodeShare") && <li onClick={() => handleSelectApp('PAXINVOICING-NON-CODE-SHARE')}>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Pax Invoicing (Non Code Share)</h3>
                        <h4>Invoicing related to passengers</h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") && <li onClick={() => handleSelectApp('COPSINVOICING')}>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>COPS Invoicing</h3>
                        <h4>Invoicing related to COPS</h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") && <li>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Amount Reconciliation</h3>
                        <h4>Compare transactons and activities</h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") && <li>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Finanace Manifest</h3>
                        <h4>Financial abundance</h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") && <li >
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Fund Upload</h3>
                        <h4>Upload your fund related documents </h4>
                    </li>}
                    {decoded?.roles?.includes("Admin") && <li>
                        <div className='circle-icon'><FilePdfOutlined /></div>
                        <h3>Finanace Terms & Conditions</h3>
                        <h4>Access Finance terms and Conditions </h4>
                    </li>}
                </ul>
            </div>
            <div className='home-right-section'>
                <div className='message-box'>
                    <p>"As trusted business partners, our primary goal is to drive 6E's strategic vision through financial excellence & team collaboration, with highest ethical standards across the company"</p>
                    <h4>Gaurav M. Negi</h4>
                    <h5>Chief Financial Officer</h5>
                </div>
            </div>
        </div>

    </div>)

};

export default Home;