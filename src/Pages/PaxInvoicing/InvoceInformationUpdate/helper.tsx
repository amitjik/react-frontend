import type { TableProps } from 'antd';

export const FileTypeList = [
    { value: 'ERRPR-REPORT ', label: 'Error Report' },
    { value: 'MISSING-PNR', label: 'Missing PNR' },
  ]


export interface DataType {
    key: number;
    pnr: string;
    invoiceNumber: string;
    invoiceDate: string;
    passangerName?: string;
    departure:string;
    CustomerGSTINandUINNumber	: string;
    GSTINCustomerName	:string;
    GoodsServiceType	:string;
    IGSTAmount	:string;
    CGSTAmount	:string;
    SGSTORUGST	:string;
}

// export const reasonOptionList = [
  
  
// ]

export const reasonOptionList = [
  { value: '1', label: 'Customer GST Number Change' },
  { value: '2', label: 'Customer GST Name Change' },
  { value: '3', label: 'Customer Email Change' },
  { value: '4', label: 'Customer UIN to GST' },
  { value: '5', label: 'Customer GST to UIN' },
  { value: '6', label: 'IGST to CGST and SGST' },
  { value: '7', label: 'CGST and SGST to IGST' },
  { value: '9', label: 'IGST to CGST and UGST' },
  { value: '10', label: 'CGST and UGST to IGST' },
  // { value: '8', label: 'Change Tax Values' },
  // { value: '9', label: 'Passanger Name' },
]


  export const columns: TableProps<any>['columns'] = [
    {
      title: 'PNR',
      dataIndex: 'pnr',
      key: 'pnr',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Invoice Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: 'Passenger Name',
      dataIndex: 'passengerName',
      key: 'passengerName',
    },
    {
      title: 'Departure',
      dataIndex: 'dep',
      key: 'dep',
    },
    {
      title: 'Customer GSTIN/UIN Number',
      dataIndex: 'customerGSTIN',
      key: 'customerGSTIN',
    },
   
    {
      title: 'GSTIN Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Customer Email',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    },
    {
      title: 'Goods Service Type',
      dataIndex: 'goodsServicesType',
      key: 'goodsServicesType',
    },
    {
      title: 'IGST Amount',
      dataIndex: 'igstAmount',
      key: 'igstAmount',
    },
    {
      title: 'CGST Amount',
      dataIndex: 'cgstAmount',
      key: 'cgstAmount',
    },
    {
      title: 'SGST Amount',
      dataIndex: 'sgstAmount',
      key: 'sgstAmount',
    },
    {
      title: 'UGST Amount',
      dataIndex: 'ugstAmount',
      key: 'ugstAmount',
    },
    
  
  ];


  export const data = [{pnr:'A15TFA', invoiceNumber: 'ZZ1242504AA00006', invoiceDate: '2024-04-15', departure: 'DMM', 	customerGSTINUINNumber : '27AAACH3235MGZ4',	gstINCustomerName: 'ABCTYU', 	goodsServiceType : 'Airport Charges', email: 'test@test.in', IGSTAmount: "0", CGSTAmount : "0", SGSTORUGST:"0"},
    {pnr:'A15TFA', invoiceNumber: 'ZZ1242504AA00006', invoiceDate: '2024-04-15', departure: 'DMM', 	customerGSTINUINNumber : '27AAACH3235MGZ4',	gstINCustomerName: 'ABCTYU', 	goodsServiceType : 'Airport Charges', email: 'test@test.in', IGSTAmount: "0", CGSTAmount : "0", SGSTORUGST:"0"}
  ]
