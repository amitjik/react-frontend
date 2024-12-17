import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection'
import { Button, Form, Input, Select, Space, Table } from 'antd';
import { SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
// import {ExcelIcon, FilterIcon, RightCircleIcon} from './icon'
import { data, columns } from './helper'

import './style.css';
import { useState } from 'react';
const { Option } = Select;


const InvoceApproved: React.FC = () => {
  const [form] = Form.useForm();
  const [isfilterOpen, setIsFilterOpen] = useState(false)
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  // const handlefilter = () => {
  //   setIsFilterOpen(!isfilterOpen)
  // }


  return (<div className='invoice-approved-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      //handlefilter={handlefilter}
      title="Invoice Approve"
      desc={'All fields mentioned are manadatory'}
    />
    {/* <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="month" label="Select Month and Years" rules={[{ required: true }]}>
            <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" />
          </Form.Item>
          <Form.Item name="reportType" label="Reporting type*" rules={[{ required: true }]}>
            <Select
              placeholder="Select Report Type"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="invoicingDetails">Invoicing Details</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="all">All</Option>
            </Select>
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
    </ContentSection> */}

    {/* {isfilterOpen && <div className='filter-form'>
      <h3 className='filter-form-title' >Filter <span className='filter-close' onClick={handlefilter}><CloseOutlined /></span></h3>
      <Form
        form={form}
        layout="vertical"
        name="invoice-approved"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="codeShare" label="Code Share" rules={[{ required: true }]}>
            <Select
              placeholder="Select a Code Share"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="nav">Nav</Option>
            </Select>
          </Form.Item>
          <Form.Item name="month" label="Month" rules={[{ required: true }]}>
            <Select
              placeholder="Select Month"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="january">January</Option>
            </Select>
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Select
              placeholder="Select Year"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="2024">2024</Option>
            </Select>
          </Form.Item>
          <Form.Item name="report" label="Report Type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Year"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="invoicingDetails">Invoicing Details</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="all">All</Option>
            </Select>
          </Form.Item>
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
    </div>} */}

    <ContentSection >
      <div className='table-filter'>
        <div className="search-bar">
          <Input addonBefore={<SearchOutlined />} placeholder="Search" />
        </div>
        <div className='right-seaction-bar'>
          {/* <Button type='primary' className='filter-btn secondary-button' onClick={() =>console.log('Approved')}><FilterIcon /> Filter</Button> */}
          {/* <Button type='primary' className='export-add-btn secondary-button' onClick={() =>console.log('Approved')}><ExcelIcon /> Export Data</Button> */}
          {/* <Button type='primary' className='approved-btn primary-button' onClick={() =>console.log('Approved')}><RightCircleIcon /> Approve</Button>
          <Button type='primary' className='approved-btn primary-button' onClick={() =>console.log('Approved')}><RightCircleIcon /> Approve</Button> */}
           

        </div>

      </div>
      <div className='table-section'>
        <Table columns={columns} dataSource={data} />
      </div>
    </ContentSection>
  </div>)

};

export default InvoceApproved;