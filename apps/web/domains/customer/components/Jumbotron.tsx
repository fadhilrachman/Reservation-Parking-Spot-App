import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Search } from "lucide-react";
import React from "react";
export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];
const Jumbotron = () => {
  return (
    <div className="relative flex items-center justify-center h-[360px] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 bg-no-repeat"
        style={{
          backgroundImage: "url('/img/bg_jumbotron.png')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      <div className="space-y-4 relative z-20">
        <h1 className="text-5xl font-extrabold text-center max-w-[400px] mx-auto">
          Find & Reserve <span className="text-primary">Perfect Parking</span>
        </h1>
        <h3 className="text-xl max-w-[640px] text-center mx-auto">
          Skip the hassle of searching for parking. Reserve your spot in advance
          and arrive with confidence.
        </h3>
      </div>
      <Card className="absolute -bottom-20">
        {/* <CardHeader className="bg-primary">
          Choose when you need a parking spot
          <h3>Choose Date and Time</h3>
        </CardHeader> */}
        <CardBody className="w-[480px] space-y-6">
          <div className="flex space-x-3">
            <DatePicker label="Date" labelPlacement="outside" />
            <Select
              className=""
              label="Time"
              placeholder="Select your time"
              labelPlacement="outside"
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
          <Button startContent={<Search size={18} />} color="primary">
            Search
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Jumbotron;
