// // import React from "react";
// // import styles from "./Checkbox.module.scss";

// // interface CheckboxProps {
// //   isChecked: boolean;
// //   onChange: () => void;
// // }

// // const Checkbox: React.FC<CheckboxProps> = ({ isChecked, onChange }) => {
// //   return (
// //     <input
// //       type="checkbox"
// //       className={styles.checkbox}
// //       checked={isChecked}
// //       onChange={onChange}
// //     />
// //   );
// // };

// // export default Checkbox;

// import React from "react";
// import styles from "./Checkbox.module.scss";

// interface CheckboxProps {
//   isChecked: boolean;
//   isPartiallyChecked?: boolean; // Optional prop for partial state
//   onChange: () => void;
// }

// const Checkbox: React.FC<CheckboxProps> = ({
//   isChecked,
//   isPartiallyChecked,
//   onChange,
// }) => {
//   return (
//     <input
//       type="checkbox"
//       checked={isChecked}
//       onChange={onChange}
//       className={isPartiallyChecked ? styles.partialChecked : styles.checkbox}
//     />
//   );
// };

// export default Checkbox;

import React from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  isChecked: boolean;
  isPartiallyChecked?: boolean; // Optional prop for partial state
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
      className={`${styles.checkbox} ${
        isPartiallyChecked ? styles.partialChecked : ""
      }`}
    />
  );
};

export default Checkbox;
