import React, { useEffect, useState } from 'react';
import PageTitle from './../../../../Components/PageTitle';
import ContentSection from './../../../../Components/ContentSection';
import { useParams, useNavigate } from "react-router-dom";
import Loader from '../../../../Components/Loader';

import api from '../../../../axios';
import { Button, Form, Input, Select, Space, notification } from 'antd';
import './style.css';
const { Option } = Select;


const AddStation: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [stateList, setStateList] = useState([])
    const [flightTypeValue, setFlightTypeValue] = useState('')
    const [airportDetails, setAirportDetails] = useState<any>(null);
    const {  airportCode  } = useParams<{ airportCode: string }>();
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

    const getAirPortdetails = async() => {
        setIsLoading(true)
        try{
            const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/state` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/state`

          const res = await api.get(url)
          if (res.status === 200 ) {
            console.log(res?.data, 'res?.data')
            const StateList = res?.data?.data.map((item:any) => {
                item.value = item.state;
                item.label= item.state;
                return item
            })
            setStateList(StateList)
          } else {
            setStateList([])
          }
    
        } catch (err) {
            handleError(err)
        }
        setIsLoading(false)
      }

      const getAirportDetailsByCode = async (airportCode: string) => {
        setIsLoading(true);
        try {
            const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/${airportCode}` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/${airportCode}`
            const res = await api.get(url);
                if (res.status === 200) {
                    setAirportDetails(res?.data?.data);
                    const formData:any =  {};
                    if(res?.data?.data?.state !== "International"){
                        formData.flightType = 'Domestic';
                        setFlightTypeValue('Domestic')
                    }else{
                        formData.flightType = 'International';
                        setFlightTypeValue('International')
                    }
                    formData.stateName = res?.data?.data?.state;
                    formData.placeOfSupply = res?.data?.data?.placeOfSupply;
                    formData.stateCode = res?.data?.data?.stateCode;
                    formData.anr = res?.data?.data?.arnNumber;
                    formData.indigoGST = res?.data?.data?.gstinNofIndigo;
                    formData.airportCode = res?.data?.data?.airportCode;
                    formData.location = res?.data?.data?.location;
                    formData.address =res?.data?.data?.address;
                   
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
        getAirPortdetails()
      }, [])

      useEffect(() => {
        if (airportCode) {
            getAirportDetailsByCode(airportCode);
        }
    }, [airportCode]);

    const onFinish = async (values: any) => {
        setIsLoading(true)
        if (values.flightType === 'International') {
            values.stateName = 'International';
            values.placeOfSupply = 'International';
            values.stateCode = 'ZZ';
            values.anr = '';
            values.indigoGST = "";
        }

        try {
            let res;
            if(airportCode){
                const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/${airportCode}` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/${airportCode}`
                res = await api.put(url, {address: values?.address})
            }else{
                const url = paxInvoicingType === 'pax-invoicing-code-share' ? `https://fp-cs-selfservice-addairport-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/create` : `https://fp-selfservice-finance-platform-core-dev.apps.arolab37nonprod.goindigo.in/api/airport/create`
                res = await api.post(url, {...values});
            }
            if (res.status === 200 || res.status === 201) {
                form.resetFields();
                navigate(paxInvoicingType === 'pax-invoicing-code-share' ? '/pax-invoicing-code-share/self-service/add-airport-station' : '/pax-invoicing-non-code-share/self-service/add-airport-station');
                if(airportCode){
                    notification.success({
                        message: 'Airport details Update Successfully',
                    });  
                   
                }else{
                    notification.success({
                        message: 'Airport Added Successfully',
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


    const FlightTypeOption = [
        { value: 'Domestic', label: 'Domestic' },
        { value: 'International', label: 'International' },
    ]

    const handleFlightType = (value: any) => {
        console.log(value, 'value')
        setFlightTypeValue(value)
        
    }


    return (<div className='add-station-page'>
         {isLoading && <Loader />}
        <PageTitle
            className="site-page-header"
            onBack={() => navigate(-1)}
            title={airportCode ? "Edit Airport station" : "Add Airport Station"}
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

                    {!airportCode && <Form.Item name="flightType"
                        label="Origin Type"
                        rules={[{ required: true, message: 'Please select Origin type' }]}
                    >
                        <Select
                            placeholder="Select Origin Type"
                            //onChange={onMonthChange}
                            //defaultValue={selectMonth}
                            options={FlightTypeOption}
                            allowClear
                            onChange={handleFlightType}
                            disabled={airportCode ? true :false }
                        />
                    </Form.Item>}
                    {flightTypeValue === 'Domestic' && !airportCode ? <Form.Item
                        name="stateName"
                        label="State name"
                        rules={[{ required: true, message: 'Please select state name' }]}>
                        <Select
                            placeholder="Select Flight Type"
                            //onChange={onMonthChange}
                            //defaultValue={selectMonth}
                            options={stateList}
                            disabled={airportCode ? true :false }
                            onChange={(value) => {
                                const formData = form.getFieldsValue();
                                const stateCode:any =  stateList.find((item:any) => item?.state === value) 
                                formData.stateCode = stateCode?.stateCode;
                                form.setFieldsValue(formData)
                            }}
                        />
                    </Form.Item> : ""}
                    {flightTypeValue === 'Domestic' && !airportCode ? <Form.Item
                        name="indigoGST"
                        label="IndiGo GST"
                        rules={[
                            { required: true, message: 'Please enter GST Number' },
                            {
                                pattern: /^[A-Za-z0-9]{15}$/,
                                message: 'GST Number must be 15 alphanumeric characters'
                            }
                            // {
                            //     pattern: /^[A-Z]{2}[0-9]{10}[A-Z]{1}[0-9]{1}[A-Z0-9]{1}$/,
                            //     message: 'Please enter a valid GST Number'
                            // }
                        ]}>
                        <Input placeholder='Enter GST Number'  disabled={airportCode ? true :false } />
                    </Form.Item> : ""}
                    {flightTypeValue === 'Domestic' && !airportCode ? <Form.Item
                        name="anr"
                        label="ARN"
                        // rules={[
                        //     { required: true, message: 'Please enter ANR' },
                        //     {
                        //         pattern: /^[A-Za-z0-9]{15}$/,
                        //         message: 'ANR must be 15 alphanumeric characters'
                        //     }
                        // ]}
                        >
                        <Input placeholder='Enter ARN' disabled={airportCode ? true :false } />
                    </Form.Item> : ""}
                    {!airportCode && <Form.Item
                        name="location"
                        label="Location" rules={[
                            { required: true, message: 'Please enter location' },
                            {
                                pattern: /^[^\s][A-Za-z0-9\s]*$/,
                                message: 'Location can only contain letters, numbers, and spaces'
                            }
                        ]}>
                        <Input placeholder='Enter Location' disabled={airportCode ? true :false } />
                    </Form.Item>}
                    {!airportCode && <Form.Item
                        name="airportCode"
                        label="Airport code"
                        rules={[
                            { required: true, message: 'Please enter airport code' },
                            {
                                pattern: /^[A-Za-z0-9]{3}$/,
                                message: 'Airport code must be 3 alphanumeric characters'
                            }
                        ]}>
                        <Input placeholder='Enter Airport Code' maxLength={3} disabled={airportCode ? true :false }/>
                    </Form.Item>}
                    {flightTypeValue === 'Domestic' && !airportCode ? <Form.Item
                        name="placeOfSupply"
                        label="Place of supply"
                        rules={[
                            { required: true, message: 'Please enter Place of supply' },
                            {
                                pattern: /^[^\s][A-Za-z0-9\s]*$/,
                                message: 'Place of supply can only contain letters, numbers, and spaces'
                            }
                        ]}>
                        <Input placeholder='Enter supply place' disabled={airportCode ? true :false }/>
                    </Form.Item> : ""}
                    <Form.Item
                        name="address"
                        label="Address of airport"
                        rules={[
                            { required: true, message: 'Please enter address' },
                            {
                                pattern: /^[^\s][A-Za-z0-9\s, -]*$/,
                                message: 'Address can only contain letters, numbers, spaces, and commas'
                            }
                        ]}>

                        <Input placeholder='Enter Address' />
                    </Form.Item>
                    {flightTypeValue === 'Domestic' && !airportCode ? <Form.Item
                        name="stateCode"
                        label="State code"
                        rules={[
                            { required: true, message: 'Please enter state code' },
                            {
                                pattern: /^[A-Za-z]{2}$/,
                                message: 'State code must be exactly 2 alphabetic characters'
                            }
                        ]}>
                        <Input placeholder='Enter State Code' disabled={airportCode ? true :false } readOnly/>
                    </Form.Item> : ""}
                </Space>
                <Space className='form-group-item form-btn'>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {airportCode ? 'Update' : 'Submit'}
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