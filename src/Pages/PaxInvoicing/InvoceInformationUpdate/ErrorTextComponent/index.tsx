import { Space } from 'antd';


const ErrorTextComponent = ({isError, isSapBiError, errorIds, sapBiErrorIds} : {isError:number, isSapBiError:String, errorIds:any, sapBiErrorIds:any}) => {


  return ( <Space className='column-full-width'>
    {isError ? <span>
      <h3>Pax Invoicing Error Ids</h3>
      <div className='error-id'>{Array.isArray(errorIds) ? errorIds.map((item: any) => <span>{item}</span>) : errorIds.split(',').map((item: any) => <span>{item}</span>)}</div>
    </span> : ""}
    {/* {isSapBiError === "1" ? <span>
      <h3>SAP Bi Error Ids</h3>
      <div className='error-id'>{Array.isArray(sapBiErrorIds) ? sapBiErrorIds.map((item: any) => <span>{item}</span>) : sapBiErrorIds}</div>
    </span> : ''} */}

  </Space>)

};

export default ErrorTextComponent;