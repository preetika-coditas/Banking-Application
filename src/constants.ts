export interface Invoice {
  invoiceId: string; // Add this line
  invoiceNumber: string;
  customerName: string;
  invoiceDate: string;
  outstandingAmount: string;
  dueDate: string;
  status: string | null;
  lastReminder: string;
  documentDetails?: string; // Ensure this matches your data
  additionalInfo?: {
    label: string;
    value: string;
    sequence: number;
  }[];
}


export interface Customer {
  name: string;
  customerId: number;
  totalInvoices: number;
  outstandingAmount: string;
  overdueInvoices: number;
  overdueAmount: string;
  creditDebitNote: string;
  invoices: Invoice[];
}

export const CustomerData: Customer[] = [
  {
    name: "Anshul Trading Company",
    customerId: 1000,
    totalInvoices: 212,
    outstandingAmount: "₹9,49,34,079.50",
    overdueInvoices: 212,
    overdueAmount: "₹9,49,34,079.50",
    creditDebitNote: "Yes",
    invoices: [
      {
        invoiceId: "IN1718000000492024001",
        invoiceNumber: "IN1718000000492024",
        customerName: "Anshul trading Company",
        invoiceDate: "",
        outstandingAmount: "99999999.00",
        dueDate: "18/04/24",
        status: null,
        lastReminder: "25/09/24",
        additionalInfo: [
            {
                label: "Region",
                value: "Tamil Nadu",
                sequence: 1
            },
            {
                label: "Location",
                value: "",
                sequence: 2
            }
        ]
    },
    {
        invoiceId: "IN1718000000142017001",
        invoiceNumber: "IN1718000000142017",
        customerName: "Anshul trading Company",
        invoiceDate: "",
        outstandingAmount: "1000000.00",
        dueDate: "07/02/18",
        status: null,
        lastReminder: "06/09/24",
        additionalInfo: [
            {
                label: "Region",
                value: "Tamil Nadu",
                sequence: 1
            },
            {
                label: "Location",
                value: "",
                sequence: 2
            }
        ]
    },
    {
        invoiceId: "IN1718000000432024001",
        invoiceNumber: "IN1718000000432024",
        customerName: "Anshul trading Company",
        invoiceDate: "",
        outstandingAmount: "350000.00",
        dueDate: "18/04/24",
        status: null,
        lastReminder: "06/09/24",
        additionalInfo: [
            {
                label: "Region",
                value: "Tamil Nadu",
                sequence: 1
            },
            {
                label: "Location",
                value: "",
                sequence: 2
            }
        ]
    },     
    ],
  },
  {
    name: "Omega Glass Private Limited",
    customerId: 388,
    totalInvoices: 5,
    outstandingAmount: "₹99,658.00",
    overdueInvoices: 5,
    overdueAmount: "₹99,658.00",
    creditDebitNote: "No",
    invoices: [
      {
        invoiceId: "IN1718000000142017002",
        invoiceNumber: "IN1714000016402024",
        documentDetails: "IN • 0090037560",
        invoiceDate: "22/04/24",
        outstandingAmount: "₹59,000.00",
        dueDate: "22/04/24",
        status: "Overdue by 158 days",
        lastReminder: "27/09/24",
        customerName: ""
      },
      {
        invoiceId: "IN1718000000142017003",
        invoiceNumber: "IN1714000016402024",
        documentDetails: "IN • 0090037560",
        invoiceDate: "22/04/24",
        outstandingAmount: "₹59,000.00",
        dueDate: "22/04/24",
        status: "Overdue by 158 days",
        lastReminder: "27/09/24",
        customerName: ""
      },
    ],
  },
];
