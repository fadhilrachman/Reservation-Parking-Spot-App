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
import FormGenerator, {
  DataFormType,
} from "../../../shared/components/FormGenerator";
import { useForm } from "react-hook-form";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}
const AddSpace = ({ isOpen, onOpenChange }: Props) => {
  const form = useForm();
  const dataForm: DataFormType[] = [
    {
      name: "name",
      type: "text",
      //   isRequired: true,
      label: "Space Name",
      placeholder: "Example: A1 ",
      validation: {
        required: {
          value: true,
          message: "This is field is required!",
        },
      },
    },
  ];
  return (
    <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            Add New Space
          </ModalHeader>
          <ModalBody className="px-7 ">
            <FormGenerator
              data={dataForm}
              form={form}
              id="formAddSpace"
              onSubmit={() => {}}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onOpenChange}>
              Close
            </Button>
            <Button color="primary" type="submit" form="formAddSpace">
              Submit
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default AddSpace;
