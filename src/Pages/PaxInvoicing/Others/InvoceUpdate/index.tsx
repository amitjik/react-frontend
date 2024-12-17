import PageTitle from '../../../../Components/PageTitle';
// import { Button, Form, Input, Select, Space } from 'antd';
import './style.css';
// const { Option } = Select;

const InvoceUpdate: React.FC = () => {
  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };


  return (<div className='invoice-update-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Invoice Update"
    />
    
  </div>)

};

export default InvoceUpdate;