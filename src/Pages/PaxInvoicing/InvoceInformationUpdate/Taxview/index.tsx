import { Space } from 'antd';


const TaxViewComponent = ({igstAmount, cgstAmount, sgstAmount, ugstAmount} : {igstAmount?:number, cgstAmount?:number, sgstAmount?:number, ugstAmount?:number}) => {


  return ( <Space className='column-full-width'>
    {igstAmount ? <span>
      <h3>IGST Amount</h3>
      {igstAmount}
    </span> : ""}
    {cgstAmount ? <span>
      <h3>CGST Amount</h3>
      {cgstAmount}
    </span>: ""}
    {sgstAmount ? <span>
      <h3>SGST Amount</h3>
      {sgstAmount}
    </span> : ""}
    {ugstAmount ? <span>
      <h3>UGST Amount</h3>
      {ugstAmount}
    </span>: ""}
  </Space>)

};

export default TaxViewComponent;