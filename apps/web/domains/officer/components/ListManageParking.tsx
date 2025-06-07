"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
} from "@heroui/react";
import {
  Building,
  Car,
  Delete,
  Edit,
  EllipsisVertical,
  Plus,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import AddSpace from "./AddSpace";
import FloorForm from "./FloorForm";

const Menu = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" variant="light" isIconOnly className=" h-6 ">
          {" "}
          <EllipsisVertical size={16} className="text-neutral-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const MenuFloor = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" variant="light" isIconOnly className=" h-6 ">
          {" "}
          <EllipsisVertical size={16} className="text-neutral-500" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        <DropdownItem key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const ListManageParking = () => {
  const [dialog, setDialog] = useState({
    add: false,
    addFloor: false,
    editFalse: false,
  });
  const handleReservation = () => {
    // setDialog((p) => ({ ...p, reservation: true }));
    // addToast({
    //   title: "Spot Unavailable",
    //   description:
    //     "Looks like someone else already booked this spot. Try choosing a different one",
    // });
  };
  return (
    <div className="">
      <h3 className="text-xl font-semibold mb-5">Manage Parking Spots</h3>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className=" w-full border-b text-primary flex justify-between pb-1 items-center">
              <div className="space-x-2  flex items-center">
                <Building size={20} className="" />
                <h3 className="text-xl">Floor 1</h3>
              </div>
              <div className="space-x-1">
                <Button size="sm" variant="light" isIconOnly className=" h-6 ">
                  {" "}
                  <Edit size={16} className="text-neutral-500" />
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  isIconOnly
                  className=" h-6 "
                >
                  {" "}
                  <Trash size={16} className="" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-8 gap-6">
                {[1, 2, 2, 5, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4].map(
                  (val, key) => {
                    return (
                      <Card
                        key={key}
                        onPress={() => {
                          //   if (val == 5) {
                          handleReservation();
                          //   }
                        }}
                        className={`h-[60px] `}
                      >
                        <CardBody>
                          <div className="flex items-center justify-around h-full w-full">
                            <span>A1</span>
                            <Menu />
                          </div>
                        </CardBody>
                      </Card>
                    );
                  }
                )}
                <Card
                  onPress={() => {
                    setDialog((p) => ({ ...p, add: true }));
                  }}
                  isPressable
                  className={`h-[60px] !border-dashed bg-primary-100 border-primary border shadow-none`}
                >
                  <CardBody className="flex text-xs text-center items-center justify-center h-full w-full">
                    Add New Space
                  </CardBody>
                </Card>
              </div>
            </div>
          </CardBody>
        </Card>
        <Button
          startContent={<Plus />}
          variant="flat"
          className="w-full border-dashed border-primary border bg-primary-100"
          onPress={() => {
            setDialog((p) => ({ ...p, addFloor: true }));
          }}
        >
          Add New Floor
        </Button>
      </div>
      <AddSpace
        isOpen={dialog.add}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, add: false }));
        }}
      />
      <FloorForm
        isOpen={dialog.addFloor}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, addFloor: false }));
        }}
      />
    </div>
  );
};

export default ListManageParking;
