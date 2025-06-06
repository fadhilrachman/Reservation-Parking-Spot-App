"use client";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Input, InputProps } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState, ReactNode } from "react";
import { Controller, RegisterOptions, UseFormReturn } from "react-hook-form";

export interface DataFormType extends InputProps {
  type: "text" | "password" | "select" | "file" | "number" | "textarea";
  name: string;
  helperText?: string;
  validation?: RegisterOptions;
  options?: { key: string; label: React.ReactNode }[];
}

interface Props {
  form: UseFormReturn<any>;
  data: DataFormType[];
  onSubmit: (params: any) => void;
  endContent?: ReactNode;
  disabled?: boolean;
  id: string;
  className?: string;
}

const FormGenerator = ({
  form,
  data,
  onSubmit,
  disabled,
  id,
  className,
}: Props) => {
  return (
    <form
      key={id}
      className={`${className} grid   gap-4`}
      id={id}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {data.map((val, key) => {
        if (val.type === "select") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                return (
                  <Autocomplete
                    {...field}
                    disabled={val?.disabled || disabled}
                    endContent={val.endContent}
                    errorMessage={fieldState.error?.message}
                    inputValue={field.value}
                    isInvalid={!!fieldState.error}
                    label={val.label}
                    labelPlacement="outside"
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    onInputChange={(value) => field.onChange(value)}
                  >
                    {(val?.options || []).map((animal) => (
                      <AutocompleteItem key={animal.key}>
                        {animal.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                );
              }}
              rules={val.validation}
            />
          );
        }
        if (val.type === "number") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    disabled={val?.disabled || disabled}
                    endContent={val.endContent}
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                    placeholder={val.placeholder}
                    startContent={val.startContent}
                    type="number"
                    // validationState={fieldState.error ? "invalid" : "valid"}
                    label={val.label}
                    // isRequired={!!val.validation?.required}
                    labelPlacement="outside"
                  />
                );
              }}
              rules={val.validation}
            />
          );
        }
        if (val.type === "text") {
          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => {
                console.log({ fieldState });

                return (
                  <Input
                    {...field}
                    {...val}
                    errorMessage={fieldState.error?.message}
                    isInvalid={!!fieldState.error}
                    type="text"
                    labelPlacement="outside"
                    disabled={val?.disabled || disabled}
                  />
                );
              }}
              rules={val.validation}
            />
          );
        }

        if (val.type === "password") {
          const [isShow, setIsShow] = useState(false);

          return (
            <Controller
              key={key}
              control={form.control}
              name={val.name}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  {...val}
                  endContent={
                    isShow ? (
                      <Eye
                        className="cursor-pointer"
                        size={18}
                        onClick={() => setIsShow((prev) => !prev)}
                      />
                    ) : (
                      <EyeClosed
                        size={18}
                        className="cursor-pointer"
                        onClick={() => setIsShow((prev) => !prev)}
                      />
                    )
                  }
                  errorMessage={fieldState.error?.message}
                  isInvalid={!!fieldState.error}
                  type={isShow ? "text" : "password"}
                  //   validationState={fieldState.error ? "invalid" : "valid"}
                  labelPlacement="outside"
                  // isRequired={!!val.validation?.required}
                  disabled={val?.disabled || disabled}
                />
              )}
              rules={val.validation}
            />
          );
        }
      })}
    </form>
  );
};

export default FormGenerator;
