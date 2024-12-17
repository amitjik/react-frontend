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
  TransactionDate: string;
  ImportFileName?: string | null;
  'Cess Amount'?: number;
  Records: number;
  PNRCount: number;
  NonTaxableFareComponent: number;
  TaxableComponent: number;
  CGSTAmount: number;
  IGSTAmount: number;
  SGSTAmount: number;
  UGSTAmount: number;
  GstAmount:number;
  IsFileProcessed: boolean;
  InvoiceStatus: string | undefined;
  CreatedBy: string | null;
  SlfeGlDataDateWise?: RecordDataType2[];
}

export interface DataType {
  key: any;
  TransactionDate: string;
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
    title: 'Transaction Date',
    dataIndex: 'TransactionDate',
    key: 'TransactionDate',
    //fixed: 'left',
    width: '150px',
    //ellipsis: true,
  },
  {
    title: "SLFE",
    key: "SLFE",
    children: [
      {
        title: 'Records',
        dataIndex: '',
        key: 'Records',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.Records,
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
        render: (text, record, index) => fixedvalue(record?.SlefData?.NonTaxableFareComponent),

      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.SlefData?.TaxableComponent),

      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.SlefData?.['Cess Amount']),

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
        render: (text, record, index) => record?.SlefData?.InvoiceStatus,

      },
    ],
  },
  {
    title: "GL",
    key: "GL",
    children: [
      {
        title: 'Records',
        dataIndex: '',
        key: 'Records',
        // ellipsis: true,
        render: (text, record, index) => record?.GLData?.Records,
      },
      {
        title: 'PNR',
        dataIndex: '',
        key: 'PNR',
        //ellipsis: true,
        render: ((text, record, index) => {
          console.log(record, record?.GLData?.PNRCount, 'record')
          return record?.GLData?.PNRCount
        })
      },
      {
        title: 'NonTaxableComponent',
        dataIndex: '',
        key: 'NonTaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.NonTaxableFareComponent),
      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.TaxableComponent),
      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.SlefData?.['Cess Amount']),

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.CGSTAmount),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.IGSTAmount),
      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.SGSTAmount),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.UGSTAmount),
      },
      {
        title: 'GSTAmount',
        dataIndex: '',
        key: 'GSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.GstAmount),
      },
    ],
  },
  {
    title: "Diff",
    key: "diff",
    children: [
      {
        title: 'NonTaxableComponent',
        dataIndex: '',
        key: 'NonTaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => (record?.SlefData?.NonTaxableFareComponent - record?.GLData?.NonTaxableFareComponent).toFixed(2),
      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => (record?.SlefData?.TaxableComponent - record?.GLData?.TaxableComponent).toFixed(2),
      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => {
          const SLFECESS = record?.SlefData?.['Cess Amount'] || 0;
          const GLFECESS = record?.GLData?.['Cess Amount'] || 0;
          return (SLFECESS - GLFECESS).toFixed(2)
        },

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => ((record?.SlefData?.CGSTAmount || 0) - (record?.GLData?.CGSTAmount || 0)).toFixed(2),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => ((record?.SlefData?.IGSTAmount || 0) - (record?.GLData?.IGSTAmount || 0)).toFixed(2),
      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => ((record?.SlefData?.SGSTAmount || 0) - (record?.GLData?.SGSTAmount || 0)).toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => ((record?.SlefData?.UGSTAmount || 0) - (record?.GLData?.UGSTAmount || 0)).toFixed(2),
      },
      {
        title: 'GSTAmount',
        dataIndex: '',
        key: 'GSTAmount',
        //ellipsis: true,
        render: (text, record, index) => (((record?.SlefData?.CGSTAmount || 0) + (record?.SlefData?.SGSTAmount || 0) + (record?.SlefData?.UGSTAmount || 0)) - (record?.GLData?.GstAmount || 0)).toFixed(2),
      },
    ]
  }
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
    title: "SLFE",
    key: "SLFE",
    children: [
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
    ],
  },
  {
    title: "GL",
    key: "GL",
    children: [
      {
        title: 'ImportFileName',
        dataIndex: '',
        key: 'importFileName',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.importFileName,
      },
      {
        title: 'Records',
        dataIndex: '',
        key: 'Records',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.records,
      },
      {
        title: 'PNR',
        dataIndex: '',
        key: 'PNR',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.pnrCount || 0,
      },
      {
        title: 'NonTaxableComponent',
        dataIndex: '',
        key: 'NonTaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.nonTaxableFareComponent),
      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.taxableComponent),
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
        render: (text, record, index) => fixedvalue(record?.GLData?.cgstAmount),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.igstAmount),
      },
      
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.sgstAmount),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.ugstAmount),
      },
      {
        title: 'GSTAmount',
        dataIndex: '',
        key: 'GSTAmount',
        //ellipsis: true,
        render: (text, record, index) => fixedvalue(record?.GLData?.gstAmount),
      },
      // {
      //   title: 'Is File Processed',
      //   dataIndex: '',
      //   key: 'IsFileProcessed',
      //   ellipsis: true,
      //   render: (text, record, index) => record?.GLData?.IsFileProcessed,
      // },
      // {
      //   title: 'Invoice Status',
      //   dataIndex: '',
      //   key: 'InvoiceStatus',
      //   ellipsis: true,
      //   render: (text, record, index) => record?.GLData?.InvoiceStatus,
      // },
    ],
  }
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