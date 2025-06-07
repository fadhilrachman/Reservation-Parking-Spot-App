import React from "react";
import NavbarCustomer from "../../domains/customer/components/NavbarCustomer";
import Sidebar from "../../domains/officer/components/Sidebar";

const LayoutOfficer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarCustomer />
      <div className="min-h-[90vh] flex">
        <Sidebar />
        <div className="border flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};

export default LayoutOfficer;
