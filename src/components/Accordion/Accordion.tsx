import React, { useState } from "react";
import { Customer, Invoice } from "../../types/customerTableTypes";
import InvoicesDetails from "../InvoicesDetails/InvoicesDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Accordion.module.scss";

interface AccordionCardProps {
  customerId: number;
  invoices: Invoice[];
  selectedInvoices: Invoice[];
  onCheckboxChange: (
    customerId: number,
    isChecked: boolean,
    invoices: Invoice[],
    customer: Customer
  ) => void;
  onInvoiceCheckboxChange: (invoice: Invoice, isChecked: boolean) => void;
  children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({
  invoices,
  selectedInvoices,
  onInvoiceCheckboxChange,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => setIsExpanded(!isExpanded);

  const handleInvoiceCheckboxChange = (
    invoice: Invoice,
    isChecked: boolean
  ) => {
    onInvoiceCheckboxChange(invoice, isChecked);
  };

  return (
    <div className={styles.accordionCard}>
      <div className={styles.subContainer}>
        {children}
        <div className={styles.iconWrapper} onClick={toggleExpansion}>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`${isExpanded ? styles.rotate : ""}`}
          />
        </div>
      </div>
      {isExpanded && (
        <InvoicesDetails
          invoices={invoices}
          selectedInvoices={selectedInvoices}
          onInvoiceCheckboxChange={handleInvoiceCheckboxChange}
        />
      )}
    </div>
  );
};

export default AccordionCard;
