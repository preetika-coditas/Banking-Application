import { Invoice } from "../../types/customerTableTypes";

const today = new Date();
export const isInvoiceOverdue = (dueDate: string): boolean => {
    const [day, month, year] = dueDate.split("/").map(Number);
    const invoiceDueDate = new Date(year + 2000, month - 1, day);
    return invoiceDueDate < today;
  };

  export const calculateTotalOverdueAmount = (invoices: Invoice[]) => {
    let sum = 0;
    invoices.map((item: Invoice) => {
      sum = sum + item.outstandingAmount;
    });
    return sum;
  };
