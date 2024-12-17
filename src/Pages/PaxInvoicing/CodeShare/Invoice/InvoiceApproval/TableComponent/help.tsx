import type { TableColumnsType, TableProps } from 'antd';

export interface RecordDataType2 {
  // key:any;
  transactionDate: string;
  importFileName?: string | null;
  records: number;
  cessAmount: number;
  pnr: number;
  pnrCount:number;
  nonTaxableFareComponent: number;
  taxableComponent: number;
  cgstAmount: number;
  igstAmount: number;
  sgstAmount: number;
  ugstAmount: number;
  gstAmount: number;
  IsFileProcessed: boolean;
  InvoiceStatus: string | undefined;
  createdBy: string | null;
}

export interface RecordDataType {
  transactionMonth: string;
  ImportFileName?: string | null;
  CESSAmount?: number;
  records: number;
  PNRCount: number;
  nonTaxableFareComponent: number;
  taxableComponent: number;
  CGSTAmount: number;
  IGSTAmount: number;
  SGSTAmount: number;
  UGSTAmount: number;
  GstAmount:number;
  isFileProcessed: boolean;
  invoiceStatus: string | undefined;
  createdBy: string | null;
  slfeDataDateWise?: RecordDataType2[];
}

export type TableRowSelection<T> = TableProps<T>['rowSelection'];


export interface TabledataProps {
  year: string,
  status: string,
  selectedRows: any,
  setSelectedRows: any,
  handleApprovalSetvalue: () => void,
  isErrorMessage:boolean, 
  setIsErrorMessage:any
}

export interface DataType {
  key: any;
  transactionMonth: string;
  SlefData: RecordDataType,
  GLData: RecordDataType
}

export interface DataType2 {
  key: any;
  TransactionDate: string;
  SlefData: RecordDataType2,
  GLData: RecordDataType2,
  correctionfiledata: any
}

export const headers = [
  { label: "Transaction Date", key: "TransactionDate" },
  { label: "Transaction DatSTL-SLFE Records Count", key: "Records" },
  { label: "STL-SLFE PNR Count", key: "PNR" },
  { label: "STL-SLFE Non Taxable Fare Component", key: "NonTaxableFareComponent" },
  { label: "STL-SLFE Taxable Component", key: "TaxableComponent" },
  { label: "STL-SLFE CGST Amount", key: "CGSTAmount" },
  { label: "STL-SLFE IGST Amount", key: "IGSTAmount" },
  { label: "STL-SLFE SGST Amount", key: "SGSTAmount" },
  { label: "STL-SLFE UGST Amount", key: "UGSTAmount" },
  { label: "STL-SLFE Is File Processed", key: "IsFileProcessed" },
  { label: "STL-SLFE Invoice Status", key: "InvoiceStatus" }
];

const fixedvalue = (value: any) => {
  return (value || 0).toFixed(2)
}

export const options = [
  {
    label: "importFileName",
    value: "importFileName",
  },
  {
    label: "Records",
    value: "Records",
  },
  {
    label: "PNR",
    value: "PNR",
  },
  {
    label: "NonTaxableComponent",
    value: "NonTaxableComponent",
  },
  {
    label: "TaxableComponent",
    value: "TaxableComponent",
  },
  {
    label: "CESSAmount",
    value: "CESSAmount",
  },
  {
    label: "CGSTAmount",
    value: "CGSTAmount",
  },
  {
    label: "IGSTAmount",
    value: "IGSTAmount",
  },
  {
    label: "SGSTAmount",
    value: "SGSTAmount",
  },
  {
    label: "UGSTAmount",
    value: "UGSTAmount",
  },
  {
    label: "GSTAmount",
    value: "GSTAmount",
  },
  {
    label: "InvoiceStatus",
    value: "InvoiceStatus",
  }
];


export const columns: TableColumnsType<DataType> = [
  {
    title: 'Transaction Month',
    dataIndex: 'transactionMonth',
    key: 'TransactionMonth',
    //fixed: 'left',
    width: '150px',
    //ellipsis: true,
  },
  {
    title: 'Records',
    dataIndex: '',
    key: 'Records',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.records,
  },
  {
    title: 'PNR',
    dataIndex: '',
    key: 'PNR',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.PNRCount,
  },
  {
    title: 'NonTaxableComponent',
    dataIndex: '',
    key: 'NonTaxableComponent',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.nonTaxableFareComponent),

  },
  {
    title: 'TaxableComponent',
    dataIndex: '',
    key: 'TaxableComponent',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.taxableComponent),

  },
  {
    title: 'CESSAmount',
    dataIndex: '',
    key: 'CESSAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.CESSAmount),

  },
  {
    title: 'CGSTAmount',
    dataIndex: '',
    key: 'CGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.CGSTAmount),

  },
  {
    title: 'IGSTAmount',
    dataIndex: '',
    key: 'IGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.IGSTAmount),

  },
  {
    title: 'SGSTAmount',
    dataIndex: '',
    key: 'SGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.SGSTAmount),
  },
  {
    title: 'UGSTAmount',
    dataIndex: '',
    key: 'UGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.UGSTAmount),

  },
  // {
  //   title: 'Is File Processed',
  //   dataIndex: '',
  //   key: 'IsFileProcessed',
  //   ellipsis: true,
  //   render: (text, record, index) => record?.SlefData?.IsFileProcessed,
  // },
  {
    title: 'Invoice Status',
    dataIndex: '',
    key: 'InvoiceStatus',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.invoiceStatus,

  },
];


export const columns2: TableColumnsType<DataType2> = [
  {
    title: 'TransactionDate',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
    //fixed: 'left',
    width: '246px',
    //ellipsis: true,
  },
  {
    title: 'ImportFileName',
    dataIndex: '',
    key: 'importFileName',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.importFileName,
  },
  {
    title: 'Records',
    dataIndex: '',
    key: 'Records',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.records,
  },
  {
    title: 'PNR',
    dataIndex: '',
    key: 'PNR',
    //ellipsis: true,
    render: (text, record, index) => record?.SlefData?.pnr || 0,
  },
  {
    title: 'NonTaxableComponent',
    dataIndex: '',
    key: 'NonTaxableComponent',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.nonTaxableFareComponent),

  },
  {
    title: 'TaxableComponent',
    dataIndex: '',
    key: 'TaxableComponent',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.taxableComponent),

  },
  {
    title: 'CESSAmount',
    dataIndex: '',
    key: 'CESSAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.cessAmount),

  },
  {
    title: 'CGSTAmount',
    dataIndex: '',
    key: 'CGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.cgstAmount),

  },
  {
    title: 'IGSTAmount',
    dataIndex: '',
    key: 'IGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.igstAmount),

  },
  {
    title: 'SGSTAmount',
    dataIndex: '',
    key: 'SGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.sgstAmount),
  },
  {
    title: 'UGSTAmount',
    dataIndex: '',
    key: 'UGSTAmount',
    //ellipsis: true,
    render: (text, record, index) => fixedvalue(record?.SlefData?.ugstAmount),

  },
  // {
  //   title: 'Is File Processed',
  //   dataIndex: '',
  //   key: 'IsFileProcessed',
  //   ellipsis: true,
  //   render: (text, record, index) => record?.SlefData?.IsFileProcessed,
  // },
  // {
  //   title: 'Invoice Status',
  //   dataIndex: '',
  //   key: 'InvoiceStatus',
  //   ellipsis: true,
  //   render: (text, record, index) => record?.SlefData?.InvoiceStatus,

  // },

];


export const columnsAutoCorrection: any = [
  // {
  //   title: 'AutoCorrection Ids',
  //   dataIndex: 'autoCorrectionIds',
  //   key: 'autoCorrectionIds',
  // },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
  },
  {
    title: 'Goods Services Type',
    dataIndex: 'goodsServicesType',
    key: 'goodsServicesType',
  },
  {
    title: 'Flight Number',
    dataIndex: 'flightNumber',
    key: 'flightNumber',
  },
  {
    title: 'SAC',
    dataIndex: 'sac',
    key: 'sac',
  },
  {
    title: 'PNR',
    dataIndex: 'pnr',
    key: 'pnr',
  },
  {
    title: 'Departure',
    dataIndex: 'dep',
    key: 'dep',
  },
  {
    title: 'Arrival',
    dataIndex: 'arr',
    key: 'arr',
  },
  {
    title: 'Place Of Embarkation',
    dataIndex: 'placeOfEmbarkation',
    key: 'placeOfEmbarkation',
  },
  {
    title: 'State Code',
    dataIndex: 'stateCode',
    key: 'stateCode',
  },
  {
    title: 'Customer GSTIN',
    dataIndex: 'customerGSTIN',
    key: 'customerGSTIN',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
  },
  {
    title: 'Customer GST Registration State',
    dataIndex: 'customerGSTRegistrationState',
    key: 'customerGSTRegistrationState',
  },
  {
    title: 'Passenger Name',
    dataIndex: 'passengerName',
    key: 'passengerName',
  },
  {
    title: 'Passenger Email',
    dataIndex: 'passengerEmail',
    key: 'passengerEmail',
  },
  {
    title: '6E Registered Address',
    dataIndex: 'e6RegisteredAddress',
    key: 'e6RegisteredAddress',
  },
  {
    title: 'Non Taxable Fare Component',
    dataIndex: 'nonTaxableFareComponent',
    key: 'nonTaxableFareComponent',
  },
  {
    title: 'Taxable Component',
    dataIndex: 'taxableComponent',
    key: 'taxableComponent',
  },
  {
    title: 'CGST Amount',
    dataIndex: 'cgstAmount',
    key: 'cgstAmount',
  },
  {
    title: 'IGST Amount',
    dataIndex: 'igstAmount',
    key: 'igstAmount',
  },
  {
    title: 'SGST Amount',
    dataIndex: 'sgstAmount',
    key: 'sgstAmount',
  }
]

export const columnsPostInvoice: any = [
  // {
    
  //   title: 'Error Ids',
  //   dataIndex: 'errorIds',
  //   key: 'errorIds',
  // },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
  },
  {
    title: 'Flight Number',
    dataIndex: 'flightNumber',
    key: 'flightNumber',
  },
  {
    title: 'Goods Services Type',
    dataIndex: 'goodsServicesType',
    key: 'goodsServicesType',
  },
  
  {
    title: 'SAC',
    dataIndex: 'sac',
    key: 'sac',
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoiceNumber',
    key: 'invoiceNumber',
  },
  {
    title: 'PNR',
    dataIndex: 'pnr',
    key: 'pnr',
  },
  {
    title: 'Departure',
    dataIndex: 'dep',
    key: 'dep',
  },
  {
    title: 'Arrival',
    dataIndex: 'arr',
    key: 'arr',
  },
  {
    title: 'State Code',
    dataIndex: 'stateCode',
    key: 'stateCode',
  },
  {
    title: 'Customer GSTIN',
    dataIndex: 'customerGSTIN',
    key: 'customerGSTIN',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
  },
  {
    title: 'Customer GST Registration State',
    dataIndex: 'customerGSTRegistrationState',
    key: 'customerGSTRegistrationState',
  },
  {
    title: 'Passenger Name',
    dataIndex: 'passengerName',
    key: 'passengerName',
  },
  {
    title: 'Passenger Email',
    dataIndex: 'passengerEmail',
    key: 'passengerEmail',
  },
  {
    title: '6E GSTIN',
    dataIndex: 'e6gstin',
    key: 'e6gstin',
  },
  {
    title: '6E Registered Address',
    dataIndex: 'e6RegisteredAddress',
    key: 'e6RegisteredAddress',
  },
  {
    title: 'Non Taxable Fare Component',
    dataIndex: 'nonTaxableFareComponent',
    key: 'nonTaxableFareComponent',
  },
  {
    title: 'Taxable Component',
    dataIndex: 'taxableComponent',
    key: 'taxableComponent',
  },
  {
    title: 'CGST Amount',
    dataIndex: 'cgstAmount',
    key: 'cgstAmount',
  },
  {
    title: 'IGST Amount',
    dataIndex: 'igstAmount',
    key: 'igstAmount',
  },
  {
    title: 'SGST Amount',
    dataIndex: 'sgstAmount',
    key: 'sgstAmount',
  },
  {
    title: 'UGST Amount ',
    dataIndex: 'ugstAmount',
    key: 'ugstAmount',
  },
  {
    title: 'Mail Send',
    dataIndex: 'mailSend',
    key: 'mailSend',
  },
  {
    title: 'Airport Charges',
    dataIndex: 'airportCharges',
    key: 'airportCharges',
  },
  {
    title: 'Origin Country',
    dataIndex: 'originCountry',
    key: 'originCountry',
  },
]

export const columnsInvoice: any = [
  {
    title: 'Original Booking Date',
    dataIndex: 'originalBookingDate',
    key: 'originalBookingDate',
  },
  {
    title: 'Transaction Date',
    dataIndex: 'transactionDate',
    key: 'transactionDate',
  },
  {
    title: 'Flight Number',
    dataIndex: 'flightNumber',
    key: 'flightNumber',
  },
  {
    title: 'Description of Goods or Services',
    dataIndex: 'descriptionOfGoodsServices',
    key: 'descriptionOfGoodsServices',
  },
  
  {
    title: 'SAC',
    dataIndex: 'sac',
    key: 'sac',
  },
  {
    title: 'PNR',
    dataIndex: 'pnr',
    key: 'pnr',
  },
  {
    title: 'Sector',
    dataIndex: 'sector',
    key: 'sector',
  },
  {
    title: 'Customer GSTIN',
    dataIndex: 'customerGSTIN',
    key: 'customerGSTIN',
  },
  {
    title: 'Customer Name',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Email Address',
    dataIndex: 'emailAddress',
    key: 'emailAddress',
  },
  {
    title: 'Customer GST Registration State',
    dataIndex: 'customerGSTRegistrationState',
    key: 'customerGSTRegistrationState',
  },
  {
    title: 'Passenger Name',
    dataIndex: 'passengerName',
    key: 'passengerName',
  },
  {
    title: 'Passenger Email',
    dataIndex: 'passengerEmail',
    key: 'passengerEmail',
  },
  {
    title: '6E GSTIN',
    dataIndex: 'e6gstin',
    key: 'e6gstin',
  },
  {
    title: '6E Registered Address',
    dataIndex: 'e6RegisteredAddress',
    key: 'e6RegisteredAddress',
  },
  {
    title: 'Non Taxable Fare Component',
    dataIndex: 'nonTaxableFareComponent',
    key: 'nonTaxableFareComponent',
  },
  {
    title: 'Taxable Component',
    dataIndex: 'taxableComponent',
    key: 'taxableComponent',
  },
  {
    title: 'CGST Amount',
    dataIndex: 'cgstAmount',
    key: 'cgstAmount',
  },
  {
    title: 'IGST Amount',
    dataIndex: 'igstAmount',
    key: 'igstAmount',
  },
  {
    title: 'SGST Amount',
    dataIndex: 'sgstAmount',
    key: 'sgstAmount',
  },
  {
    title: 'UGST Amount ',
    dataIndex: 'ugstAmount',
    key: 'ugstAmount',
  },
  {
    title: 'Airport Charges',
    dataIndex: 'airportCharges',
    key: 'airportCharges',
  },
  {
    title: 'Origin Country',
    dataIndex: 'originCountry',
    key: 'originCountry',
  },
]