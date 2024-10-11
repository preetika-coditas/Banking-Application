import { InvoiceDetailMapping } from "../types/invoiceDetailsMappingTypes";

export const invoiceDetails: InvoiceDetailMapping[] = [
    { key: "invoiceId", label: "Invoice#", defaultValue: "N/A" },
    { key: "documentDetails", label: "Document Details", defaultValue: "N/A" },
    { key: "invoiceDate", label: "Invoice Date", defaultValue: "N/A" },
    {
      key: "outstandingAmount",
      label: "Outstanding Amount",
      defaultValue: "N/A",
    },
    { key: "dueDate", label: "Due Date", defaultValue: "N/A" },
    { key: "status", label: "Status", defaultValue: "Pending" },
    { key: "lastReminder", label: "Last Reminder", defaultValue: "N/A" },
  ];