import PageTitle from '../../../../Components/PageTitle';
// import { Button, Form, Input, Select, Space } from 'antd';
import './style.css';
// const { Option } = Select;

const SkyLedgerInbounceReport: React.FC = () => {
  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };


  return (<div className='sky-ledger-inbounce-report-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Sky Ledger Inbounce Report"
    />
    
  </div>)

};

export default SkyLedgerInbounceReport;