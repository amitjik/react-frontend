import { Space, Modal, Button, Form, Input } from 'antd';
import ContentSection from './../../../../../../../Components/ContentSection';

const RejectModal = ({handleReasonCancel,isRejectedReasonModal, form, onFinish}:{handleReasonCancel:any,isRejectedReasonModal:any, form:any, onFinish:any}) => {
    return <Modal
    title="Reject Reason"
    onCancel={() => handleReasonCancel()}
    open={isRejectedReasonModal}
    footer={null}
    className="reason-modal"
  >
    <ContentSection >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Space className='form-group-item'>
          <Form.Item name="reason" label="" rules={[
            { required: true, message: 'Reason is required' },
            {
              max: 150,
              message: 'Reason cannot exceed 150 characters'
            },
            {
              validator: (_, value) => {
                if (value && value.startsWith(' ')) {
                  return Promise.reject('Reason cannot start with a space');
                }
                return Promise.resolve();
              }
            }
          ]}>
            <Input placeholder='Enter Reason' />
          </Form.Item>

        </Space>
        <Space className='form-group-item'>
          <Form.Item>
            <Space>

              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Space>
          </Form.Item>

        </Space>
      </Form>
    </ContentSection>

  </Modal>
}

export default RejectModal;