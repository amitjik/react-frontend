import { Route, Routes } from 'react-router-dom'
import Dashboard from './../Pages';
import CodeShareInvoiceApprove from '../Pages/PaxInvoicing/CodeShare/Invoice';
import UploadFeature from '../Pages/PaxInvoicing/CodeShare/Invoice/UploadFeature'
import InvoiceApproval from '../Pages/PaxInvoicing/CodeShare/Invoice/InvoiceApproval'
import ErrorCorrections from '../Pages/PaxInvoicing/CodeShare/Invoice/ErrorCorrections'
import NonCodeShareInvoiceApprove from '../Pages/PaxInvoicing/NonCodeShare/Invoice';
import AuditReport from '../Pages/PaxInvoicing/Others/AuditReport';
import AddAirportStation from './../Pages/PaxInvoicing/AddAirportStation';
import AddStation from './../Pages/PaxInvoicing/AddAirportStation/AddStation';

import InvoiceDataExports from '../Pages/PaxInvoicing/Others/InvoiceDataExports';
import InvoiceInformationUpdate from '../Pages/PaxInvoicing/InvoceInformationUpdate';
import EyReports from '../Pages/PaxInvoicing/EyReports';
import SezConfig from '../Pages/PaxInvoicing/SezConfig';
import AddSezConfig from '../Pages/PaxInvoicing/SezConfig/AddSEZ';



// import InvoceApproved from '../Pages/PaxInvoicing/Others/InvoceApproved';
// import AuditReport from '../Pages/PaxInvoicing/Others/AuditReport';
// import ErrorCorrections from '../Pages/PaxInvoicing/Others/ErrorCorrections';
// import PendingMails from '../Pages/PaxInvoicing/Others/PendingMails';
// import InvoceUpdate from '../Pages/PaxInvoicing/Others/InvoceUpdate';
// import InvoiceDataExports from '../Pages/PaxInvoicing/Others/InvoiceDataExports';
// import RefundLocalNationals from '../Pages/PaxInvoicing/Others/RefundLocalNationals';
// import RefundLocalNationalsCash from '../Pages/PaxInvoicing/Others/RefundLocalNationalsCash';
// import SkyLedgerInbounceReport from '../Pages/PaxInvoicing/Others/SkyLedgerInbounceReport';
// import AddStation from './../Pages/PaxInvoicing/AddAirportStation/AddStation'

interface ValuesInterface {
    handleSelectApp: (app: string) => void;
    selectedApp: string
}

const RoutesPage = ({handleSelectApp, selectedApp}:ValuesInterface) => {
    return (<div className='invoice-approved-page'>
       
        <Routes>
            <Route path="/pax-invoicing-code-share" element={<Dashboard selectedApp={selectedApp}/>} />
            <Route path="/pax-invoicing-non-code-share" element={<Dashboard selectedApp={selectedApp}/>} />

            {/* <Route path="/pax-invoicing-code-share/invoice/invoice-approve" element={<CodeShareInvoiceApprove selectedApp={selectedApp}/>} /> */}
            <Route path="/pax-invoicing-code-share/invoice/invoice-approve" element={<InvoiceApproval />} />
            <Route path="/pax-invoicing-code-share/invoice/upload" element={<UploadFeature />} />
            <Route path="/pax-invoicing-code-share/invoice/error-report" element={<ErrorCorrections />} />


            <Route path="/pax-invoicing-non-code-share/invoice/invoice-approve" element={<NonCodeShareInvoiceApprove selectedApp={selectedApp}/>} />

            
            <Route path="/pax-invoicing/ey-reports" element={<EyReports />} />
             {/* Invoice Update  */}
            <Route path="/:paxInvoicingType/invoice-information-update" element={<InvoiceInformationUpdate selectedApp={selectedApp} />} />
            {/* SEZ  */}
            <Route path="/:paxInvoicingType/self-service/sez-config" element={<SezConfig />} />
            <Route path="/:paxInvoicingType/self-service/sez-config/add" element={<AddSezConfig />} />
            <Route path="/:paxInvoicingType/self-service/sez-config/edit/:gstin" element={<AddSezConfig/>} />
            {/* Add AirPort */}
            <Route path="/:paxInvoicingType/self-service/add-airport-station" element={<AddAirportStation/>} />
            <Route path="/:paxInvoicingType/self-service/add-airport-station/add" element={<AddStation/>} />
            <Route path="/:paxInvoicingType/self-service/add-airport-station/edit/:airportCode" element={<AddStation/>} />
            <Route path="/pax-invoicing/audit-report" element={<AuditReport/>} />


           {/*  <Route path="/pax-invoicing/error-corrections" element={<ErrorCorrections />} /> */}
            {/* <Route path="/pax-invoicing/pending-mails" element={<PendingMails />} />
            <Route path="/pax-invoicing/invoice/invoce-update" element={<InvoceUpdate/>} />
            <Route path="/pax-invoicing/invoice/invoice-data-exports" element={<InvoiceDataExports/>} />
            <Route path="/pax-invoicing/reports/ey-reports" element={<EYReports selectedApp={selectedApp}/>} />
            <Route path="/pax-invoicing/refund-local-nationals" element={<RefundLocalNationals/>} />
            <Route path="/pax-invoicing/refund-local-nationals-cash" element={<RefundLocalNationalsCash/>} />
            <Route path="/pax-invoicing/sky-ledger-inbounce-report" element={<SkyLedgerInbounceReport/>} /> */}
        </Routes>
    </div>)

};

export default RoutesPage;