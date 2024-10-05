import React from "react";
import { Invoice } from "../../types/customerTableTypes";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./InvoicesDetails.module.scss";

interface InvoicesDetailsProps {
  invoices: Invoice[];
  selectedInvoices: Invoice[];
  onInvoiceCheckboxChange: (invoice: Invoice, isChecked: boolean) => void;
}

const InvoicesDetails: React.FC<InvoicesDetailsProps> = ({
  invoices,
  selectedInvoices,
  onInvoiceCheckboxChange,
}) => {
  const isInvoiceChecked = (invoiceId: string) => {
    return selectedInvoices.some((invoice) => invoice.invoiceId === invoiceId);
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Invoice#</th>
            <th>Document Details</th>
            <th>Invoice Date</th>
            <th>Outstanding Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Last Reminder</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((row, index) => (
            <tr key={row.invoiceId}>
              <td>
                <Checkbox
                  isChecked={isInvoiceChecked(row.invoiceId)} // Check if the invoice is selected
                  onChange={() =>
                    onInvoiceCheckboxChange(
                      row,
                      !isInvoiceChecked(row.invoiceId)
                    )
                  }
                />
              </td>
              <td>{row.invoiceId || "N/A"}</td>
              <td>{row.invoiceDate || "N/A"}</td>
              <td>{row.outstandingAmount || "N/A"}</td>
              <td>{row.dueDate || "N/A"}</td>
              <td>{row.status || "Pending"}</td>
              <td>{row.lastReminder || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesDetails;
