import { useEffect, useState } from 'react';
import PageTitle from '../../../Components/PageTitle';
import { useParams, useNavigate } from "react-router-dom";
// import { Button, Form, Input, Select, Space } from 'antd';
import { Button, Form, DatePicker, Select, Space, Table, notification, Input, Radio, Modal, Popconfirm, Checkbox } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { jwtDecode } from "jwt-decode";
import api from '../../../axios';
import type { TableColumnsType, TableProps } from 'antd';
import Loader from '../../../Components/Loader';
import ContentSection from '../../../Components/ContentSection';
import { columns } from './helper'
import './style.css';
import ErrorTextComponent from './ErrorTextComponent';
import TaxViewComponent from './Taxview';
// const { Option } = Select;

const InvoceInformationUpdate = ({selectedApp}:{selectedApp?:string}) => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [type, setType] = useState('pnr');
  const [tax, setTax] = useState('1');
  const [isLoading, setIsLoading] = useState(false)
  const [reason, setReason] = useState<String>('');
  let [isValidate, setIsValidate] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [reasonOptionList, setReasonOptionList] = useState([])
  const [dataList, setDataList] = useState<any>()
  const [selectedRow, setSelectedRow] = useState<any>(null)
  const [isFormValid, setIsFormValid] = useState(false);
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[0-9A-Z]{1}$/;
  const token = sessionStorage.getItem('token') || '';
  const {  paxInvoicingType  } = useParams<{ paxInvoicingType: string | undefined }>();
  console.log(paxInvoicingType, 'paxInvoicingType')
  // console.log(token, 'token')
  const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '', unique_name: 'admin@123' };
  const handleError = (error: any) => {
    if (error.response) {
      // API-specific errors (e.g., 400, 500 responses)
      console.error('API error:', error.response);
      notification.error({
        message: `${error.response.data.message || 'Something went wrong'}`,
      });
    } else if (error.request) {
      // No response received from the server
      console.error('No response received:', error.request);
      notification.error({
        message: 'Network error: No response from the server.',
      });
    } else {
      // Any other error (e.g., invalid setup or unexpected issue)
      console.error('Unexpected error:', error.message);
      notification.error({
        message: `Unexpected error: ${error.message}`,
      });
    }
  }

  const getReasonList = async () => {
    try {
      const url = paxInvoicingType === 'pax-invoicing-code-share' ? 'https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/masters/invoiceReasonsDesc?reasonType=invoice_reason' : '/api/v1/masters/invoiceReasonsDesc?reasonType=invoice_reason'
      const res = await api.get(url)
      if (res?.status === 200) {
        console.log(res, 'res')
        const data = paxInvoicingType === 'pax-invoicing-code-share' ? res?.data?.data[0] : res?.data;
        const filteredData = data.filter((item: any) => ![ "9", "10", "11", "12"].includes(item.reasonId));
        
          const newdata = filteredData.map((item: any) => {
            item.value = item.reasonId;
            item.label = item.reason;
            return item
          })
          setReasonOptionList(newdata)
        
       
      }
     
    }
    catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    getReasonList()
    form.setFieldsValue({ type: type })
  }, [])

  const validateAmount = (_: any, value: any) => {
    if (!value) {
      return Promise.reject(new Error('Please input an amount!'));
    }

    return Promise.resolve();
  };


  const getInformation = async (type: String, value: String) => {
    setIsLoading(true)
    try {
      const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/search-by-pnr-or-invoicenumber?searchby=${type}&value=${value}` : `/api/v1/search-by-pnr-or-invoicenumber?searchby=${type}&value=${value}`;

      const getdata = await api.get(url)
      if (getdata?.status === 200) {
        if( getdata?.data === "Not Found"){
          setDataList([])
          notification.error({
            message: "Not Found"
          });
        } else if (Array.isArray( getdata?.data?.data) && !getdata?.data?.data.length ) {
          setDataList([])
          notification.error({
            message: getdata?.data?.message,
          });
        }else {
          const data = paxInvoicingType === 'pax-invoicing-code-share' ? getdata?.data?.data : getdata?.data
          setDataList(data)
        }

      }
      setIsLoading(false)
    }
    catch (error) {
      handleError(error)
      //setDataList(data)
      
    }
  }



  const onFinish = async (values: any) => {
    getInformation(values.type, values[values.type])
  };


  const handleUpdate = async () => {
    try {
      setIsLoading(true)
      const formData = form2.getFieldsValue();
      formData.reason = parseInt(formData.reason)
      const dataParams: any = {}
      dataParams.reason = formData.reason
      dataParams.createdBy = `${decoded?.given_name} ${decoded?.family_name}`;
      dataParams.invoiceNumber = selectedRow.invoiceNumber;

      if (formData.reason === 1 || formData.reason === 2 || formData.reason === 3 || formData.reason === 4 || formData.reason === 5 || formData.reason === 11) {
        dataParams.pnr = selectedRow.pnr;
        dataParams.origin = selectedRow?.dep;
        dataParams.passengerName = selectedRow?.passengerName;
        dataParams.customerName = selectedRow.customerName;
        dataParams.customerGSTIN = selectedRow?.customerGSTIN;
        dataParams.placeOfEmbarkation = selectedRow?.placeOfEmbarkation;
        dataParams.emailAddress = selectedRow?.emailAddress;
        dataParams.gstUn = "G";
      } else if (formData.reason === 8) {
        dataParams.goodsServicesType = selectedRow?.goodsServicesType;
        dataParams.igstAmount = 0;
        dataParams.cgstAmount = 0;
        dataParams.sgstAmount = 0;
        dataParams.ugstAmount = 0;
        formData.tax = formData.tax || tax;
      } else {
        dataParams.goodsServicesType = selectedRow?.goodsServicesType;
      }

      const updatedata = { ...dataParams, ...formData }
      const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-invoice-update-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/config/invoice-updation` : `https://invoice-update-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/config/invoice-updation`;

      const getUpdatedata = await api.post(url, updatedata)
      if (getUpdatedata?.status === 200) {
        const formData = form.getFieldsValue()
        form2.resetFields()
        getInformation(formData.type, formData[formData.type])
        setIsEdit(false)
        setIsValidate(0)
        notification.success({
          message: getUpdatedata?.data?.message || '"Updated Record Successfully'
        })
      }
    } catch (error) {
      handleError(error)
      setIsLoading(false)
      // notification.error({
      //   message: 'Error Network',
      // });
    }
  }

  const handleValidate = async () => {

    setIsLoading(true)
    try {
      const data = form2.getFieldsValue()
      delete data.reason;
      const updatedata = { ...selectedRow, ...data }
      const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-endpoints-svc-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/v1/validate-data` : `/api/v1/validate-data`;

      const getUpdatedata = await api.post(url, [updatedata])
      if (getUpdatedata?.status === 200) {
        // setDataList(getdata?.data)
        const updateRowdata = { ...selectedRow }
        updateRowdata.isError = paxInvoicingType === 'pax-invoicing-code-share' ? getUpdatedata?.data?.data[0]?.isError : getUpdatedata?.data[0]?.isError;
        updateRowdata.isSapBiError = paxInvoicingType === 'pax-invoicing-code-share' ? getUpdatedata?.data?.data[0]?.isSapBiError : getUpdatedata?.data[0]?.isSapBiError
        updateRowdata.errorIds = paxInvoicingType === 'pax-invoicing-code-share' ? getUpdatedata?.data?.data[0]?.errorIds : getUpdatedata?.data[0]?.errorIds
        updateRowdata.sapBiErrorIds = paxInvoicingType === 'pax-invoicing-code-share' ? getUpdatedata?.data?.data[0]?.sapBiErrorIds : getUpdatedata?.data[0]?.sapBiErrorIds
        setSelectedRow(updateRowdata)
        setIsValidate(1)
      }
    } catch (error) {
      handleError(error)
    }
    setIsLoading(false)
  }

  const onFinishValidate = async (values: any) => {
    try {
      if (values.reason == '2'  || values.reason == '3' || values.reason == '5' || values.reason == '6' || values.reason == '7' || values.reason == '13' || values.reason == '14' || values.reason == '8' || values.reason == '15') {
        handleUpdate()
      } else {
        handleValidate()
      }
    }
    catch (error) {
      console.log(error)
    }
  };



  const onReset = () => {
    form.resetFields();
  };

  const onResetValidate = () => {
    form2.resetFields();
  };

  const handleFieldsChange = () => {
    // Check if the form is valid and all required fields are filled
    const isValid = form.isFieldsTouched() && form.getFieldsError().every(({ errors }) => errors.length === 0);
    setIsFormValid(isValid);
  };


  const handleCancel = () => {
    setIsEdit(false)
    form2.resetFields()
    setIsValidate(0)
    setReason('')
  };

  const handleEdit = (record: any) => {
    setIsEdit(true)
    form1.resetFields()
    setSelectedRow(record)
    setReason('')
  }

  const actionColumn = {
    title: 'Action',
    dataIndex: '',
    key: 'action',
    render: (text: any, record: any, index: number) => <span onClick={() => handleEdit(record)}><EditOutlined /></span>
  }

  const columnsData = columns?.concat(actionColumn);

  const handleReason = (value: any) => {
    setIsValidate(0)
    const formData = form2.getFieldsValue()
    if (value == "6") {

      formData.cgstAmount = selectedRow.igstAmount / 2
      formData.sgstAmount = selectedRow.igstAmount / 2
    } else if (value == "7") {
      formData.igstAmount = selectedRow.cgstAmount + selectedRow.sgstAmount
    }
    else if (value == "8") {
      formData.cgstAmount = selectedRow.igstAmount / 2
      formData.ugstAmount = selectedRow.igstAmount / 2
    }
    else if (value == "9") {
      formData.igstAmount = selectedRow.cgstAmount + selectedRow.ugstAmount
    }
    else if (value == "10") {
      formData.igstAmount = ""
      formData.cgstAmount = ""
      formData.sgstAmount = ""
      formData.ugstAmount = ""
    }
    form2.setFieldsValue(formData)
    console.log(formData, 'formData')
    setReason(value)
  }

  const handleTax = (value: string) => {
    setTax(value)
  }

  const handleInputChange = (e: any) => {
    console.log(form2.getFieldsValue(), e.target.value, 'value')
    form2.setFieldsValue({
      sgstAmount: e.target.value,
      ugstAmount: e.target.value,
    });
  };

  const isFormValidate = () => {
    const errors = form.getFieldsError();
    // Find any error in the form
    const hasErrors = errors.some(({ errors }) => errors.length > 0);
    console.log(hasErrors, 'hasErrors')
    return hasErrors;
  };

  return (<div className='invoice--information-update-page'>
    {isLoading && <Loader />}

    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Invoice Information Update"
    />
    <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onReset={onReset}
        onFieldsChange={handleFieldsChange}
      //style={{ maxWidth: '300px' }}
      >
        <Space className='form-group-item' style={{ maxWidth: '650px' }}>
          <Form.Item name="type" label="Select Type">
            <Radio.Group defaultValue={type} value={type} onChange={(e) => setType(e.target.value)}>
              <Radio.Button value="pnr">PNR</Radio.Button>
              <Radio.Button value="invoicenumber">Invoice</Radio.Button>
            </Radio.Group>
          </Form.Item>

          {type === 'pnr' ? <Form.Item name="pnr" label="PNR" rules={[
            { required: true, message: 'PNR is required' },
            {
              pattern: /^[a-zA-Z0-9]{6}$/,
              message: 'PNR must be exactly 6 alphanumeric characters'
            }
          ]}>
            <Input placeholder='Enter PNR' />
          </Form.Item>
            :
            <Form.Item name="invoicenumber" label="Invoice" rules={[
              { required: true, message: 'invoice Number is required' },
              {
                pattern: /^[a-zA-Z0-9]{16}$/,
                message: 'invoice Number must be exactly 16 alphanumeric characters'
              }
            ]}>
              <Input placeholder='Enter Invoice' />
            </Form.Item>}
        </Space>
        <Space className='form-group-item form-btn' style={{ marginTop: '20px' }}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" disabled={!isFormValid}>
                Search
              </Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>

    </ContentSection>

    {(dataList && dataList.length) ? <ContentSection style={{ marginBottom: "20px" }}>
      <Table bordered columns={columnsData} dataSource={dataList} pagination={false} />

    </ContentSection> : ""}
    <Modal className="update-modal" title="Basic Information Update" open={isEdit} footer={null} okText={!isValidate ? 'validate' : 'Update'} onCancel={handleCancel}>
      <ContentSection style={{ marginBottom: "20px" }}>
        <Form
          form={form2}
          onFinish={onFinishValidate}
          onReset={onResetValidate}
          layout="vertical"
        >
          <Space className='form-group-item'>
            <Form.Item name="reason" label="Select Reason" rules={[{ required: true }]}>
              <Select
                placeholder="Select Reason"
                options={reasonOptionList}
                value={reason}
                allowClear
                onChange={(value) => handleReason(value)}
              />
            </Form.Item>
          </Space>
          <Space className='form-group-item flex-direction-column'>
            <ErrorTextComponent isError={selectedRow?.isError} isSapBiError={selectedRow?.isSapBiError} errorIds={selectedRow?.errorIds} sapBiErrorIds={selectedRow?.sapBiErrorIds} />
            {reason == '1' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <span>
                  <h3> Customer GST No.</h3>
                  <div className='error-id'>{selectedRow?.customerGSTIN}</div>
                </span>
              </Space>
              <Space className='column-full-width'>
                <Form.Item name="customerGSTIN" label="Customer GST No." rules={[
                  {
                    required: true,
                    message: 'Please input your GST Number!',
                  },
                  {
                    pattern: gstRegex,
                    message: 'Please enter a valid GST Number!',
                  },
                ]}
                >
                  <Input placeholder='Enter Customer GST No.' maxLength={15} />
                </Form.Item>
              </Space>
            </Space>}
            {reason == '2' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <span>
                  <h3> Customer GSTIN Name</h3>
                  <div className='error-id'>{selectedRow?.customerName}</div>
                </span>
              </Space>
              <Space className='column-full-width'>
                <Form.Item name="customerName" label="Customer GSTIN Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Customer GSTIN Name!',
                    },
                    {
                      pattern: /^[A-Za-z]+([ A-Za-z]*[A-Za-z]+)*$/,
                      message: 'Customer GSTIN Name must only contain alphabets and spaces, with no leading/trailing spaces and no multiple spaces.',
                    },
                  ]}
                >
                  <Input placeholder='Enter Customer GSTIN Name'  maxLength={15} />
                </Form.Item>
              </Space>
            </Space>}
            {reason == '3' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <span>
                  <h3> Customer EmailAddress</h3>
                  <div className='error-id'>{selectedRow?.emailAddress}</div>
                </span>
              </Space>
              <Space className='column-full-width'>
                <Form.Item name="emailAddress" label="Customer Email" rules={[
                  {
                    required: true,
                    message: 'Please input your Customer Email!',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                  },
                ]}>
                  <Input placeholder='Enter Customer Email' />
                </Form.Item>
              </Space>
            </Space>}
            {reason == '4' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <span>
                  <h3> Customer UIN Number</h3>
                  <div className='error-id'>{selectedRow?.customerGSTIN}</div>
                </span>
              </Space>
              <Space className='column-full-width'>
                <Form.Item name="customerGSTIN" label="Customer GST No." rules={[
                  {
                    required: true,
                    message: 'Please input your GST Number!',
                  },
                  {
                    pattern: gstRegex,
                    message: 'Please enter a valid GST Number!',
                  },
                ]}>
                  <Input placeholder='Enter Customer GST No.' maxLength={15}/>
                </Form.Item>
              </Space>
            </Space>}
            {reason == '5' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <span>
                  <h3> Customer GSTIN Number</h3>
                  <div className='error-id'>{selectedRow?.customerGSTIN}</div>
                </span>
              </Space>
              <Space className='column-full-width'>
                <Form.Item name="customerGSTIN" label="Customer UIN No." rules={[
                  {
                    required: true,
                    message: 'Please input your UIN Number!',
                  },
                  {
                    pattern: /^[a-zA-Z0-9]{15}$/,
                    message: 'Please enter a valid UIN Number!',
                  },
                ]}>
                  <Input placeholder='Enter Customer UIN No.' maxLength={15}/>
                </Form.Item>
              </Space>
            </Space>}

            {reason == '6' ? <Space className='form-group-item flex-direction-column'>
              <TaxViewComponent igstAmount={selectedRow?.igstAmount} />
              
            </Space> : ""
            }
            {reason == '7' ? <Space className='form-group-item flex-direction-column'>
              <TaxViewComponent cgstAmount={selectedRow?.cgstAmount.toString()} sgstAmount={selectedRow?.sgstAmount.toString()} />
            </Space> : ''}

            {reason == '13' ? <Space className='form-group-item flex-direction-column'>
              <TaxViewComponent igstAmount={selectedRow?.igstAmount} />
            </Space> : ""}

            {reason == '14' ? <Space className='form-group-item flex-direction-column'>
              <TaxViewComponent cgstAmount={selectedRow?.cgstAmount.toString()} ugstAmount={selectedRow?.ugstAmount.toString()} />
            </Space> : ''}

            {reason == '8' ? <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <Form.Item name="tax" label="Select Tax">
                  <Radio.Group defaultValue={tax} value={tax} onChange={(e) => handleTax(e.target.value)}>
                    <Radio.Button value="1">IGST</Radio.Button>
                    <Radio.Button value="2">CGST & SGST</Radio.Button>
                    <Radio.Button value="3">CGST & UGST</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Space>
              <Space className='column-full-width'>
                {tax === "1" && <Form.Item name="igstAmount" label="IGST Amount" rules={[{ validator: validateAmount }]}>
                  <Input type="number" placeholder='Enter IGST Amount' />
                </Form.Item>}
                {(tax === "2" || tax === "3") && <Form.Item name="cgstAmount" label="CGST Amount" rules={[{ validator: validateAmount }]}>
                  <Input type="number" placeholder='Enter CGST Amount' onChange={handleInputChange} />
                </Form.Item>}
                {tax === "2" && <Form.Item name="sgstAmount" label="SGST Amount" >
                  <Input value={form2.getFieldsValue().cgstAmount} type="number" placeholder='Enter CGST Amount' disabled />
                </Form.Item>}
                {tax === "3" && <Form.Item name="ugstAmount" label="UGST Amount" >
                  <Input value={form2.getFieldsValue().cgstAmount} type="number" placeholder='Enter CGST Amount' disabled />
                </Form.Item>}
              </Space>
            </Space> : ""}
            {reason == '15' && <Space className='form-group-item flex-direction-column'>
              <Space className='column-full-width'>
                <Form.Item name="passengerName" label="Passenge Name" rules={[
                  {
                    required: true,
                    message: 'Please input your Passenge Name!',
                  },
                  {
                    pattern: /^[A-Za-z]+([ A-Za-z]*[A-Za-z]+)*$/,
                    message: 'Passenge Name must only contain alphabets and spaces, with no leading/trailing spaces and no multiple spaces.',
                  },
                ]}>
                  <Input placeholder='Enter Passenge Name.' />
                </Form.Item>
              </Space>
            </Space>}
          </Space>
          <Space className='form-group-item form-btn' style={{ marginTop: '20px' }}>
            {(reason == '1' || reason == '4' ) ? <Form.Item>
              <Space>
                {isValidate ? <Popconfirm
                  title="Update the task"
                  description="kindly check error.Are you sure to update"
                  okText={'Update'}
                  //visible={isFormValidate()}
                  onConfirm={handleUpdate}
                  onCancel={handleValidate}

                >
                  <Button type="primary" disabled={isFormValidate()}>
                    Validate
                  </Button>
                </Popconfirm> : <Button type="primary" htmlType="submit" disabled={isFormValidate()}>
                  Validate
                </Button>}
              </Space>
            </Form.Item> : <Form.Item>
              <Space>

                <Button type="primary" htmlType="submit" disabled={isFormValidate()}>
                  Update
                </Button>
              </Space>
            </Form.Item>}

          </Space>
        </Form>
      </ContentSection>
    </Modal>

  </div>)

};

export default InvoceInformationUpdate;