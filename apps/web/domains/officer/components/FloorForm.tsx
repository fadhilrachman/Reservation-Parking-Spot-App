import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useEffect } from "react";
import FormGenerator, {
  DataFormType,
} from "../../../shared/components/FormGenerator";
import { useForm } from "react-hook-form";
import { CreateFLoorOfficerType } from "../type";
import { useFloorOfficerStores } from "../stores/floor.officer";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  mode: "create" | "edit";
}
const FloorForm = ({ isOpen, onOpenChange, mode }: Props) => {
  const {
    postFloorOfficer,
    loadingWrite,
    getFloorOfficer,
    selectedData,
    putFloorOfficer,
  } = useFloorOfficerStores();

  const form = useForm<CreateFLoorOfficerType>();
  const dataForm: DataFormType[] = [
    {
      name: "name",
      type: "text",
      //   isRequired: true,
      label: "Floor Name",
      placeholder: "Example: Floor 1 ",
      validation: {
        required: {
          value: true,
          message: "postSpaceOfficerThis is field is required",
        },
      },
    },
  ];
  const handleSubmit = async (body: CreateFLoorOfficerType) => {
    try {
      if (mode == "create") {
        await postFloorOfficer(body);
      } else {
        await putFloorOfficer(body, selectedData?.id as string);
      }
      addToast({ title: "Success Create Floor", color: "primary" });
      getFloorOfficer();
      form.reset({ name: "" });
      onOpenChange();
    } catch (error) {
      addToast({ title: "Error Create Floor", color: "danger" });
    }
  };

  useEffect(() => {
    if (mode == "edit") {
      form.reset({
        name: selectedData?.name,
      });
    }
  }, [selectedData]);

  return (
    <Modal isOpen={isOpen} size="lg" onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex capitalize flex-col gap-1">
            {mode} Floor
          </ModalHeader>
          <ModalBody className="px-7 ">
            <FormGenerator
              data={dataForm}
              form={form}
              id="formAddSpace"
              onSubmit={handleSubmit}
              disabled={!!loadingWrite}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onOpenChange}>
              Close
            </Button>
            <Button
              isLoading={!!loadingWrite}
              color="primary"
              type="submit"
              form="formAddSpace"
            >
              Submit
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};

export default FloorForm;
