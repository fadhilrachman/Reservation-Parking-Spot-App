import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Calendar, Coins, MapPin, Timer } from "lucide-react";
import React from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}
const ConfirmReservation = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Reservation</ModalHeader>
          <ModalBody className="px-7 ">
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="">Floor 1</p>
                  <p className="text-neutral-500 font-normal">A1</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 border-b pb-2">
                <Timer size={18} className="text-neutral-500 mt-0.5" />
                <div>
                  <p className="">Today, 2:00 PM - 4:00 PM</p>
                  <p className="text-neutral-500 font-normal">2 hours</p>
                </div>
              </div>
              <div className="border-b pb-2 font-light ">
                <div className="flex justify-between items-center">
                  <p>Parking Fee (2 hours)</p>
                  <p>Rp 30,000</p>
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
            <Button color="primary" onPress={onOpenChange}>
              Submit
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmReservation;
