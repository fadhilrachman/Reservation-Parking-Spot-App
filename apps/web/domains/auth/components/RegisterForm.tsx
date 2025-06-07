"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormGenerator, {
  DataFormType,
} from "../../../shared/components/FormGenerator";
import { addToast, Button } from "@heroui/react";
import { useAuthStore } from "../stores/auth.stores";
import { RegisterType } from "../type";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm();
  const { loading, postRegister } = useAuthStore();

  const dataForm: DataFormType[] = [
    {
      name: "name",
      type: "text",
      //   isRequired: true,
      label: "Username",
      placeholder: "Enter your Username address",
      validation: {
        required: {
          value: true,
          message: "postSpaceOfficerThis is field is required",
        },
      },
    },
    {
      name: "email",
      type: "text",
      //   isRequired: true,
      label: "Email",
      placeholder: "Enter your email address",
      validation: {
        required: {
          value: true,
          message: "postSpaceOfficerThis is field is required",
        },
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Invalid email format",
        },
      },
    },
    {
      name: "password",
      type: "password",
      //   isRequired: true,
      label: "Password",
      placeholder: "Enter your password",

      validation: {
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        required: {
          value: true,
          message: "postSpaceOfficerThis is field is required",
        },
      },
    },
    {
      name: "confirm_password",
      type: "password",
      //   isRequired: true,
      label: "Confirm Password",
      placeholder: "Enter your password",
      validation: {
        required: "This field is required",
        validate: (confirmPassword: string) => {
          const { password } = form.getValues();

          if (confirmPassword !== password) {
            return "Confirm password does not match";
          }

          return true;
        },
      },
    },
  ];

  const handleRegister = async (body: RegisterType) => {
    try {
      await postRegister(body);
      addToast({ title: "Register Success ", color: "primary" });
      router.push("/login");
    } catch (error: any) {
      addToast({
        title: " Register Failed",
        color: "danger",
        description: error?.response?.data?.message as string,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 min-h-[100vh]">
      <div className="col-span-3 hidden md:block p-12 h-full border">
        <img
          src="/img/bg_auth.avif"
          alt=""
          className="w-full h-full rounded-xl"
        />
      </div>
      <div className=" col-span-1 md:col-span-3 space-y-6 px-3 sm:px-8 md:px-12 flex flex-col items-center justify-center h-full">
        <div className="space-y-2 text-center">
          <h3 className="text-2xl md:text-4xl font-bold">Welcome to Nucleus</h3>
          <p className="text-sm md:text-medium text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, qui?
          </p>
        </div>
        <FormGenerator
          form={form}
          id="formRegister"
          data={dataForm}
          disabled={!!loading}
          className=" w-full md:w-3/4"
          onSubmit={handleRegister}
        />
        <div className="w-full md:w-3/4">
          <Button
            className="w-full"
            type="submit"
            form="formRegister"
            color="primary"
            isLoading={!!loading}
          >
            Submit
          </Button>
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-primary">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
