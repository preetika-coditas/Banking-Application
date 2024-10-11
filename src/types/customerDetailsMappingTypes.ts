import { Customer } from "./customerTableTypes";

export interface DetailMapping {
    key: keyof Omit<Customer, "invoices">;
    label: string;
  }