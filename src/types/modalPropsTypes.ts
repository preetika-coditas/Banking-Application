import { Invoice, Customer } from "./customerTableTypes";
export interface ModalProps {
  invoices: Invoice[];
  customers: Customer[];
  onClose: () => void;
  actionButtonTitle: string;
  onRequestPayment: () => void;
  onPaymentDataSend: (data: any) => void; 
  }