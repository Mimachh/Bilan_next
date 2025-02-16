"use client"
import { formatNumber } from "@/app/helper/formatNumber";
import { cn } from "@/lib/utils";
import { Statistic } from "@/types/statistic";
import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
  startOfYear: number;
  now: number;
  stat: Statistic;
}
const SingleCounter = (props: Props) => {
  const { className, stat, now, startOfYear } = props;
  const [debt, setDebt] = useState(0);
  const [loading, setLoading] = useState(true);
  const type = stat.isPrice ? "price" : "number";
  const annualNumber = stat.stat_reference_previous_year;
  const refreshRate = stat.refresh?.value ? stat.refresh.value : 1000;
  const statToAdd = stat.has_starting_stat_to_add
    ? stat.starting_stat_to_add
    : null;
  const isStatic = stat.isStatic;

    useEffect(() => {  
      const secondsInYear =
        (new Date().getFullYear() % 4 === 0 ? 366 : 365) * 86400;
  
      const elapsedMilliseconds = now - startOfYear;
  
      const elapsedRefreshes = elapsedMilliseconds / refreshRate;
  
      const incrementPerRefresh =
        (annualNumber / secondsInYear) * (refreshRate / 1000);
  
      const initialNumber =
        incrementPerRefresh * elapsedRefreshes + (statToAdd || 0);
    
      setDebt(initialNumber);
      setLoading(false);
      if (!isStatic) {
        const interval = setInterval(() => {
          setDebt((prevDebt) => prevDebt + incrementPerRefresh);
        }, refreshRate);
  
        return () => clearInterval(interval);
      }
    }, [annualNumber, refreshRate, now, startOfYear, statToAdd, isStatic]);
  
  return (
    <div className={cn(className, "text-7xl font-bold font-robotoMonospace tracking-tighter")}>
      {formatNumber(debt, type)}
    </div>
  );
};

export default SingleCounter;
