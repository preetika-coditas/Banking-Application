import { Invoice, Customer, PaymentEntry } from "./customerTableTypes";
export interface ModalProps {
  invoices: Invoice[];
  customers: Customer[];
  onClose: () => void;
  actionButtonTitle: string;
  onPaymentDataSend: (paymentRequestFilteredInvoice: PaymentEntry[],
    sendReminderFilteredinvoice: PaymentEntry[]) => void; 
  }