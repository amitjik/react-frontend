import { useState } from 'react';
import PageTitle from '../../../../../Components/PageTitle';
import { Select } from 'antd';
import { stepListCodeShare } from './helper'
// import './style.css';
import StepsList from '../../../../../Components/Steps';

import UploadTab from '../Upload'
import DownloadTab from '../Download'

const { Option } = Select;


// const { Option } = Select;

const UploadFeature = () => {
  const [current, setCurrent] = useState(0);
  const onChangeSteps = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  return (<div className='monthly-report-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Upload / Download"
    />
    <StepsList current={current} data={stepListCodeShare} type="navigation"  onChange={onChangeSteps}  className="site-navigation-steps"  />
    {current == 0 && <UploadTab onNext={onChangeSteps} current={current}/>}
    {current == 1  && <DownloadTab onNext={onChangeSteps} current={current}/>}
  </div>)

};

export default UploadFeature;