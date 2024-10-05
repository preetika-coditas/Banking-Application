// import React from "react";
// import { Customer } from "../../types/customerTableTypes";
// import Checkbox from "../Checkbox/Checkbox";
// import styles from "./CustomerDetails.module.scss";

// interface CustomerDetailsProps {
//   customer: Customer;
//   isChecked: boolean;
//   onCheckboxChange: () => void;
// }

// const CustomerDetails: React.FC<CustomerDetailsProps> = ({
//   customer,
//   isChecked,
//   onCheckboxChange,
// }) => {
//   return (
//     <div className={styles.DetailsWrapper}>
//       <Checkbox isChecked={isChecked} onChange={onCheckboxChange} />
//       <div className={styles.customerName}>{customer.name}</div>
//       <div className={styles.customerTable}>
//         <div className={styles.customerHeader}>
//           <span>Customer ID</span>
//           <span>#Total Invoices</span>
//           <span>Outstanding Amount</span>
//           <span>#Overdue Invoices</span>
//           <span>Overdue Amount</span>
//           <span>Credit/Debit Note</span>
//         </div>
//         <div className={styles.customerRow}>
//           <span>{customer.customerId}</span>
//           <span>{customer.totalInvoices}</span>
//           <span>{customer.outstandingAmount}</span>
//           <span>{customer.overdueInvoices}</span>
//           <span>{customer.overdueAmount}</span>
//           <span>{customer.creditDebitNote}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDetails;

import React from "react";
import { Customer } from "../../types/customerTableTypes";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./CustomerDetails.module.scss";

interface CustomerDetailsProps {
  customer: Customer;
  isChecked: boolean;
  isPartiallyChecked: boolean; // New prop to determine partial selection
  onCheckboxChange: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  isChecked,
  isPartiallyChecked,
  onCheckboxChange,
}) => {
  return (
    <div className={styles.DetailsWrapper}>
      <Checkbox
        isChecked={isChecked}
        isPartiallyChecked={isPartiallyChecked} // Pass the partial check state
        onChange={onCheckboxChange}
      />
      <div className={styles.customerName}>{customer.name}</div>
      <div className={styles.customerTable}>
        <div className={styles.customerHeader}>
          <span>Customer ID</span>
          <span>#Total Invoices</span>
          <span>Outstanding Amount</span>
          <span>#Overdue Invoices</span>
          <span>Overdue Amount</span>
          <span>Credit/Debit Note</span>
        </div>
        <div className={styles.customerRow}>
          <span>{customer.customerId}</span>
          <span>{customer.totalInvoices}</span>
          <span>{customer.outstandingAmount}</span>
          <span>{customer.overdueInvoices}</span>
          <span>{customer.overdueAmount}</span>
          <span>{customer.creditDebitNote}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
