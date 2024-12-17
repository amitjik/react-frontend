import dayjs from 'dayjs';
import { Button, Form, DatePicker, Select, message, Upload, Space, notification } from 'antd';
import ContentSection from './../../ContentSection';
const { Option } = Select;

interface UploadInterfaceProps {
  FileTypeList: any,
  handleFileDownload: any,
}

const ErrorCorrectionsDownload = ({ FileTypeList, handleFileDownload }: UploadInterfaceProps) => {
  const [form] = Form.useForm();

  const onFinishDownload = (values: any) => {
    handleFileDownload(values, form)
  };




  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current.isAfter(dayjs(), 'day'); // Disable any date after today
  };

  return (
    <ContentSection style={{ marginBottom: "20px" }}>
      <h3 className='heading'>DOWNLOAD Error Report</h3>
      <Form
        form={form}
        layout="vertical"
        name="error-download"
        onFinish={onFinishDownload}
      >
        <Space className='form-group-item'>
          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>

        </Space>
        <Space className='form-group-item'>

          <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>

        </Space>
        <Space className='form-group-item'>
          <Form.Item name="fileType" label="File type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              options={FileTypeList}
              allowClear
            />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn'>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Download
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    </ContentSection>
  )

};

export default ErrorCorrectionsDownload;