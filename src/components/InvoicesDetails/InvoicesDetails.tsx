import React from "react";
import { Invoice } from "../../types/customerTableTypes";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./InvoicesDetails.module.scss";
import { InvoicesDetailsProps } from "../../types/invoiceDetailsPropsTypes";
import { invoiceDetails } from "../../constants/invoiceDetailsMapping";
import { getInvoiceStatus, isInvoiceOverdue } from "../Helper/invoices"; // Import new functions

const InvoicesDetails: React.FC<InvoicesDetailsProps> = ({
  invoices,
  selectedInvoices,
  onInvoiceCheckboxChange,
}) => {
  const isInvoiceChecked = (invoiceId: string) => {
    return selectedInvoices.some((invoice) => invoice.invoiceId === invoiceId);
  };

  const renderValue = (
    row: Invoice,
    key: keyof Invoice | "documentDetails"
  ) => {
    if (key === "documentDetails") {
      const documentType = row.documentType || "";
      const documentNumber = row.documentNumber || "N/A";
      const initials = documentType.substring(0, 2).toUpperCase();
      return `${initials} - ${documentNumber}`;
    }

    if (key === "status") {
      const status = getInvoiceStatus(row.dueDate);
      const isOverdue = isInvoiceOverdue(row.dueDate);
      return (
        <span
          className={isOverdue ? styles.statusOverdue : styles.statusUpcoming}
        >
          {status}
        </span>
      );
    }

    if (key === "dueDate") {
      const isOverdue = isInvoiceOverdue(row.dueDate);
      return (
        <span
          className={isOverdue ? styles.dueDateOverdue : styles.dueDateUpcoming}
        >
          {row.dueDate}
        </span>
      );
    }

    const value = row[key];

    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <span key={index}>
          {item.label}: {item.value}
          {index < value.length - 1 && ", "}
        </span>
      ));
    }

    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }

    return value !== undefined && value !== null ? value : "N/A";
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th></th>
            {invoiceDetails.map((detail) => (
              <th key={detail.key}>{detail.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {invoices.map((row) => (
            <tr key={row.invoiceId}>
              <td>
                <Checkbox
                  isChecked={isInvoiceChecked(row.invoiceId)}
                  onChange={() =>
                    onInvoiceCheckboxChange(
                      row,
                      !isInvoiceChecked(row.invoiceId)
                    )
                  }
                />
              </td>
              {invoiceDetails.map((detail) => (
                <td key={detail.key}>{renderValue(row, detail.key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesDetails;
