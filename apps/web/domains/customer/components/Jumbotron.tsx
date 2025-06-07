import {
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  DateValue,
  Input,
} from "@heroui/react";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface Filter {
  date: DateValue | null;
  start_time: string | (readonly string[] & string) | undefined;
  end_time: string | (readonly string[] & string) | undefined;
}
const Jumbotron = () => {
  const [filter, setFilter] = useState<Filter>({
    date: null,
    start_time: "06:00",
    end_time: "12:00",
  });

  console.log({ filter });

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
      <Card className="absolute max-w-[600px] w-full -bottom-20">
        {/* <CardHeader className="bg-primary">
          Choose when you need a parking spot
          <h3>Choose Date and Time</h3>
        </CardHeader> */}
        <CardBody className=" space-y-6">
          <div className="flex space-x-3 items-end">
            <DatePicker
              label="Date"
              labelPlacement="outside"
              value={filter.date}
              onChange={(e) => {
                setFilter((p) => ({ ...p, date: e }));
              }}
            />
            <Input
              type="time"
              value={filter.start_time}
              labelPlacement="outside"
              label="Start Time"
              onChange={(e) => {
                setFilter((p) => ({ ...p, start_time: e.target.value }));
              }}
            />
            {/* <span className="text-xs text-neutral-500 mb-3.5">until</span> */}
            <Input
              type="time"
              className="w-full"
              value={filter.end_time}
              labelPlacement="outside"
              label="End Time"
              onChange={(e) => {
                setFilter((p) => ({ ...p, end_time: e.target.value }));
              }}
            />
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
