import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Customer } from "../../types/customerTableTypes";
import {
  isInvoiceOverdue,
  calculateTotalOverdueAmount,
} from "../Helper/invoices";
import { Summary } from "./Summary";
import { ModalProps } from "../../types/modalPropsTypes";

const Modal: React.FC<ModalProps> = ({
  invoices,
  customers,
  onClose,
  actionButtonTitle,
  onRequestPayment,
}) => {
  const [activeTab, setActiveTab] = useState<
    "Request Payment" | "Send Reminder"
  >("Request Payment");

  useEffect(() => {
    if (actionButtonTitle.includes("Send Reminder")) {
      setActiveTab("Send Reminder");
    }
    if (actionButtonTitle.includes("Request Payment")) {
      setActiveTab("Request Payment");
    }
  }, [actionButtonTitle]);

  const handleRequestPayment = () => {
    const paymentData = customers.map((customer) => ({
      customerId: customer.customerId,
      invoiceIds: invoices
        .filter(
          (invoice) =>
            invoice.customerName.trim().toLowerCase() ===
            customer.name.trim().toLowerCase()
        )
        .map((invoice) => invoice.invoiceId),
    }));

    console.log("Request Payment data: ", paymentData);

    onRequestPayment();
    onClose();
  };

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

  upcomingInvoices.forEach((invoice) => {
    const matchingCustomer = customers.find(
      (customer) =>
        customer.name.toLowerCase() === invoice.customerName.toLowerCase() // Handle case differences
    );

    if (matchingCustomer) {
      uniqueUpcomingCustomers.add(matchingCustomer);
    }
  });

  console.log("uniqueUpcomingCustomers", Array.from(uniqueUpcomingCustomers));

  const uniqueOverdueCustomers = new Set<Customer>();

  overdueInvoices.forEach((invoice) => {
    const matchingCustomer = customers.find(
      (customer) =>
        customer.name.toLowerCase() === invoice.customerName.toLowerCase()
    );

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
          {activeTab === "Request Payment" && overdueInvoices.length > 0 && (
            <div className={styles.invoiceDetailsContainer}>
              <div className={styles.invoiceTypeTitle}>Request Payment</div>
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

          {activeTab === "Send Reminder" && upcomingInvoices.length > 0 && (
            <div className={styles.invoiceDetailsContainer}>
              <div className={styles.invoiceTypeTitle}>Send Reminder</div>
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
        <div className={styles.sendRequestButtonContainer}>
          <div
            className={styles.sendRequestButton}
            onClick={handleRequestPayment}
          >
            <div> Request Payment Via email</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
