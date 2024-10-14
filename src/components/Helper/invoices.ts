import { Invoice } from "../../types/customerTableTypes";

const today = new Date();
export const isInvoiceOverdue = (dueDate: string): boolean => {
    const [day, month, year] = dueDate.split("/").map(Number);
    const invoiceDueDate = new Date(year + 2000, month - 1, day);
    return invoiceDueDate < today;
  };

  const calculateDaysDifference = (dueDate: Date): number => {
    const diffInTime = dueDate.getTime() - today.getTime();
    return Math.ceil(diffInTime / (1000 * 3600 * 24)); // Convert milliseconds to days
  };
  
  export const getInvoiceStatus = (dueDate: string): string => {
    const [day, month, year] = dueDate.split("/").map(Number);
    const invoiceDueDate = new Date(year + 2000, month - 1, day);
  
    const daysDifference = calculateDaysDifference(invoiceDueDate);
    const isOverdue = invoiceDueDate < today;
  
    const dayLabel = Math.abs(daysDifference) === 1 ? "day" : "days";
  
    if (isOverdue) {
      return `Overdue by ${Math.abs(daysDifference)} ${dayLabel}`;
    } else {
      return `Upcoming in ${daysDifference} ${dayLabel}`;
    }
  };
  

  export const calculateTotalOverdueAmount = (invoices: Invoice[]) => {
    let sum = 0;
    invoices.map((item: Invoice) => {
      sum = sum + item.outstandingAmount;
    });
    return sum;
  };
