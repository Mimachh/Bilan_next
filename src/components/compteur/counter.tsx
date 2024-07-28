"use client";

import { Statistic } from "@/types/statistic";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Eye, LineChart } from "lucide-react";
import { Separator } from "../ui/separator";

interface Props {
  startOfYear: number;
  now: number;
  stat: Statistic;
}
const Counter = (props: Props) => {
  const { now, startOfYear, stat } = props;
  const [debt, setDebt] = useState(0);
  const [loading, setLoading] = useState(true);

  const annualNumber = stat.stat_reference_previous_year;
  const refreshRate = stat.refresh?.value ? stat.refresh.value : 1000;
  const statToAdd = stat.has_starting_stat_to_add
    ? stat.starting_stat_to_add
    : null;
  const isStatic = stat.isStatic;
  const type = stat.isPrice ? "price" : "number";

  useEffect(() => {
    // const startOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();

    const secondsInYear =
      (new Date().getFullYear() % 4 === 0 ? 366 : 365) * 86400;

    const elapsedMilliseconds = now - startOfYear;

    const elapsedRefreshes = elapsedMilliseconds / refreshRate;

    const incrementPerRefresh =
      (annualNumber / secondsInYear) * (refreshRate / 1000);

    const initialNumber =
      incrementPerRefresh * elapsedRefreshes + (statToAdd || 0);

    // console.log({
    //   secondsInYear,
    //   elapsedMilliseconds,
    //   elapsedRefreshes,
    //   incrementPerRefresh,
    //   initialNumber,
    // });

    setDebt(initialNumber);
    setLoading(false);
    if (!isStatic) {
      const interval = setInterval(() => {
        setDebt((prevDebt) => prevDebt + incrementPerRefresh);
      }, refreshRate);

      return () => clearInterval(interval);
    }
  }, [annualNumber, refreshRate, now, startOfYear, statToAdd, isStatic]);

  const formatNumber = (value: number, type: "price" | "number") => {
    if (type === "price") {
      return (
        value
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          .replace(".", ",") + " €"
      );
    } else {
      return Math.ceil(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  };

  return (
    <div className="my-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1.5">
            <h4 className="font-sans font-medium text-base">{stat.name} : </h4>
            <p className="font-robotoMonospace text-neutral-800">{formatNumber(debt, type)}</p>
          </div>
          <div className="space-x-1.5">
            <Button variant={"outlinePrimaryColor"} size={"sm_icon"}>
              <LineChart size={12} />
            </Button>
            <Button variant={"outlinePrimaryColor"} size={"sm_icon"}>
              <Eye size={12} />
            </Button>
          </div>
          
        </div>
      )}
      <Separator />
    </div>
  );
};

export default Counter;
