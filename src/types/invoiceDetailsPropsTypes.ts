import { Invoice } from "./customerTableTypes";

export interface InvoicesDetailsProps {
    invoices: Invoice[];
    selectedInvoices: Invoice[];
    onInvoiceCheckboxChange: (invoice: Invoice, isChecked: boolean) => void;
  }
  
  