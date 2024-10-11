import { Invoice } from "./customerTableTypes";

export interface InvoiceDetailMapping {
    key: keyof Invoice | "documentDetails"; // Custom key for Document Details
    label: string;
    defaultValue?: string | number;
  }