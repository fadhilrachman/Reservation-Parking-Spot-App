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
import { useSpaceOfficerStores } from "../stores/space.officer";
import { useFloorOfficerStores } from "../stores/floor.officer";
import { CreateSpaceOfficerType } from "../type";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  mode: "create" | "edit";
}
const FormSpace = ({ isOpen, onOpenChange, mode }: Props) => {
  const { loadingWrite, postSpaceOfficer, selectedData, putSpaceOfficer } =
    useSpaceOfficerStores();
  const { getFloorOfficer, selectedData: selectedDataFloor } =
    useFloorOfficerStores();
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
          message: "postSpaceOfficerThis is field is required",
        },
      },
    },
  ];

  const handleSubmit = async (body: CreateSpaceOfficerType) => {
    try {
      if (mode == "create") {
        await postSpaceOfficer({
          ...body,
          floor_id: selectedDataFloor?.id as string,
        });
      } else {
        await putSpaceOfficer(body, selectedData?.id as string);
      }

      addToast({ title: "Success Create Space", color: "primary" });
      getFloorOfficer();
      form.reset({ name: "" });
      onOpenChange();
    } catch (error) {
      addToast({ title: "Error Create Space", color: "danger" });
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
          <ModalHeader className="capitalize flex flex-col gap-1">
            {mode} Space
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

export default FormSpace;
