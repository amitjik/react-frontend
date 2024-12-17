import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection';
import { Button, Form, Input, DatePicker, Space } from 'antd';
import BasicTableComponent from '../../../../Components/BasicTableComponent';
import {data, columns} from './helper'

import './style.css';
// const { Option } = Select;

const InvoiceDataExports: React.FC = () => {
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
      console.log(values);
    };

    const onReset = () => {
      form.resetFields();
    };



  return (<div className='invoice-data-exports-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Invoice Data Exports"
    />
    <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          
          <Form.Item name="pnr" label="PNR" rules={[{ required: true }]}>
            <Input
              placeholder="Enter PNR"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
          <Form.Item name="invoice" label="Invoice" rules={[{ required: true }]}>
            <Input
              placeholder="Enter Invoice"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
          <Form.Item name="State" label="State" rules={[{ required: true }]}>
            <Input
              placeholder="Enter Invoice"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
          <Form.Item name="customerGSTIN" label="Customer GSTIN" rules={[{ required: true }]}>
            <Input
              placeholder="Enter Customer GSTIN"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
        </Space>
        <Space className='form-group-item'>
          <Form.Item name="transactiondate" label="Transaction Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="departure" label="Departure" rules={[{ required: true }]}>
            <Input
              placeholder="Enter PNR"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
          <Form.Item name="arrival" label="Arrival" rules={[{ required: true }]}>
            <Input
              placeholder="Enter Invoice"
              //onChange={onGenderChange}
              allowClear
            />
          </Form.Item>
          <Form.Item className='form-group-item form-btn'>
            <Space style={{paddingTop: '25px'}}>
            <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Queue Report Download
              </Button>
             
            </Space>
          </Form.Item>
        </Space>
        
      </Form>
    </ContentSection>
    <ContentSection style={{ marginBottom: "20px" }}>
      <BasicTableComponent columns={columns} dataSource={data} />
    </ContentSection>
    
  </div>)

};

export default InvoiceDataExports;