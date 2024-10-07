import React from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  isChecked: boolean;
  isPartiallyChecked?: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked,
  isPartiallyChecked,
  onChange,
}) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
      className={`${styles.checkboxInputContainer} ${
        isPartiallyChecked ? styles.indeterminate : ""
      }`}
    />
  );
};

export default Checkbox;
