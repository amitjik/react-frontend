import PageTitle from '../../Components/PageTitle';
import { jwtDecode } from "jwt-decode";

// import { Button, Form, Input, Select, Space } from 'antd';
import './style.css';
// const { Option } = Select;

const Dashboard: React.FC = () => {
  const token = sessionStorage.getItem('token') || '';
    console.log(token, 'token')
    const decoded:any = token ? jwtDecode(token) : {given_name: "Admin", family_name :''};
  // const [form] = Form.useForm();
  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };


  return (<div className='dashboard-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title={`Welcome ${decoded?.given_name} ${decoded?.family_name}`}
      desc="Have a great day ahead!"
    />
    
  </div>)

};

export default Dashboard;