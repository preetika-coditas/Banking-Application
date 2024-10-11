import styles from "./Modal.module.scss";
import { summaryDetails } from "../../constants/modalSummary";
import { SummaryProps } from "../../types/modalSummaryPropsTypes";

export const Summary: React.FC<SummaryProps> = ({
  invoiceCount,
  customerCount,
  totalAmount,
  customerName,
}) => {
  const summaryData: Omit<SummaryProps, "customerName"> = {
    invoiceCount,
    customerCount,
    totalAmount,
  };
  return (
    <>
      <div className={styles.summaryContainer}>
        {summaryDetails.map((detail) => (
          <div key={detail.key} className={styles.summaryItem}>
            <span className={styles.summaryLabel}>{detail.label}</span>
            <span className={styles.summaryValue}>
              {detail.prefix}
              {summaryData[detail.key as keyof typeof summaryData]}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.messageTitle}>Message</div>
      <div className={styles.messageContainer}>
        <div>Hi {`${customerName}`} </div>
        <div>
          Your payment amounting to ₹ {`${totalAmount}`} is overdue. Please
          complete the payment.
        </div>
        <div>Regards,</div>
        <div>Sanjay Kumar</div>
        <div>Senior AR Manager, ABC Company</div>
        <div>+91-12345-67890</div>
      </div>
    </>
  );
};
