"use client";
import {
  addToast,
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
import React, { useState, useEffect } from "react";
import FloorForm from "./FloorForm";
import { useFloorOfficerStores } from "../stores/floor.officer";
import { EmptyDataState } from "../../../shared/components/EmptyData";
import FormSpace from "./FormSpace";
import { useSpaceOfficerStores } from "../stores/space.officer";
import ModalDelete from "../../../shared/components/ModalDelete";

const ListManageParking = () => {
  const { data, getFloorOfficer, loadingList, setSelectedData } =
    useFloorOfficerStores();
  const {
    setSelectedData: setSelectedDataSpace,
    loadingWrite,
    deleteSpaceOfficer,
    selectedData: selectedDataSpace,
  } = useSpaceOfficerStores();

  const [dialog, setDialog] = useState({
    addSpace: false,
    editSpace: false,
    addFloor: false,
    editFloor: false,
    deleteSpace: false,
    deleteFloor: false,
  });

  const handleDeleteSpace = async () => {
    try {
      deleteSpaceOfficer(selectedDataSpace?.id as string);
      addToast({ title: "Success Create Space", color: "primary" });
      getFloorOfficer();
      setDialog((p) => ({ ...p, deleteSpace: true }));
    } catch (error) {
      addToast({ title: "Error Create Space", color: "danger" });
    }
  };

  useEffect(() => {
    getFloorOfficer();
  }, []);

  return (
    <div className="">
      <h3 className="text-xl font-semibold mb-5">Manage Parking Spots</h3>
      <div className="space-y-8">
        {data.map((item, key) => {
          return (
            <Card key={key}>
              <CardHeader>
                <div className=" w-full border-b text-primary flex justify-between pb-1 items-center">
                  <div className="space-x-2  flex items-center">
                    <Building size={20} className="" />
                    <h3 className="text-xl">{item.name}</h3>
                  </div>
                  <div className="space-x-1">
                    <Button
                      size="sm"
                      variant="light"
                      isIconOnly
                      className=" h-6 "
                      onPress={() => {
                        setSelectedData(item);
                        setDialog((p) => ({ ...p, editFloor: true }));
                      }}
                    >
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
                  {item.space.length == 0 ? (
                    <EmptyDataState
                      buttonText="Add New Space"
                      onAddData={() => {
                        setSelectedData(item);
                        setDialog((p) => ({ ...p, addSpace: true }));
                      }}
                    />
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                      {item.space.map((val, key2) => {
                        return (
                          <Card key={key2} className={`h-[60px] `}>
                            <CardBody>
                              <div className="flex items-center justify-around h-full w-full">
                                <span>{val?.name}</span>
                                <Dropdown>
                                  <DropdownTrigger>
                                    <Button
                                      size="sm"
                                      variant="light"
                                      isIconOnly
                                      className=" h-6 "
                                    >
                                      {" "}
                                      <EllipsisVertical
                                        size={16}
                                        className="text-neutral-500"
                                      />
                                    </Button>
                                  </DropdownTrigger>
                                  <DropdownMenu aria-label="Action event example">
                                    <DropdownItem
                                      key="edit"
                                      onPress={() => {
                                        setSelectedDataSpace(val);
                                        setDialog((p) => ({
                                          ...p,
                                          editSpace: true,
                                        }));
                                      }}
                                    >
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem
                                      key="delete"
                                      className="text-danger"
                                      color="danger"
                                      onPress={() => {
                                        setSelectedData(item);
                                        setDialog((p) => ({
                                          ...p,
                                          editSpace: true,
                                        }));
                                      }}
                                    >
                                      Delete file
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </div>
                            </CardBody>
                          </Card>
                        );
                      })}
                      <Card
                        onPress={() => {
                          setSelectedData(item);
                          setDialog((p) => ({ ...p, addSpace: true }));
                        }}
                        isPressable
                        className={`h-[60px] !border-dashed bg-primary-100 border-primary border shadow-none`}
                      >
                        <CardBody className="flex text-xs text-center items-center justify-center h-full w-full">
                          Add New Space
                        </CardBody>
                      </Card>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
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

      {/*/////////////  */}
      {/* DIALOG */}
      {/*/////////////  */}
      <FormSpace
        mode="create"
        isOpen={dialog.addSpace}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, addSpace: false }));
        }}
      />
      <FormSpace
        mode="edit"
        isOpen={dialog.editSpace}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, editSpace: false }));
        }}
      />
      <FloorForm
        mode="create"
        isOpen={dialog.addFloor}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, addFloor: false }));
        }}
      />
      <FloorForm
        mode="edit"
        isOpen={dialog.editFloor}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, editFloor: false }));
        }}
      />
      <ModalDelete
        isOpen={dialog.deleteSpace}
        onOpenChange={() => {
          setDialog((p) => ({ ...p, deleteSpace: false }));
        }}
      />
    </div>
  );
};

export default ListManageParking;
