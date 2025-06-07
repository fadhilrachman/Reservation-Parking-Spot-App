import {
  addToast,
  Button,
  DateValue,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Calendar, Coins, MapPin, Timer } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useFloorCustomerStores } from "../stores/floor.customer";
import { formarRupiah, formatHeroUIDateValue } from "../../../lib/helper";
import moment from "moment";
import { useReservationStore } from "../stores/reservation.store";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ConfirmReservation = ({ isOpen, onOpenChange }: Props) => {
  const [price, setPrice] = useState(0);
  const { postReservationCustomer, loading, putReservationCustomer } =
    useReservationStore();
  const { selectedData, start_time, end_time, date, getFloorCustomer } =
    useFloorCustomerStores();
  const start = moment(start_time, "HH:mm");
  const end = moment(end_time, "HH:mm");
  const duration = moment.duration(end.diff(start));
  const hours = duration.asHours();
  const { year, month, day } = date as DateValue;
  const startTime = moment(
    `${year}-${month}-${day} ${start_time}`,
    "YYYY-M-D HH:mm"
  ).toDate();

  const endTime = moment(
    `${year}-${month}-${day} ${end_time}`,
    "YYYY-M-D HH:mm"
  ).toDate();

  const handleReservation = async () => {
    try {
      await postReservationCustomer({
        time_start: startTime,
        time_end: endTime,
        price,
        space_id: selectedData?.space_id as string,
      });
      addToast({ title: "Reservation Success", color: "primary" });
      getFloorCustomer({ start_time: startTime, end_time: endTime });

      onOpenChange();
    } catch (error) {
      addToast({ title: "Reservation Failed", color: "danger" });
    }
  };

  const handleCanceledReservation = async () => {
    try {
      await putReservationCustomer(selectedData?.transaction_id as string);
      addToast({ title: "Cancel Reservation Success", color: "primary" });
      getFloorCustomer({ start_time: startTime, end_time: endTime });
      onOpenChange();
    } catch (error) {
      addToast({ title: "Cancel Reservation Failed", color: "danger" });
    }
  };

  useEffect(() => {
    setPrice(Math.floor(hours) * 10000);
  }, [selectedData, start_time]);

  return (
    <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Reservation Summary
          </ModalHeader>
          <ModalBody className="px-7 ">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="">{selectedData?.floor_name}</p>
                  <p className="text-neutral-500 font-normal">
                    {selectedData?.space_name}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 border-b pb-2">
                <Timer size={18} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="">
                    {formatHeroUIDateValue(date as DateValue)}, {start_time}-{" "}
                    {end_time}
                  </p>
                  <p className="text-neutral-500 font-normal">2 hours</p>
                </div>
              </div>
              <div className="border-b pb-2 font-light ">
                <div className="flex justify-between items-center">
                  <p>Parking Fee ({Math.floor(hours)} hour)</p>
                  <p>{formarRupiah(price)}</p>
                </div>
                <div className="flex text-sm text-neutral-500 justify-between items-center">
                  <p className="">Service Fee</p>
                  <p>Rp 5,000</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p>Total</p>
                <p>Rp 35,000</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onOpenChange}>
              Close
            </Button>
            {!selectedData?.is_reservation_unpaid &&
              !selectedData?.is_reservation_done && (
                <Button
                  color="primary"
                  onPress={handleReservation}
                  isLoading={!!loading}
                >
                  Pay By Cash
                </Button>
              )}
            {selectedData?.is_reservation_unpaid && (
              <Button
                color="warning"
                onPress={handleCanceledReservation}
                isLoading={!!loading}
              >
                Cancel Reservation
              </Button>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmReservation;
