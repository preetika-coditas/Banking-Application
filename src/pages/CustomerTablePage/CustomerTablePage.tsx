import React, { useEffect, useState } from "react";
import { CustomerData } from "../../constants/customersData";
import {
  Customer,
  Invoice,
  PaymentEntry,
} from "../../types/customerTableTypes";
import AccordionCard from "../../components/Accordion/Accordion";
import CustomerDetails from "../../components/CustomerDetails/CustomerDetails";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./CustomerTablePage.module.scss";
import Modal from "../../components/Modal/Modal";
import Checkbox from "../../components/Checkbox/Checkbox";
import { isInvoiceOverdue } from "../../components/Helper/invoices";

const CustomerTablePage: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedCustomerId, setExpandedCustomerId] = useState<number | null>(
    null
  );
  const [requestPaymentData, setRequestPaymentData] = useState<PaymentEntry[]>(
    []
  );
  const [sendReminderPaymentData, setSendReminderPaymentData] = useState<
    PaymentEntry[]
  >([]);
  const customersPerPage = 5;

  const allCustomersSelected = selectedCustomers.length === CustomerData.length;
  const isPartiallySelected =
    selectedCustomers.length > 0 &&
    selectedCustomers.length < CustomerData.length;

  const handleRequestPayment = () => {
    // setIsOpenModal(false);
  };

  const handlePaymentDataSend = (
    paymentRequestFilteredInvoice: PaymentEntry[],
    sendReminderFilteredinvoice: PaymentEntry[]
  ) => {
    setRequestPaymentData(paymentRequestFilteredInvoice);
    setSendReminderPaymentData(sendReminderFilteredinvoice);
    console.log(
      "paymentRequestFilteredInvoice from customer page",
      paymentRequestFilteredInvoice
    );
    console.log(
      "sendReminderFilteredinvoice from customer page",
      sendReminderFilteredinvoice
    );
  };
  const handleSelectAllChange = () => {
    if (allCustomersSelected) {
      setSelectedCustomers([]);
      setSelectedInvoices([]);
      setCustomerDetails([]);
    } else {
      const allInvoices = CustomerData.flatMap((customer) => customer.invoices);
      setSelectedCustomers(CustomerData.map((customer) => customer.customerId));
      setSelectedInvoices(allInvoices);
      setCustomerDetails(CustomerData);
    }
  };

  const handleCheckboxChange = (
    customerId: number,
    isChecked: boolean,
    invoices: Invoice[],
    customer: Customer
  ) => {
    if (isChecked) {
      setSelectedCustomers((prev) => [...prev, customerId]);
      setSelectedInvoices((prev) => [...prev, ...invoices]);
      setCustomerDetails((prev) => [...prev, customer]);
    } else {
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
      setSelectedInvoices((prev) =>
        prev.filter(
          (invoice) =>
            !invoices.some((inv) => inv.invoiceId === invoice.invoiceId)
        )
      );
      setCustomerDetails((prev) =>
        prev.filter((cust) => cust.customerId !== customerId)
      );
    }
  };

  const handleInvoiceCheckboxChange = (
    invoice: Invoice,
    isChecked: boolean,
    customerId: number,
    invoices: Invoice[],
    customer: Customer
  ) => {
    setSelectedInvoices((prev) => {
      let newSelectedInvoices;
      if (isChecked) {
        newSelectedInvoices = [...prev, invoice];
      } else {
        newSelectedInvoices = prev.filter(
          (inv) => inv.invoiceId !== invoice.invoiceId
        );
      }

      const someInvoicesSelected = invoices.some((inv) =>
        newSelectedInvoices.some((selInv) => selInv.invoiceId === inv.invoiceId)
      );

      if (someInvoicesSelected && !selectedCustomers.includes(customerId)) {
        setSelectedCustomers((prev) => [...prev, customerId]);
        setCustomerDetails((prev) => {
          if (!prev.some((cust) => cust.customerId === customerId)) {
            return [...prev, customer];
          }
          return prev;
        });
      }

      if (!someInvoicesSelected) {
        setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
        setCustomerDetails((prev) =>
          prev.filter((cust) => cust.customerId !== customerId)
        );
      }

      return newSelectedInvoices;
    });
  };

  const getActionButtonTitle = () => {
    if (selectedInvoices.length === 0) {
      return "Request Payment / Send Reminder";
    }

    const hasOverdueInvoices = selectedInvoices.some((invoice) =>
      isInvoiceOverdue(invoice.dueDate)
    );
    const hasUpcomingInvoices = selectedInvoices.some(
      (invoice) => !isInvoiceOverdue(invoice.dueDate)
    );

    if (hasOverdueInvoices && hasUpcomingInvoices) {
      return "Request Payment / Send Reminder";
    } else if (hasOverdueInvoices) {
      return "Request Payment";
    } else {
      return "Send Reminder";
    }
  };

  const handleOpenModal = () => {
    if (selectedInvoices.length > 0) {
      setIsOpenModal(true);
    }
  };

  const handleCloseIcon = () => {
    setIsOpenModal(false);
  };

  const paginateCustomers = () => {
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    return CustomerData.slice(indexOfFirstCustomer, indexOfLastCustomer);
  };

  const toggleAccordion = (customerId: number) => {
    setExpandedCustomerId((prev) => (prev === customerId ? null : customerId));
  };

  useEffect(() => {
    console.log("selected customers details ==> ", customerDetails);
  }, [customerDetails]);

  useEffect(() => {
    console.log("selected invoices ==> ", selectedInvoices);
  }, [selectedInvoices]);

  useEffect(() => {
    if (requestPaymentData.length > 0 || sendReminderPaymentData.length > 0) {
      const combinedPaymentData = [
        ...requestPaymentData,
        ...sendReminderPaymentData,
      ];

      // Unchecking invoices
      const newSelectedInvoices = selectedInvoices.filter(
        (selectedInvoice) =>
          !combinedPaymentData.some((paymentEntry) =>
            paymentEntry.invoiceIds.includes(selectedInvoice.invoiceId)
          )
      );

      // Updating selected customers
      const newSelectedCustomers = selectedCustomers.filter((customerId) =>
        combinedPaymentData.every(
          (paymentEntry) =>
            paymentEntry.customerId.customerId !== customerId ||
            paymentEntry.customerId.invoices.some((invoice) =>
              newSelectedInvoices.some(
                (selectedInvoice) =>
                  selectedInvoice.invoiceId === invoice.invoiceId
              )
            )
        )
      );

      // Updating customer details based on filtered customers
      setSelectedInvoices(newSelectedInvoices);
      setSelectedCustomers(newSelectedCustomers);
      setCustomerDetails((prevDetails) =>
        prevDetails.filter((customer) =>
          newSelectedCustomers.includes(customer.customerId)
        )
      );
    }
  }, [requestPaymentData, sendReminderPaymentData]);

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.selectAllCheckbox}>
          <Checkbox
            isChecked={allCustomersSelected}
            isPartiallyChecked={isPartiallySelected}
            onChange={handleSelectAllChange}
          />
          <span>Select All</span>
        </div>

        <div
          className={`${styles.actionButtonContainer} ${
            selectedInvoices.length === 0 ? styles.disabled : ""
          }`}
          onClick={handleOpenModal}
        >
          {getActionButtonTitle()}
        </div>
      </div>

      {paginateCustomers().map((customer: Customer) => (
        <AccordionCard
          key={customer.customerId}
          customerId={customer.customerId}
          invoices={customer.invoices}
          selectedInvoices={selectedInvoices}
          onCheckboxChange={handleCheckboxChange}
          onInvoiceCheckboxChange={(invoice, isChecked) =>
            handleInvoiceCheckboxChange(
              invoice,
              isChecked,
              customer.customerId,
              customer.invoices,
              customer
            )
          }
          isExpanded={expandedCustomerId === customer.customerId}
          onToggleExpansion={() => toggleAccordion(customer.customerId)}
        >
          <CustomerDetails
            customer={customer}
            isChecked={
              selectedCustomers.includes(customer.customerId) &&
              !customer.invoices.some(
                (inv) =>
                  !selectedInvoices.some(
                    (selectedInv) => selectedInv.invoiceId === inv.invoiceId
                  )
              )
            }
            isPartiallyChecked={
              customer.invoices.some((invoice) =>
                selectedInvoices.some(
                  (selectedInv) => selectedInv.invoiceId === invoice.invoiceId
                )
              ) &&
              !customer.invoices.every((invoice) =>
                selectedInvoices.some(
                  (selectedInv) => selectedInv.invoiceId === invoice.invoiceId
                )
              )
            }
            onCheckboxChange={() =>
              handleCheckboxChange(
                customer.customerId,
                !selectedCustomers.includes(customer.customerId),
                customer.invoices,
                customer
              )
            }
          />
        </AccordionCard>
      ))}
      <Pagination
        currentPage={currentPage}
        totalItems={CustomerData.length}
        itemsPerPage={customersPerPage}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
      {isOpenModal && (
        <Modal
          invoices={selectedInvoices}
          customers={customerDetails}
          onClose={handleCloseIcon}
          actionButtonTitle={getActionButtonTitle()}
          onRequestPayment={handleRequestPayment}
          onPaymentDataSend={handlePaymentDataSend}
        />
      )}
    </div>
  );
};

export default CustomerTablePage;
