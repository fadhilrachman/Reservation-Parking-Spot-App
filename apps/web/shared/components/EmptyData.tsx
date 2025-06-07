"use client";

import { Button } from "@heroui/react";
import { FileIcon, PlusCircleIcon } from "lucide-react";

interface EmptyDataStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAddData?: () => void;
}

export function EmptyDataState({
  title = "No Data Available",
  description = "You haven't added any data yet. Click the button below to add your first data.",
  buttonText = "Add Data First",
  onAddData,
}: EmptyDataStateProps) {
  return (
    <div className="flex flex-col items-center justify-center    p-8 text-center ">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 ">
        <FileIcon className="h-10 w-10 text-gray-400 " />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900 ">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 ">{description}</p>
      <Button onPress={onAddData} color="primary" className="mt-6" size="sm">
        <PlusCircleIcon size={16} className="mr-2" />
        {buttonText}
      </Button>
    </div>
  );
}
