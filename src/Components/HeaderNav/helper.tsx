import { DashboardIcon, AuditReportsIcon, AirportStationIcon, InvoiceIcon, MonthlyIcon, QAReportsIcon, RefundsIcon, SkyLedgetReportsIcon } from './icon'

export const PaxInvocingMenuitems = [
  // {
  //   key: '/pax-invoicing-code-share',
  //   icon: <DashboardIcon />,
  //   label: `Dashboards`,
  // },
  {
    key: '/pax-invoicing-code-share/invoice',
    icon: <InvoiceIcon />,
    label: `Invoice`,
    children: [
      {
        key: '/pax-invoicing-code-share/invoice/upload',
        label: 'Upload',
      },
      {
        key: '/pax-invoicing-code-share/invoice/invoice-approve',
        label: 'Approve',
      },
      {
        key: '/pax-invoicing-code-share/invoice/error-report',
        label: 'Error Report',
      },
      // {
      //   key: '/pax-invoicing/invoice/invoce-update',
      //   label: 'Update',
      // },
      // {
      //   key: '/pax-invoicing/invoice/data-export',
      //   label: 'Data Export',
      // },
    ]
  },
  {
    key: '/pax-invoicing/ey-reports',
    icon: <AirportStationIcon />,
    label: `Reports`,
  },
  {
    key: '/pax-invoicing-code-share/invoice-information-update',
    icon: <InvoiceIcon />,
    label: `Invoice Information Update`,
  },
  
  {
    key: '/pax-invoicing-code-share/self-service',
    icon: <AirportStationIcon />,
    label: `Self Service`,
    children: [
      {
        key: '/pax-invoicing-code-share/self-service/add-airport-station',
        // icon: <AirportStationIcon />,
        label: `Add Airport Station`,
      },
      {
        key: '/pax-invoicing-code-share/self-service/sez-config',
        // icon: <AirportStationIcon />,
        label: `SEZ Config`,
      },
     
    ]
  },
  
  // {
  //   key: '/pax-invoicing/error-corrections',
  //   icon: <QAReportsIcon />,
  //   label: `Error Corrections (Manual)`,
  // },
  // {
  //   key: '/pax-invoicing/pending-mails',
  //   icon: <RefundsIcon />,
  //   label: `Pending Mails`,
  // },
  // {
  //   key: '/pax-invoicing/add-airport-station',
  //   icon: <AirportStationIcon />,
  //   label: `Add Airport Station`,
  // },
  // {
  //   key: '/pax-invoicing/reports',
  //   icon: <InvoiceIcon />,
  //   label: `Reports`,
  //   children: [
  //     {
  //       key: '/pax-invoicing/reports/ey-reports',
  //       label: 'EY Reports',
  //     },
  //     // {
  //     //   key: '/pax-invoicing/reports/pax-tax-report',
  //     //   label: 'PAX Tax Report',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/skyledger-inbound-report',
  //     //   label: 'SkyLedger Inbound Report',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/state-exception-report-up',
  //     //   label: 'State Exception Report (UP)',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/state-exception-report-ne',
  //     //   label: 'State Exception Report (NE)',
  //     // },
  //   ]
  // },
  
  // {
  //   key: '/pax-invoicing/monthly',
  //   icon: <MonthlyIcon />,
  //   label: `Monthly`,
  //   children: [
  //     {
  //       key: '/pax-invoicing/monthly/monthly-report',
  //       label: 'Monthly Download',
  //     },
  //     {
  //       key: '/pax-invoicing/monthly/monthly-update',
  //       label: '`Monthly Update',
  //     },
  //   ]
  // },
  
  
  // {
  //   key: '/pax-invoicing/sky-ledger-inbounce-report',
  //   icon: <SkyLedgetReportsIcon />,
  //   label: `Sky Ledger Inbounce Report`,
  // },
  // {
  //   key: '/pax-invoicing/audit-report',
  //   icon: <AuditReportsIcon />,
  //   label: `Audit Report`,
  // },
];

export const PaxInvocingNCSMenuitems = [
  // {
  //   key: '/pax-invoicing-non-code-share',
  //   icon: <DashboardIcon />,
  //   label: `Dashboards`,
  // },
  {
    key: '/pax-invoicing-non-code-share/invoice',
    icon: <InvoiceIcon />,
    label: `Invoice`,
    children: [
      
      {
        key: '/pax-invoicing-non-code-share/invoice/invoice-approve',
        label: 'Approve',
      },
      // {
      //   key: '/pax-invoicing/invoice/invoce-update',
      //   label: 'Update',
      // },
      // {
      //   key: '/pax-invoicing/invoice/data-export',
      //   label: 'Data Export',
      // },
    ]
  },
  {
    key: '/pax-invoicing-non-code-share/invoice-information-update',
    icon: <InvoiceIcon />,
    label: `Invoice Information Update`,
  },
  {
    key: '/pax-invoicing/ey-reports',
    icon: <AirportStationIcon />,
    label: `Ey Reports`,
  },
  // {
  //   key: '/pax-invoicing/error-corrections',
  //   icon: <QAReportsIcon />,
  //   label: `Error Corrections (Manual)`,
  // },
  // {
  //   key: '/pax-invoicing/pending-mails',
  //   icon: <RefundsIcon />,
  //   label: `Pending Mails`,
  // },
  
  {
    key: '/pax-invoicing-non-code-share/self-service',
    icon: <AirportStationIcon />,
    label: `Self Service`,
    children: [
      {
        key: '/pax-invoicing-non-code-share/self-service/add-airport-station',
        // icon: <AirportStationIcon />,
        label: `Add Airport Station`,
      },
      {
        key: '/pax-invoicing-non-code-share/self-service/sez-config',
        // icon: <AirportStationIcon />,
        label: `SEZ Config`,
      },
     
    ]
  },
  
  // {
  //   key: '/pax-invoicing/reports',
  //   icon: <InvoiceIcon />,
  //   label: `Reports`,
  //   children: [
  //     {
  //       key: '/pax-invoicing/reports/ey-reports',
  //       label: 'EY Reports',
  //     },
  //     // {
  //     //   key: '/pax-invoicing/reports/pax-tax-report',
  //     //   label: 'PAX Tax Report',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/skyledger-inbound-report',
  //     //   label: 'SkyLedger Inbound Report',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/state-exception-report-up',
  //     //   label: 'State Exception Report (UP)',
  //     // },
  //     // {
  //     //   key: '/pax-invoicing/reports/state-exception-report-ne',
  //     //   label: 'State Exception Report (NE)',
  //     // },
  //   ]
  // },
  
  // {
  //   key: '/pax-invoicing/monthly',
  //   icon: <MonthlyIcon />,
  //   label: `Monthly`,
  //   children: [
  //     {
  //       key: '/pax-invoicing/monthly/monthly-report',
  //       label: 'Monthly Download',
  //     },
  //     {
  //       key: '/pax-invoicing/monthly/monthly-update',
  //       label: '`Monthly Update',
  //     },
  //   ]
  // },
  
  
  // {
  //   key: '/pax-invoicing/sky-ledger-inbounce-report',
  //   icon: <SkyLedgetReportsIcon />,
  //   label: `Sky Ledger Inbounce Report`,
  // },
  // {
  //   key: '/pax-invoicing/audit-report',
  //   icon: <AuditReportsIcon />,
  //   label: `Audit Report`,
  // },
];

export const copsInvocingMenuitems = [
  {
    key: '/',
    icon: <DashboardIcon />,
    label: `Dashboards`,
  },
  // {
  //   key: '/audit-report',
  //   icon: <AuditReportsIcon />,
  //   label: `Audit Report`,
  // },
  // {
  //   key: '/add-airport-station',
  //   icon: <AirportStationIcon />,
  //   label: `Add Airport Station`,
  // },

];

export const DashboardMenuitems = [
  {
    key: '/',
    icon: <DashboardIcon />,
    label: `Dashboards`,
  },
]