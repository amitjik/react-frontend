import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection';
import { Button, Form, Select, message, Space, Tabs, Table, Upload, notification, Radio } from 'antd';
import { DownloadOutlined, UploadOutlined, ReloadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import type { TabsProps } from 'antd';
import { stepListCOdeShare, stepListData } from './helper'
import './style.css';
import { useEffect, useState } from 'react';
import api from '../../../../axios';
import Loader from '../../../../Components/Loader';
import StepsList from '../../../../Components/Steps';
import EyInvoceApproved from './InvoiceApproval';
import ErrorCorrections from './ErrorCorrections';

import UploadTab from './Upload'
import DownloadTab from './Download'

const { Option } = Select;


// const { Option } = Select;

const NonCodeShareInvoiceApprove = ({selectedApp}:{selectedApp:string}) => {
  const [current, setCurrent] = useState(0);
  const onChangeSteps = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (<div className='monthly-report-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Invoice Approve"
    />
    <StepsList current={current} data={stepListCOdeShare} type="navigation"  onChange={onChangeSteps}  className="site-navigation-steps"  />
    {/* {selectedApp === "PAXINVOICING-CODE-SHARE" && current == 0   && <UploadTab onNext={onChangeSteps} current={current}/>}
    {selectedApp === "PAXINVOICING-CODE-SHARE" ? current == 1 : current == 0 && <EyInvoceApproved onNext={onChangeSteps} current={current}/>}
    {selectedApp === "PAXINVOICING-CODE-SHARE" ? current == 2 : current == 1  && <ErrorCorrections onNext={onChangeSteps} current={current}/>}
    {selectedApp === "PAXINVOICING-CODE-SHARE" ? current == 3 : current == 2 && <PendingMails  onNext={onChangeSteps} current={current} />} */}

    {current == 0 && <UploadTab onNext={onChangeSteps} current={current}/>}
    {/* {current == 1  && <DownloadTab onNext={onChangeSteps} current={current}/>} */}
    {current == 1  && <EyInvoceApproved onNext={onChangeSteps} current={current}/>}
    {current == 2  && <ErrorCorrections onNext={onChangeSteps} current={current}/>}

    
    
    {/* {current == 3  && <PendingMails  onNext={onChangeSteps} current={current} />} */}
    
    

  </div>)

};

export default NonCodeShareInvoiceApprove;