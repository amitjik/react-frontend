import type { TableColumnsType, TableProps } from 'antd';

export interface RecordDataType2 {
  // key:any;
  transactionDate: string;
  importFileName?: string | null;
  records: number;
  cessAmount: number;
  pnr: number;
  nonTaxableFareComponent: number;
  taxableComponent: number;
  cgstAmount: number;
  igstAmount: number;
  sgstAmount: number;
  ugstAmount: number;
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
        render: (text, record, index) => record?.SlefData?.NonTaxableFareComponent.toFixed(2),

      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.TaxableComponent.toFixed(2),

      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.['Cess Amount'],

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.CGSTAmount.toFixed(2),

      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.IGSTAmount.toFixed(2),

      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.SGSTAmount.toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.UGSTAmount.toFixed(2),

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
        render: (text, record, index) => record?.GLData?.PNRCount,
      },
      {
        title: 'NonTaxableComponent',
        dataIndex: '',
        key: 'NonTaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.NonTaxableFareComponent.toFixed(2),
      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.TaxableComponent.toFixed(2),
      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.['Cess Amount'],

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.CGSTAmount.toFixed(2),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.IGSTAmount.toFixed(2),
      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.SGSTAmount.toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.UGSTAmount.toFixed(2),
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
          return (SLFECESS - GLFECESS)
        },

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => (record?.SlefData?.CGSTAmount - record?.GLData?.CGSTAmount).toFixed(2),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.IGSTAmount.toFixed(2),
      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.SGSTAmount.toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.UGSTAmount.toFixed(2),
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
        render: (text, record, index) => record?.SlefData?.nonTaxableFareComponent ? record?.SlefData?.nonTaxableFareComponent.toFixed(2) : 0.00,

      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.taxableComponent ? record?.SlefData?.taxableComponent.toFixed(2) : 0.00,

      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.cessAmount.toFixed(2),

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.cgstAmount.toFixed(2),

      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.igstAmount.toFixed(2),

      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.sgstAmount.toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.ugstAmount.toFixed(2),

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
        render: (text, record, index) => record?.GLData?.pnr || 0,
      },
      {
        title: 'NonTaxableComponent',
        dataIndex: '',
        key: 'NonTaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.nonTaxableFareComponent ? record?.GLData?.nonTaxableFareComponent.toFixed(2) : 0,
      },
      {
        title: 'TaxableComponent',
        dataIndex: '',
        key: 'TaxableComponent',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.taxableComponent ? record?.GLData?.taxableComponent.toFixed(2) : 0,
      },
      {
        title: 'CESSAmount',
        dataIndex: '',
        key: 'CESSAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.SlefData?.cessAmount.toFixed(2),

      },
      {
        title: 'CGSTAmount',
        dataIndex: '',
        key: 'CGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.cgstAmount.toFixed(2),
      },
      {
        title: 'IGSTAmount',
        dataIndex: '',
        key: 'IGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.igstAmount.toFixed(2),
      },
      {
        title: 'SGSTAmount',
        dataIndex: '',
        key: 'SGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.sgstAmount.toFixed(2),
      },
      {
        title: 'UGSTAmount',
        dataIndex: '',
        key: 'UGSTAmount',
        //ellipsis: true,
        render: (text, record, index) => record?.GLData?.ugstAmount.toFixed(2),
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
    title: 'pnr',
    dataIndex: 'pnr',
    key: 'pnr',
  },
  {
    title: 'Departure',
    dataIndex: 'dep',
    key: 'dep',
  },
  {
    title: 'Arrived',
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
    title: 'E6 Registered Address',
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