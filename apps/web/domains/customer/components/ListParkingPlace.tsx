"use client";
import { Card, CardBody } from "@heroui/react";
import React, { useState, useEffect } from "react";
import ConfirmReservation from "./ConfirmReservation";
import { Building } from "lucide-react";
import { useFloorCustomerStores } from "../stores/floor.customer";
import FloorSkeleton from "./FloorSkeleton";
import moment from "moment";
import { FLoorCustomerType } from "../types";

const ListParkingPlace = () => {
  const { getFloorCustomer, data, loadingList, selectedData, setSelectedData } =
    useFloorCustomerStores();
  const [dialog, setDialog] = useState({
    reservation: false,
  });
  const handleReservation = (item: FLoorCustomerType) => {
    setDialog((p) => ({ ...p, reservation: true }));
  };

  useEffect(() => {
    getFloorCustomer({
      start_time: moment().set({ hour: 6, minute: 0, second: 0 }).toDate(),
      end_time: moment().set({ hour: 12, minute: 0, second: 0 }).toDate(),
    });
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
                    const isHaveReservationUnpaid = val.transaction.some(
                      (sm) => sm.status == "unpaid"
                    );
                    const isHaveReservationPaid = val.transaction.some(
                      (sm) => sm.status == "paid"
                    );
                    return (
                      <Card
                        key={key2}
                        onPress={() => {
                          setSelectedData({
                            floor_name: item.name,
                            space_id: val.id,
                            space_name: val.name,
                            is_reservation_unpaid: isHaveReservationUnpaid,
                            is_reservation_done: isHaveReservationPaid,
                            transaction_id: val.transaction[0]?.id,
                          });
                          handleReservation(item);
                        }}
                        isHoverable={key2 != 5}
                        isPressable
                        className={`h-[60px] ${isHaveReservationUnpaid && "bg-yellow-100 hover:!bg-yellow-100"}  ${key2 == 5 && "bg-neutral-200"}`}
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
