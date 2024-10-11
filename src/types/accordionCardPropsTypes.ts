import { Customer, Invoice } from "./customerTableTypes";

export interface AccordionCardProps {
    customerId: number;
    invoices: Invoice[];
    selectedInvoices: Invoice[];
    onCheckboxChange: (
      customerId: number,
      isChecked: boolean,
      invoices: Invoice[],
      customer: Customer
    ) => void;
    onInvoiceCheckboxChange: (invoice: Invoice, isChecked: boolean) => void;
    onToggleExpansion: () => void;
    isExpanded: boolean;
    children: React.ReactNode;
  }