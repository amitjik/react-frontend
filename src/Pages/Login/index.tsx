import PageTitle from '../../Components/PageTitle';
// import { Button, Form, Input, Select, Space } from 'antd';
import RightLoginSection from "./RightSection";
import LeftLoginSection from './LeftSection';

import './style.css';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface ValuesInterface {
  handleLogin: (values: FieldType) => void;
  handleSSOLogin: () => void;
}

// const { Option } = Select;
//const {instance} = useMsal()


const Login = ({handleLogin, handleSSOLogin}: ValuesInterface) => {
  

  
  
  return (<div className='login-page'>
    <LeftLoginSection />
    <RightLoginSection handleLogin={handleLogin} handleSSOLogin={handleSSOLogin} />
    
  </div>)

};

export default Login;