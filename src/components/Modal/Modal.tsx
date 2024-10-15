import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Summary } from "./Summary";
import { ModalProps } from "../../types/modalPropsTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { TabConfig } from "../../constants/tabConfig";
import {
  Customer,
  Invoice,
  PaymentEntry,
} from "../../types/customerTableTypes";
import {
  isInvoiceOverdue,
  calculateTotalOverdueAmount,
} from "../Helper/invoices";

const Modal: React.FC<ModalProps> = ({
  invoices,
  customers,
  onClose,
  actionButtonTitle,
  onRequestPayment,
  onPaymentDataSend,
}) => {
  const [activeTab, setActiveTab] = useState(TabConfig.REQUEST_PAYMENT);
  const [renderButtonContent, setRenderButtonContent] = useState<
    Record<string, "button" | "note">
  >({
    [TabConfig.REQUEST_PAYMENT]: "button",
    [TabConfig.SEND_REMINDER]: "button",
  });
  const [paymentRequestFilteredInvoice, setPaymentRequestFilteredInvoice] =
    useState<PaymentEntry[]>([]);
  const [sendReminderFilteredinvoice, setSendReminderFilteredinvoice] =
    useState<PaymentEntry[]>([]);

  const handleRequestPayment = () => {
    let filteredInvoices: Invoice[] = [];

    if (activeTab === "Request Payment") {
      filteredInvoices = overdueInvoices;
      setRenderButtonContent((prev) => ({
        ...prev,
        [TabConfig.REQUEST_PAYMENT]: "note",
      }));
    }

    const paymentData = customers.map((customer) => ({
      customerId: customer,
      invoiceIds: filteredInvoices
        .filter(
          (invoice) =>
            invoice.customerName.trim().toLowerCase() ===
            customer.name.trim().toLowerCase()
        )
        .map((invoice) => invoice.invoiceId),
    }));
    console.log(
      "paymentData",
      activeTab === "Request Payment"
        ? "Request Payment data: "
        : "Send Reminder data: ",
      paymentData
    );
    setPaymentRequestFilteredInvoice(paymentData);
    onRequestPayment();
  };

  const handleSendReminder = () => {
    let filteredInvoices: Invoice[] = [];

    if (activeTab === "Send Reminder") {
      filteredInvoices = upcomingInvoices;
      setRenderButtonContent((prev) => ({
        ...prev,
        [TabConfig.SEND_REMINDER]: "note",
      }));
    }

    const paymentData = customers.map((customer) => ({
      customerId: customer,
      invoiceIds: filteredInvoices
        .filter(
          (invoice) =>
            invoice.customerName.trim().toLowerCase() ===
            customer.name.trim().toLowerCase()
        )
        .map((invoice) => invoice.invoiceId),
    }));
    console.log(
      "paymentData",
      activeTab === "Request Payment"
        ? "Request Payment data: "
        : "Send Reminder data: ",
      paymentData
    );
    setSendReminderFilteredinvoice(paymentData);
    onRequestPayment();
  };

  const handleSendEmail = () => {
    if (activeTab === "Request Payment") {
      handleRequestPayment();
    } else {
      handleSendReminder();
    }
  };

  const overdueInvoices = invoices.filter((invoice) =>
    isInvoiceOverdue(invoice.dueDate)
  );
  const upcomingInvoices = invoices.filter(
    (invoice) => !isInvoiceOverdue(invoice.dueDate)
  );
  console.log("overdueInvoices => ", overdueInvoices);
  console.log("upcomingInvoices => ", upcomingInvoices);

  const handleTabChange = (tab: "Request Payment" | "Send Reminder") => {
    setActiveTab(tab);
  };

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

  const overdueCustomers = () => {
    if (overdueCustomerNameArray.length > 1) {
      return "Customers";
    } else {
      return overdueCustomerNameArray[0];
    }
  };

  const upcomingCustomerNameArray = Array.from(uniqueUpcomingCustomers).map(
    (item) => item.name
  );

  const upcomingCustomers = () => {
    if (upcomingCustomerNameArray.length > 1) {
      return "Customers";
    } else {
      return upcomingCustomerNameArray[0];
    }
  };

  const handleClose = () => {
    onPaymentDataSend(
      paymentRequestFilteredInvoice,
      sendReminderFilteredinvoice
    );
    console.log("paymentRequestFilteredInvoice", paymentRequestFilteredInvoice);
    console.log("sendReminderFilteredinvoice", sendReminderFilteredinvoice);
    onClose();
  };

  useEffect(() => {
    if (actionButtonTitle.includes("Send Reminder")) {
      setActiveTab("Send Reminder");
    }
    if (actionButtonTitle.includes("Request Payment")) {
      setActiveTab("Request Payment");
    }
  }, [actionButtonTitle]);

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeIcon} onClick={handleClose}>
          &times;
        </span>

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
        {renderButtonContent[activeTab] == "button" ? (
          <div className={styles.sendRequestButtonContainer}>
            <div className={styles.sendRequestButton} onClick={handleSendEmail}>
              <div>
                {activeTab === "Request Payment"
                  ? "Request Payment via email"
                  : "Send Reminder via email"}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.successMessage}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "white" }}
              size="3x"
            />
            <div className={styles.messageWrapper}>
              <div className={styles.title}>Email Initiated</div>
              <div className={styles.description}>
                Your payment request has been successfully initiated against the
                selected invoices
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
