"use client";
import {
  addToast,
  Badge,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
} from "@heroui/react";
import React, { useState } from "react";
import ConfirmReservation from "./ConfirmReservation";
import { Building } from "lucide-react";

const ListParkingPlace = () => {
  const [dialog, setDialog] = useState({
    reservation: false,
  });
  const handleReservation = () => {
    setDialog((p) => ({ ...p, reservation: true }));
    // addToast({
    //   title: "Spot Unavailable",

    //   description:
    //     "Looks like someone else already booked this spot. Try choosing a different one",
    // });
  };
  return (
    <div className="mt-[120px] px-[200px] ">
      <h3 className="text-xl font-semibold mb-5">Available Parking Spots</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="text-primary border-b  w-full flex items-center space-x-2">
            <Building size={18} />
            <h3 className=" text-xl">Floor 1</h3>
          </div>{" "}
          <div className="grid grid-cols-8 gap-6">
            {[1, 2, 2, 5, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4].map((val, key) => {
              return (
                <Card
                  key={key}
                  onPress={() => {
                    //   if (val == 5) {
                    handleReservation();
                    //   }
                  }}
                  isHoverable={val != 5}
                  isPressable
                  className={`h-[60px] ${val == 5 && "bg-neutral-200"}`}
                >
                  <CardBody className="flex items-center justify-center h-full w-full">
                    {val == 5 ? (
                      <img src="/img/car.png" className="h-[30px]" />
                    ) : (
                      "A1"
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <div className="text-primary border-b  w-full flex items-center space-x-2">
            <Building size={18} />
            <h3 className=" text-xl">Floor 1</h3>
          </div>{" "}
          <div className="grid grid-cols-8 gap-6">
            {[1, 2, 2, 5, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4].map((val, key) => {
              return (
                <Card
                  key={key}
                  onPress={() => {
                    //   if (val == 5) {
                    handleReservation();
                    //   }
                  }}
                  isHoverable={val != 5}
                  isPressable
                  className={`h-[60px] ${val == 5 && "bg-neutral-200"}`}
                >
                  <CardBody className="flex items-center justify-center h-full w-full">
                    {val == 5 ? (
                      <img src="/img/car.png" className="h-[30px]" />
                    ) : (
                      "A1"
                    )}
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <ConfirmReservation
        isOpen={dialog.reservation}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, reservation: false }));
        }}
      />
    </div>
  );
};

export default ListParkingPlace;
