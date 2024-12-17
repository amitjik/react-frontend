import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../Components/PageTitle';
import ContentSection from '../../../../Components/ContentSection';
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs for date manipulation (Ant Design uses Dayjs by default)
import api from '../../../../axios';
import Loader from '../../../../Components/Loader';
import { Button, Form, Input, Select, Space, notification, DatePicker } from 'antd';
import './style.css';
const { Option } = Select;


const AddSEZ: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [sezDetails, setSEZDetails] = useState<any>(null);
    const { gstin } = useParams<{ gstin: string }>();
    const token = sessionStorage.getItem('token') || '';
    const decoded: any = token ? jwtDecode(token) : { given_name: "Admin", family_name: '', unique_name: 'admin@123' };
    const {  paxInvoicingType  } = useParams<{ paxInvoicingType: string | undefined }>();


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

    const getAirportDetailsByCode = async (gstin: string) => {
        setIsLoading(true);
        try {
            const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${gstin}` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${gstin}`
            const res = await api.get(url);
            if (res.status === 200) {
                setSEZDetails(res?.data?.data);
                const formData: any = {};
                formData.gstin = res?.data?.data?.gstin;
                formData.fromDate = dayjs(res?.data?.data?.fromDate, 'YYYY-MM-DD');
                formData.toDate = res?.data?.data?.toDate && dayjs(res?.data?.data?.toDate, 'YYYY-MM-DD');
                form.setFieldsValue(formData);
                //console.log('Fetched airport details:', res?.data?.data);
            }
        }
        catch (err) {
            handleError(err)
        }
        setIsLoading(false);
    };


    useEffect(() => {
        if (gstin) {
            getAirportDetailsByCode(gstin);
        }
    }, [gstin]);

    const onFinish = async (values: any) => {
        setIsLoading(true)
        values.createdBy = `${decoded?.given_name} ${decoded?.family_name}`;
        values.fromDate = dayjs(values?.fromDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        values.toDate = values?.toDate ? dayjs(values?.toDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : null;
        try {
            let res;
            if (gstin) {
                const data = { ...sezDetails, ...values }
                const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${gstin}` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez/${gstin}`

                res = await api.put(url, { ...data })
            } else {
                const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/sez`
                res = await api.post(url, { ...values });
            }
            if (res.status === 200 || res.status === 201) {
                form.resetFields();
                navigate(paxInvoicingType === 'pax-invoicing-code-share' ? '/pax-invoicing-code-share/self-service/sez-config' : '/pax-invoicing-non-code-share/self-service/sez-config');
                if (gstin){
                    notification.success({
                        message: 'SEZ Update Successfully',
                    });
                }else{
                    notification.success({
                        message: 'SEZ Update Successfully',
                    });
                }
               
            }

        } catch (err) {
            handleError(err)
        }
        setIsLoading(false)
    };


    const onReset = () => {
        form.resetFields();
    };

    const handleFromDateChange = (date: Dayjs | null) => {
        setFromDate(date); // Update the "fromDate" state when the user selects a date
    };

    // Disable dates that are before the selected "From Date"
    const disabledDate = (current: Dayjs) => {
        // If there is no "fromDate" set, allow all dates
        if (!fromDate) return false;
        return current && current.isBefore(fromDate, 'day'); // Disable dates before "fromDate"
    };

    return (<div className='add-station-page'>
        {isLoading && <Loader />}
        <PageTitle
            className="site-page-header"
            onBack={() => navigate(-1)}
            title={gstin ? "Edit SEZ In" : "Add SEZ In"}
            desc={'All fields mentioned are mandatory'}
        />
        <ContentSection style={{ marginBottom: "20px" }}>
            <Form
                form={form}
                layout="vertical"
                name="add-station-form"
                onFinish={onFinish}
            >
                <Space className='form-group-item form-item-33'>
                    {!gstin && <Form.Item
                        name="gstin"
                        label="GSTIN"
                        rules={[
                            { required: true, message: 'Please enter GST Number' },
                            {
                                pattern: /^[A-Za-z0-9]{15}$/,
                                message: 'GST Number must be 15 alphanumeric characters'
                            },
                            {
                                pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/,
                                message: 'Please enter a valid GST Number'
                            }
                        ]}>
                        <Input placeholder='Enter GST Number' disabled={gstin ? true : false} maxLength={15}/>
                    </Form.Item>}
                    <Form.Item name="fromDate" label="From Date" rules={[{ required: true }]}>
                        <DatePicker
                            onChange={handleFromDateChange}
                            disabledDate={disabledDate} // Disable invalid dates for "From Date"
                        />
                    </Form.Item>

                    <Form.Item name="toDate" label="To Date" >
                        <DatePicker
                            disabledDate={disabledDate} // Disable dates before "From Date" in "To Date"
                        />
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

export default AddSEZ;