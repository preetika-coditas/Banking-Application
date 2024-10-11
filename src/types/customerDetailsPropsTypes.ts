import { Customer } from "./customerTableTypes";

export interface CustomerDetailsProps {
    customer: Customer;
    isChecked: boolean;
    isPartiallyChecked: boolean;
    onCheckboxChange: () => void;
  }