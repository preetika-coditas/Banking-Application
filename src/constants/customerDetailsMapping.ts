import { DetailMapping } from "../types/customerDetailsMappingTypes";

export const customerDetails: DetailMapping[] = [
    { key: "customerId", label: "Customer ID" },
    { key: "totalInvoices", label: "#Total Invoices" },
    { key: "outstandingAmount", label: "Outstanding Amount" },
    { key: "overdueInvoices", label: "#Overdue Invoices" },
    { key: "overdueAmount", label: "Overdue Amount" },
    { key: "creditDebitNote", label: "Credit/Debit Note" },
  ];