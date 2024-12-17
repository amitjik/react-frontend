import PageTitle from '../../../../Components/PageTitle';
// import { Button, Form, Input, Select, Space } from 'antd';
import './style.css';
// const { Option } = Select;

const RefundLocalNationalsCash: React.FC = () => {
  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };


  return (<div className='refund-local-nationals-cash-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Refund Local Nationals Cash"
    />
    
  </div>)

};

export default RefundLocalNationalsCash;