// import React, { useState } from "react";
// import { CustomerData } from "../../constants";
// import { Customer, Invoice } from "../../types/customerTableTypes";
// import AccordionCard from "../Accordion/Accordion";
// import CustomerDetails from "../CustomerDetails/CustomerDetails";

// const CustomerTablePage: React.FC = () => {
//   const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
//   const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);

//   const handleCheckboxChange = (
//     customerId: number,
//     isChecked: boolean,
//     invoices: Invoice[]
//   ) => {
//     if (isChecked) {
//       setSelectedCustomers((prev) => [...prev, customerId]);

//       // Select all invoices for the customer
//       setSelectedInvoices((prev) => [...prev, ...invoices]);
//     } else {
//       setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));

//       // Deselect all invoices for the customer
//       setSelectedInvoices((prev) =>
//         prev.filter(
//           (invoice) =>
//             !invoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//         )
//       );
//     }
//   };

//   const handleInvoiceCheckboxChange = (
//     invoice: Invoice,
//     isChecked: boolean
//   ) => {
//     setSelectedInvoices((prev) => {
//       if (isChecked) {
//         return [...prev, invoice];
//       } else {
//         return prev.filter((inv) => inv.invoiceId !== invoice.invoiceId);
//       }
//     });
//   };

//   console.log("selectedInvoices==>", selectedInvoices);

//   return (
//     <div>
//       {CustomerData.map((customer: Customer) => (
//         <AccordionCard
//           key={customer.customerId}
//           customerId={customer.customerId}
//           invoices={customer.invoices}
//           selectedInvoices={selectedInvoices}
//           onCheckboxChange={handleCheckboxChange}
//           onInvoiceCheckboxChange={handleInvoiceCheckboxChange}
//         >
//           <CustomerDetails
//             customer={customer}
//             isChecked={selectedCustomers.includes(customer.customerId)}
//             onCheckboxChange={() =>
//               handleCheckboxChange(
//                 customer.customerId,
//                 !selectedCustomers.includes(customer.customerId),
//                 customer.invoices
//               )
//             }
//           />
//         </AccordionCard>
//       ))}
//     </div>
//   );
// };

// export default CustomerTablePage;

// import React, { useState } from "react";
// import { CustomerData } from "../../constants";
// import { Customer, Invoice } from "../../types/customerTableTypes";
// import AccordionCard from "../Accordion/Accordion";
// import CustomerDetails from "../CustomerDetails/CustomerDetails";

// const CustomerTablePage: React.FC = () => {
//   const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
//   const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);

//   const handleCheckboxChange = (
//     customerId: number,
//     isChecked: boolean,
//     invoices: Invoice[]
//   ) => {
//     if (isChecked) {
//       setSelectedCustomers((prev) => [...prev, customerId]);
//       setSelectedInvoices((prev) => [...prev, ...invoices]);
//     } else {
//       setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
//       setSelectedInvoices((prev) =>
//         prev.filter(
//           (invoice) =>
//             !invoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//         )
//       );
//     }
//   };

//   const handleInvoiceCheckboxChange = (
//     invoice: Invoice,
//     isChecked: boolean
//   ) => {
//     setSelectedInvoices((prev) => {
//       if (isChecked) {
//         return [...prev, invoice];
//       } else {
//         return prev.filter((inv) => inv.invoiceId !== invoice.invoiceId);
//       }
//     });
//   };

//   const areAllInvoicesSelected = (invoices: Invoice[]) =>
//     invoices.every((invoice) =>
//       selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//     );

//   const isAnyInvoiceSelected = (invoices: Invoice[]) =>
//     invoices.some((invoice) =>
//       selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//     );
//   return (
//     <div>
//       {CustomerData.map((customer: Customer) => (
//         <AccordionCard
//           key={customer.customerId}
//           customerId={customer.customerId}
//           invoices={customer.invoices}
//           selectedInvoices={selectedInvoices}
//           onCheckboxChange={handleCheckboxChange}
//           onInvoiceCheckboxChange={handleInvoiceCheckboxChange}
//         >
//           <CustomerDetails
//             customer={customer}
//             isChecked={selectedCustomers.includes(customer.customerId)}
//             isPartiallyChecked={
//               isAnyInvoiceSelected(customer.invoices) &&
//               !areAllInvoicesSelected(customer.invoices)
//             }
//             onCheckboxChange={() =>
//               handleCheckboxChange(
//                 customer.customerId,
//                 !selectedCustomers.includes(customer.customerId),
//                 customer.invoices
//               )
//             }
//           />
//         </AccordionCard>
//       ))}
//     </div>
//   );
// };

// export default CustomerTablePage;

// import React, { useState } from "react";
// import { CustomerData } from "../../constants";
// import { Customer, Invoice } from "../../types/customerTableTypes";
// import AccordionCard from "../Accordion/Accordion";
// import CustomerDetails from "../CustomerDetails/CustomerDetails";

// const CustomerTablePage: React.FC = () => {
//   const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
//   const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);

//   const handleCheckboxChange = (
//     customerId: number,
//     isChecked: boolean,
//     invoices: Invoice[]
//   ) => {
//     if (isChecked) {
//       setSelectedCustomers((prev) => [...prev, customerId]);
//       setSelectedInvoices((prev) => [...prev, ...invoices]);
//     } else {
//       setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
//       setSelectedInvoices((prev) =>
//         prev.filter(
//           (invoice) =>
//             !invoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//         )
//       );
//     }
//   };

//   const handleInvoiceCheckboxChange = (
//     invoice: Invoice,
//     isChecked: boolean
//   ) => {
//     setSelectedInvoices((prev) => {
//       if (isChecked) {
//         return [...prev, invoice];
//       } else {
//         return prev.filter((inv) => inv.invoiceId !== invoice.invoiceId);
//       }
//     });
//   };

//   // Helper functions to check invoice selection state
//   const areAllInvoicesSelected = (invoices: Invoice[]) =>
//     invoices.every((invoice) =>
//       selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//     );

//   const isAnyInvoiceSelected = (invoices: Invoice[]) =>
//     invoices.some((invoice) =>
//       selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
//     );
//   console.log("slectedInvoice=>", selectedInvoices);
//   return (
//     <div>
//       {CustomerData.map((customer: Customer) => (
//         <AccordionCard
//           key={customer.customerId}
//           customerId={customer.customerId}
//           invoices={customer.invoices}
//           selectedInvoices={selectedInvoices}
//           onCheckboxChange={handleCheckboxChange}
//           onInvoiceCheckboxChange={handleInvoiceCheckboxChange}
//         >
//           <CustomerDetails
//             customer={customer}
//             // Check if any invoice is selected for this customer
//             isChecked={
//               selectedCustomers.includes(customer.customerId) &&
//               isAnyInvoiceSelected(customer.invoices)
//             }
//             isPartiallyChecked={
//               isAnyInvoiceSelected(customer.invoices) &&
//               !areAllInvoicesSelected(customer.invoices)
//             }
//             onCheckboxChange={() =>
//               handleCheckboxChange(
//                 customer.customerId,
//                 !selectedCustomers.includes(customer.customerId),
//                 customer.invoices
//               )
//             }
//           />
//         </AccordionCard>
//       ))}
//     </div>
//   );
// };

// export default CustomerTablePage;

import React, { useState } from "react";
import { CustomerData } from "../../constants";
import { Customer, Invoice } from "../../types/customerTableTypes";
import AccordionCard from "../Accordion/Accordion";
import CustomerDetails from "../CustomerDetails/CustomerDetails";

const CustomerTablePage: React.FC = () => {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);

  const handleCheckboxChange = (
    customerId: number,
    isChecked: boolean,
    invoices: Invoice[]
  ) => {
    if (isChecked) {
      setSelectedCustomers((prev) => [...prev, customerId]);
      setSelectedInvoices((prev) => [...prev, ...invoices]);
    } else {
      setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
      setSelectedInvoices((prev) =>
        prev.filter(
          (invoice) =>
            !invoices.some((inv) => inv.invoiceId === invoice.invoiceId)
        )
      );
    }
  };

  const handleInvoiceCheckboxChange = (
    invoice: Invoice,
    isChecked: boolean,
    customerId: number,
    invoices: Invoice[]
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

      // Check if all invoices for the customer are selected
      const allInvoicesSelected = invoices.every((inv) =>
        newSelectedInvoices.some((selInv) => selInv.invoiceId === inv.invoiceId)
      );

      // Update the customer checkbox state accordingly
      if (allInvoicesSelected) {
        setSelectedCustomers((prev) => [...prev, customerId]);
      } else {
        // If not all invoices are selected, ensure the customer checkbox is not selected
        setSelectedCustomers((prev) => prev.filter((id) => id !== customerId));
      }

      return newSelectedInvoices;
    });
  };

  // Helper functions to check invoice selection state
  const areAllInvoicesSelected = (invoices: Invoice[]) =>
    invoices.every((invoice) =>
      selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
    );

  const isAnyInvoiceSelected = (invoices: Invoice[]) =>
    invoices.some((invoice) =>
      selectedInvoices.some((inv) => inv.invoiceId === invoice.invoiceId)
    );
  console.log("selectedInvoices==>", selectedInvoices);
  return (
    <div>
      {CustomerData.map((customer: Customer) => (
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
              customer.invoices
            )
          }
        >
          {/* <CustomerDetails
            customer={customer}
            // Check if any invoice is selected for this customer
            isChecked={
              selectedCustomers.includes(customer.customerId) &&
              isAnyInvoiceSelected(customer.invoices)
            }
            isPartiallyChecked={
              isAnyInvoiceSelected(customer.invoices) &&
              !areAllInvoicesSelected(customer.invoices)
            }
            onCheckboxChange={() =>
              handleCheckboxChange(
                customer.customerId,
                !selectedCustomers.includes(customer.customerId),
                customer.invoices
              )
            }
          /> */}
          <CustomerDetails
            customer={customer}
            isChecked={
              selectedCustomers.includes(customer.customerId) &&
              !isAnyInvoiceSelected(customer.invoices)
                ? false
                : selectedCustomers.includes(customer.customerId)
            }
            isPartiallyChecked={
              isAnyInvoiceSelected(customer.invoices) &&
              !areAllInvoicesSelected(customer.invoices)
            }
            onCheckboxChange={() =>
              handleCheckboxChange(
                customer.customerId,
                !selectedCustomers.includes(customer.customerId),
                customer.invoices
              )
            }
          />
        </AccordionCard>
      ))}
    </div>
  );
};

export default CustomerTablePage;
