import React from 'react';
import type { FormProps } from 'antd';
// import { EmailIcon } from './../icon'
import logo from './../../../Assests/images/icIndigoLogoWhiteR-new.svg'

import { 
    Button, Form, 
    // Input, Space 
} from 'antd';
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


const RightLoginSection = ({ handleLogin, handleSSOLogin }:ValuesInterface ) => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        handleLogin(values)
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <div className='right-section-login'>
        <div className='content-section-login'>
            <div className='heading-section' style={{textAlign: 'center'}}>
                <img src={logo} alt='logo' style={{marginBottom: '20px'}}/>
                <h3 >Welcome to Finance Portal</h3>
                {/* <h4>Enter your credentials to login</h4> */}
            </div>
            <div className='login-form'>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    {/* <Form.Item<FieldType>
                        label="Email Address"
                        name="username"
                        rules={[{ required: true, message: 'Enter Email Address!' }]}
                    >
                        <Input suffix={<EmailIcon />} placeholder='Enter  Email Address' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Enter password!' }]}
                    >
                        <Input.Password placeholder='Enter Password'/>
                    </Form.Item> */}
                    {/* <Space>
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Space> */}


                    <Form.Item>
                        {/* <Button type="primary" htmlType="submit">
                            Login
                        </Button> */}
                        <Button type="primary"onClick={handleSSOLogin} style={{marginTop: '20px'}}>
                            SSO Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>

};

export default RightLoginSection;