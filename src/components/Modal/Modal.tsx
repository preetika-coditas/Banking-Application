import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Customer, Invoice } from "../../types/customerTableTypes";
import {
  isInvoiceOverdue,
  calculateTotalOverdueAmount,
} from "../Helper/invoices";
import { Summary } from "./Summary";

interface ModalProps {
  invoices: Invoice[];
  customers: Customer[];
  onClose: () => void;
  actionButtonTitle: string; // Added prop to determine the action button title
}

const Modal: React.FC<ModalProps> = ({
  invoices,
  customers,
  onClose,
  actionButtonTitle, // Destructure the prop
}) => {
  const [activeTab, setActiveTab] = useState<
    "Request Payment" | "Send Reminder"
  >("Request Payment");

  useEffect(() => {
    // Set the active tab based on the actionButtonTitle
    if (actionButtonTitle.includes("Send Reminder")) {
      setActiveTab("Send Reminder");
    }
    if (actionButtonTitle.includes("Request Payment")) {
      setActiveTab("Request Payment");
    }
  }, [actionButtonTitle]); // Run effect when actionButtonTitle changes

  // Separate invoices based on dueDate
  const overdueInvoices = invoices.filter((invoice) =>
    isInvoiceOverdue(invoice.dueDate)
  );
  const upcomingInvoices = invoices.filter(
    (invoice) => !isInvoiceOverdue(invoice.dueDate)
  );

  const handleTabChange = (tab: "Request Payment" | "Send Reminder") => {
    setActiveTab(tab);
  };

  console.log("overdueInvoices==>", overdueInvoices);
  console.log("upcomingInvoices==>", upcomingInvoices);
  console.log("customers==>", customers);

  const uniqueUpcomingCustomers = new Set<Customer>();

  // Iterate over each upcoming invoice
  upcomingInvoices.forEach((invoice) => {
    // Find the corresponding customer based on the invoice's customerName
    const matchingCustomer = customers.find(
      (customer) =>
        customer.name.toLowerCase() === invoice.customerName.toLowerCase() // Handle case differences
    );

    // Add to the Set if a match is found
    if (matchingCustomer) {
      uniqueUpcomingCustomers.add(matchingCustomer);
    }
  });

  console.log("uniqueUpcomingCustomers", Array.from(uniqueUpcomingCustomers));

  const uniqueOverdueCustomers = new Set<Customer>();

  // Iterate over each overdue invoice
  overdueInvoices.forEach((invoice) => {
    // Find the corresponding customer based on the invoice's customerName
    const matchingCustomer = customers.find(
      (customer) =>
        customer.name.toLowerCase() === invoice.customerName.toLowerCase() // Handle case differences
    );

    // Add to the Set if a match is found
    if (matchingCustomer) {
      uniqueOverdueCustomers.add(matchingCustomer);
    }
  });

  const overdueCustomerNameArray = Array.from(uniqueOverdueCustomers).map(
    (item) => item.name
  );
  let overdueCustomerName = "";
  const overdueCustomers = () => {
    if (overdueCustomerNameArray.length > 1) {
      return (overdueCustomerName = "Customers");
    } else {
      return (overdueCustomerName = overdueCustomerNameArray[0]);
    }
  };

  const upcomingCustomerNameArray = Array.from(uniqueUpcomingCustomers).map(
    (item) => item.name
  );
  let upcomingCustomerName = "";
  const upcomingCustomers = () => {
    if (upcomingCustomerNameArray.length > 1) {
      console.log("more", overdueCustomerNameArray);
      return (upcomingCustomerName = "Customers");
    } else {
      console.log("less", overdueCustomerNameArray);
      return (upcomingCustomerName = upcomingCustomerNameArray[0]);
    }
  };

  console.log("uniqueOverdueCustomers==>", Array.from(uniqueOverdueCustomers));
  console.log("overdueCustomerNameArray==>", overdueCustomerNameArray);
  console.log("upcomingCustomerNameArray==>", upcomingCustomerNameArray);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeIcon} onClick={onClose}>
          &times;
        </span>

        {/* Tabs */}
        {overdueInvoices.length > 0 && upcomingInvoices.length > 0 && (
          <div className={styles.tabContainer}>
            <div
              className={`${styles.modalTitle} ${
                activeTab === "Request Payment" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("Request Payment")}
            >
              Request Payment
            </div>
            <div
              className={`${styles.modalTitle} ${
                activeTab === "Send Reminder" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("Send Reminder")}
            >
              Send Reminder
            </div>
          </div>
        )}

        <div className={styles.tabContent}>
          {/* Request Payment Tab Content */}
          {activeTab === "Request Payment" && overdueInvoices.length > 0 && (
            <div>
              <h3 className={styles.modalTitle}>Request Payment</h3>
              <Summary
                invoiceCount={overdueInvoices.length}
                customerCount={uniqueOverdueCustomers.size}
                totalAmount={calculateTotalOverdueAmount(
                  Array.from(overdueInvoices)
                )}
                customerName={overdueCustomers()}
              />
            </div>
          )}

          {/* Send Reminder Tab Content */}
          {activeTab === "Send Reminder" && upcomingInvoices.length > 0 && (
            <div>
              <h3 className={styles.modalTitle}>Send Reminder</h3>
              <Summary
                invoiceCount={upcomingInvoices.length}
                customerCount={uniqueUpcomingCustomers.size}
                totalAmount={calculateTotalOverdueAmount(
                  Array.from(upcomingInvoices)
                )}
                customerName={upcomingCustomers()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
