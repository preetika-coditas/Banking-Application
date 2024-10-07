export interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  invoiceDate: string;
  outstandingAmount: string;
  dueDate: string;
  status: string | null;
  lastReminder: string;
  invoiceAmount: string;  
  discount: string;       
  region: string | null;  
  division: string;       
  documentType: string;   
  documentNumber: string; 
  documentDetails?: string;
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