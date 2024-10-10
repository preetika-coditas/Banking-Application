import React, { useState } from "react";
import { CustomerData } from "../../constants";
import { Customer, Invoice } from "../../types/customerTableTypes";
import AccordionCard from "../Accordion/Accordion";
import CustomerDetails from "../CustomerDetails/CustomerDetails";
import Pagination from "../Pagination/Pagination";
import styles from "./CustomerTablePage.module.scss";
import Modal from "../Modal/Modal";
import { isInvoiceOverdue } from "../Helper/invoices";

const CustomerTablePage: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);
  const [customerDetails, setCustomerDetails] = useState<Customer[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const customersPerPage = 5;

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

  return (
    <div>
      <div
        className={`${styles.actionButtonContainer} ${
          selectedInvoices.length === 0 ? styles.disabled : ""
        }`}
        onClick={handleOpenModal}
      >
        {getActionButtonTitle()}
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
          onClose={handleCloseIcon}
          customers={customerDetails}
          invoices={selectedInvoices}
          actionButtonTitle={getActionButtonTitle()} // Pass the action button title
        />
      )}
    </div>
  );
};

export default CustomerTablePage;
