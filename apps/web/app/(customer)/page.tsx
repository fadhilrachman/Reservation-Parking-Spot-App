"use client";
import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { Button, Input } from "@heroui/react";
import Home from "../../domains/customer/components/Home";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function HomePage() {
  return <Home />;
}
