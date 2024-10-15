import React, { useState, useEffect } from "react";
import styles from "./Modal.module.scss";
import { Summary } from "./Summary";
import { ModalProps } from "../../types/modalPropsTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { TabConfig } from "../../constants/tabConfig";
import { Invoice, PaymentEntry } from "../../types/customerTableTypes";
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
  const [sendReminderFilteredInvoice, setSendReminderFilteredInvoice] =
    useState<PaymentEntry[]>([]);

  const getFilteredInvoices = () => {
    const overdueInvoices = invoices.filter((invoice) =>
      isInvoiceOverdue(invoice.dueDate)
    );
    const upcomingInvoices = invoices.filter(
      (invoice) => !isInvoiceOverdue(invoice.dueDate)
    );
    return { overdueInvoices, upcomingInvoices };
  };

  const generatePaymentData = (filteredInvoices: Invoice[]) => {
    return customers.map((customer) => ({
      customerId: customer,
      invoiceIds: filteredInvoices
        .filter(
          (invoice) =>
            invoice.customerName.trim().toLowerCase() ===
            customer.name.trim().toLowerCase()
        )
        .map((invoice) => invoice.invoiceId),
    }));
  };

  const handleEmailAction = (tab: string) => {
    const { overdueInvoices, upcomingInvoices } = getFilteredInvoices();
    let filteredInvoices: Invoice[] = [];

    if (tab === TabConfig.REQUEST_PAYMENT) {
      filteredInvoices = overdueInvoices;
      setRenderButtonContent((prev) => ({
        ...prev,
        [TabConfig.REQUEST_PAYMENT]: "note",
      }));
    } else {
      filteredInvoices = upcomingInvoices;
      setRenderButtonContent((prev) => ({
        ...prev,
        [TabConfig.SEND_REMINDER]: "note",
      }));
    }

    const paymentData = generatePaymentData(filteredInvoices);
    console.log(`${tab} data:`, paymentData);

    if (tab === TabConfig.REQUEST_PAYMENT) {
      setPaymentRequestFilteredInvoice(paymentData);
    } else {
      setSendReminderFilteredInvoice(paymentData);
    }
    onRequestPayment();
  };

  const handleSendEmail = () => {
    handleEmailAction(activeTab);
  };

  const handleClose = () => {
    onPaymentDataSend(
      paymentRequestFilteredInvoice,
      sendReminderFilteredInvoice
    );
    onClose();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (actionButtonTitle.includes("Send Reminder")) {
      setActiveTab(TabConfig.SEND_REMINDER);
    }
    if (actionButtonTitle.includes("Request Payment")) {
      setActiveTab(TabConfig.REQUEST_PAYMENT);
    }
  }, [actionButtonTitle]);

  const { overdueInvoices, upcomingInvoices } = getFilteredInvoices();

  const uniqueCustomers = (invoices: Invoice[]) => {
    return Array.from(
      new Set(
        invoices.map((invoice) => {
          const customer = customers.find(
            (customer) =>
              customer.name.toLowerCase() === invoice.customerName.toLowerCase()
          );
          return customer ? customer.name : null;
        })
      )
    ).filter(Boolean);
  };

  const overdueCustomers = uniqueCustomers(overdueInvoices);
  const upcomingCustomers = uniqueCustomers(upcomingInvoices);

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeIcon} onClick={handleClose}>
          &times;
        </span>

        {overdueInvoices.length > 0 && upcomingInvoices.length > 0 && (
          <div className={styles.tabContainer}>
            {Object.values(TabConfig).map((tab) => (
              <div
                key={tab}
                className={`${styles.modalTitle} ${
                  activeTab === tab ? styles.active : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </div>
            ))}
          </div>
        )}

        <div className={styles.tabContent}>
          {activeTab === TabConfig.REQUEST_PAYMENT &&
            overdueInvoices.length > 0 && (
              <div className={styles.invoiceDetailsContainer}>
                <div className={styles.invoiceTypeTitle}>Request Payment</div>
                <Summary
                  invoiceCount={overdueInvoices.length}
                  customerCount={overdueCustomers.length}
                  totalAmount={calculateTotalOverdueAmount(overdueInvoices)}
                  customerName={
                    overdueCustomers.length > 1
                      ? "Customers"
                      : overdueCustomers[0]
                  }
                />
              </div>
            )}

          {activeTab === TabConfig.SEND_REMINDER &&
            upcomingInvoices.length > 0 && (
              <div className={styles.invoiceDetailsContainer}>
                <div className={styles.invoiceTypeTitle}>Send Reminder</div>
                <Summary
                  invoiceCount={upcomingInvoices.length}
                  customerCount={upcomingCustomers.length}
                  totalAmount={calculateTotalOverdueAmount(upcomingInvoices)}
                  customerName={
                    upcomingCustomers.length > 1
                      ? "Customers"
                      : upcomingCustomers[0]
                  }
                />
              </div>
            )}
        </div>

        {renderButtonContent[activeTab] === "button" ? (
          <div className={styles.sendRequestButtonContainer}>
            <div className={styles.sendRequestButton} onClick={handleSendEmail}>
              <div>
                {activeTab === TabConfig.REQUEST_PAYMENT
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
                selected invoices.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
