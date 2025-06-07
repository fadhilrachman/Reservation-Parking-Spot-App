"use client";
import { Card, CardBody } from "@heroui/react";
import React, { useState, useEffect } from "react";
import ConfirmReservation from "./ConfirmReservation";
import { Building } from "lucide-react";
import { useFloorCustomerStores } from "../stores/floor.customer";
import FloorSkeleton from "./FloorSkeleton";

const ListParkingPlace = () => {
  const { getFloorCustomer, data, loadingList } = useFloorCustomerStores();
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

  useEffect(() => {
    getFloorCustomer();
  }, []);

  return (
    <div className="mt-[120px] px-6 md:px-[60px]  lg:px-[160px] ">
      <h3 className="text-xl font-semibold mb-5">Available Parking Spots</h3>
      <div className="space-y-7">
        {loadingList ? (
          <FloorSkeleton />
        ) : (
          data.map((item, key) => {
            return (
              <div className="space-y-4" key={key}>
                <div className="text-primary border-b  w-full flex items-center space-x-2">
                  <Building size={18} />
                  <h3 className=" text-xl">{item.name}</h3>
                </div>{" "}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                  {item.space.map((val, key2) => {
                    return (
                      <Card
                        key={key2}
                        onPress={() => {
                          //   if (val == 5) {
                          handleReservation();
                          //   }
                        }}
                        isHoverable={key2 != 5}
                        isPressable
                        className={`h-[60px] ${key2 == 5 && "bg-neutral-200"}`}
                      >
                        <CardBody className="flex items-center justify-center h-full w-full">
                          {key2 == 5 ? (
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
            );
          })
        )}
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
