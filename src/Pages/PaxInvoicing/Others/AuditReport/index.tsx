import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection';
import { Button, Form, Input, DatePicker, Space } from 'antd';
import BasicTableComponent from '../../../../Components/BasicTableComponent';
import {data, columns} from './helper'
import './style.css';
// const { Option } = Select;

const AuditReport: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };


  

  


  return (<div className='audit-report-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Audit Report"
      desc="All fields mentioned are manadatory"
    />
    <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="reportDate" label="Report date(from/to)" rules={[{ required: true }]}>
            <DatePicker.RangePicker />
          </Form.Item>
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
        </Space>
        <Space className='form-group-item form-btn'>
          <Form.Item>
            <Space>
            <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
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

export default AuditReport;