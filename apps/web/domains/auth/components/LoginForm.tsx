"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import FormGenerator, {
  DataFormType,
} from "../../../shared/components/FormGenerator";
import { addToast, Button } from "@heroui/react";
import Link from "next/link";
import { useAuthStore } from "../stores/auth.stores";
import { LoginType } from "../type";
import Cookies from "js-cookie";

const LoginForm = () => {
  const { loading, postLogin } = useAuthStore();
  const form = useForm<LoginType>();
  const dataForm: DataFormType[] = [
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
      placeholder: "Enter your email address",
      validation: {
        required: {
          value: true,
          message: "postSpaceOfficerThis is field is required",
        },
      },
    },
  ];

  const handleLogin = async (body: LoginType) => {
    try {
      const result = await postLogin(body);
      addToast({ title: "Login Success ", color: "primary" });
      console.log({ result });

      const token = result.data?.result?.token as string;
      await Cookies.set(process.env.COOKIE_NAME as string, token);
    } catch (error: any) {
      addToast({
        title: " Login Failed",
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
          <h3 className="text-2xl md:text-4xl font-bold">
            Welcome back to Nucleus
          </h3>
          <p className="text-sm md:text-medium text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Distinctio, qui?
          </p>
        </div>
        <FormGenerator
          form={form}
          id="formLogin"
          data={dataForm}
          className=" w-full md:w-3/4"
          onSubmit={handleLogin}
          disabled={!!loading}
        />
        <div className="w-full md:w-3/4 space-y-2">
          <Button
            className="w-full"
            type="submit"
            form="formLogin"
            color="primary"
            isLoading={!!loading}
          >
            Submit
          </Button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
