import React from "react";
import Checkbox from "../Checkbox/Checkbox";
import styles from "./CustomerDetails.module.scss";
import { customerDetails } from "../../constants/customerDetailsMapping";
import { CustomerDetailsProps } from "../../types/customerDetailsPropsTypes";

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  customer,
  isChecked,
  isPartiallyChecked,
  onCheckboxChange,
}) => {
  return (
    <>
      <Checkbox
        isChecked={isChecked}
        isPartiallyChecked={isPartiallyChecked}
        onChange={onCheckboxChange}
      />
      <div className={styles.customerName}>{customer.name}</div>
      <div className={styles.customerTable}>
        <div className={styles.customerHeader}>
          {customerDetails.map((detail) => (
            <span key={detail.key}>{detail.label}</span>
          ))}
        </div>
        <div className={styles.customerRow}>
          {customerDetails.map((detail) => (
            <span key={detail.key}>
              {typeof customer[detail.key] === "string" ||
              typeof customer[detail.key] === "number"
                ? customer[detail.key]
                : ""}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
