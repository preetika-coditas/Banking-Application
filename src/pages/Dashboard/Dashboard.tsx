import CustomerTablePage from "../../components/CustomerTablePage/CustomerTablePage";
import styles from "./dashboard.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <CustomerTablePage />
    </div>
  );
};

export default Dashboard;
