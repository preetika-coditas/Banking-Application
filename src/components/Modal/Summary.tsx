import styles from "./Modal.module.scss";

interface SummaryProps {
  invoiceCount: number;
  customerCount: number;
  totalAmount: number;
  customerName: string;
}
export const Summary: React.FC<SummaryProps> = ({
  invoiceCount,
  customerCount,
  totalAmount,
  customerName,
}) => (
  <>
    <div className={styles.summaryContainer}>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}># INVOICES</span>
        <span className={styles.summaryValue}>{invoiceCount}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>TOTAL CUSTOMERS</span>
        <span className={styles.summaryValue}>{customerCount}</span>
      </div>
      <div className={styles.summaryItem}>
        <span className={styles.summaryLabel}>TOTAL OVERDUE AMOUNT</span>
        <span className={styles.summaryValue}>₹{totalAmount}</span>
      </div>
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
