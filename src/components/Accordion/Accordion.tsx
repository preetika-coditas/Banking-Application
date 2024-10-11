import React from "react";
import InvoicesDetails from "../InvoicesDetails/InvoicesDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./Accordion.module.scss";
import { AccordionCardProps } from "../../types/accordionCardPropsTypes";

const AccordionCard: React.FC<AccordionCardProps> = ({
  invoices,
  selectedInvoices,
  onInvoiceCheckboxChange,
  children,
  isExpanded,
  onToggleExpansion,
}) => {
  return (
    <div className={styles.accordionCard}>
      <div className={styles.subContainer}>
        {children}
        <div className={styles.iconWrapper} onClick={onToggleExpansion}>
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
          onInvoiceCheckboxChange={onInvoiceCheckboxChange}
        />
      )}
    </div>
  );
};

export default AccordionCard;
