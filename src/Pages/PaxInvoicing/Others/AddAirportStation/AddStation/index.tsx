import PageTitle from './../../../../../Components/PageTitle';
import ContentSection from './../../../../../Components/ContentSection';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Select, Space } from 'antd';
import './style.css';
import { useState } from 'react';
const { Option } = Select;


const AddStation: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isfilterOpen, setIsFilterOpen] = useState(false)
    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    
    const FlightTypeOption = [
        { value: 'Domestic ', label: 'Domestic' },
        { value: 'International', label: 'International' },
    ]


    return (<div className='add-station-page'>
        <PageTitle
            className="site-page-header"
            onBack={() => navigate(-1)}
            title="Add Airport station"
            desc={'All fields mentioned are manadatory'}
        />
        <ContentSection style={{ marginBottom: "20px" }}>
            <Form
                form={form}
                layout="vertical"
                name="add-station-form"
                onFinish={onFinish}
            >
                <Space className='form-group-item'>
                
                    <Form.Item name="flightType" label="Flight Type" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select Flight Type"
                            //onChange={onMonthChange}
                            //defaultValue={selectMonth}
                            options={FlightTypeOption}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item name="stateName" label="State name" rules={[{ required: true }]}>
                        <Input placeholder='Enter State Name' />
                    </Form.Item>
                    <Form.Item name="indiGoGST" label="IndiGo GST" rules={[{ required: true }]}>
                        <Input placeholder='Enter GST Number' />
                    </Form.Item>
                   
                </Space>
                <Space className='form-group-item'>
                    <Form.Item name="anr" label="ANR" rules={[{ required: true }]}>
                        <Input placeholder='Enter invoice' />
                    </Form.Item>
                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input placeholder='Enter Location' />
                    </Form.Item>
                    <Form.Item name="airportCode*" label="Airport code" rules={[{ required: true }]}>
                        <Input placeholder='Enter Airport Code' />
                    </Form.Item>
                    
                </Space>
                <Space className='form-group-item'>
                <Form.Item name="supply" label="Place of supply" rules={[{ required: true }]}>
                        <Input placeholder='Enter supply place' />
                    </Form.Item>
                    <Form.Item name="address" label="Address of airport" rules={[{ required: true }]}>
                        <Input placeholder='Enter Address' />
                    </Form.Item>
                    <Form.Item name="stateCode*" label="State code" rules={[{ required: true }]}>
                        <Input placeholder='Enter State Code' />
                    </Form.Item>
                </Space>
                <Space className='form-group-item form-btn'>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>

                        </Space>
                    </Form.Item>
                </Space>
            </Form>
        </ContentSection>
    </div>)

};

export default AddStation;