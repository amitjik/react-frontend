import PageTitle from '../../../../Components/PageTitle';
import { stepListCOdeShare } from './helper';
import './style.css';
import { useState } from 'react';
import StepsList from '../../../../Components/Steps';
import EyInvoceApproved from './InvoiceApproval';
import ErrorCorrections from './ErrorCorrections';
import UploadTab from './Upload';

const NonCodeShareInvoiceApprove = ({ selectedApp }: { selectedApp: string }) => {
  const [current, setCurrent] = useState(0);

  const onChangeSteps = (value: number) => {
    setCurrent(value);
  };

  return (
    <div className="monthly-report-page">
      <PageTitle
        className="site-page-header"
        title="Invoice Approve"
      />
      <StepsList
        current={current}
        data={stepListCOdeShare}
        type="navigation"
        onChange={onChangeSteps}
        className="site-navigation-steps"
      />
      {current === 0 && <UploadTab onNext={onChangeSteps} current={current} />}
      {current === 1 && <EyInvoceApproved onNext={onChangeSteps} current={current} />}
      {current === 2 && <ErrorCorrections onNext={onChangeSteps} current={current} />}
    </div>
  );
};

export default NonCodeShareInvoiceApprove;
