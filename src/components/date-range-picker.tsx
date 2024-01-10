"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

export function CalendarDateRangePicker({
  className,
  allocationStartTime,
  allocationEndTime
}: any) {

  const fromDate = new Date(allocationStartTime * 1000).toLocaleString()
  const toDate = new Date(allocationEndTime * 1000).toLocaleString()

  return (
    <div className={cn("grid gap-1 border-2 px-2 py-1 rounded-lg justify-start text-left font-normal", className)}>
      <>
        {fromDate} -{" "}
        {toDate}
      </>
    </div>
  );
}
