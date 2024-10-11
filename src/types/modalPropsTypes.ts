import { Invoice, Customer } from "./customerTableTypes";

export interface ModalProps {
    invoices: Invoice[];
    customers: Customer[];
    onClose: () => void;
    actionButtonTitle: string; // Added prop to determine the action button title
  }