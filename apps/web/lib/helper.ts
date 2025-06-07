import { DateValue } from "@heroui/react";
import moment from "moment";

export function formatHeroUIDateValue(dateValue: DateValue) {
  const jsDate = new Date(
    dateValue?.year,
    dateValue?.month - 1,
    dateValue?.day
  );
  return moment(jsDate).format("D MMMM YYYY");
}

export function formarRupiah(number: number) {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
  return formatted;
}
