"use client";
import React from "react";
import { Coins, Home, List, LucideBook, User, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const listSidebar = [
    {
      title: "Transaction",
      url: "/transaction",
      icon: Coins,
    },
    {
      title: "Manage Parking",
      url: "/manage-parking",
      icon: List,
    },
  ];

  return (
    <div className="border-r min-w-[300px]  h-full px-4 py-8  space-y-3">
      {listSidebar.map((val, key) => {
        return (
          <div
            key={key}
            className={`${pathName == val.url ? "bg-primary" : "hover:bg-primary-100 "} flex  items-center space-x-2 cursor-pointer py-2 px-3 rounded-xl`}
            onClick={() => {
              router.push(val.url);
            }}
          >
            {<val.icon size={16} />}
            <span>{val.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
