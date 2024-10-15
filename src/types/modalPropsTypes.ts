import { Invoice, Customer, PaymentEntry } from "./customerTableTypes";
export interface ModalProps {
  invoices: Invoice[];
  customers: Customer[];
  onClose: () => void;
  actionButtonTitle: string;
  onRequestPayment: () => void;
  onPaymentDataSend: (paymentRequestFilteredInvoice: PaymentEntry[],
    sendReminderFilteredinvoice: PaymentEntry[]) => void; 
  }