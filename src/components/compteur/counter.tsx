"use client";

import { Statistic } from "@/types/statistic";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Eye, LineChart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useCredenza } from "@/providers/credenza-provider";
import CredenzaModal from "../global/credenza-modal";
import CounterSourceDetails from "./counter-source-details";
import CounterMetadataDetails from "./counter-metadata-details";
import { getSourcesFromStatId } from "@/actions/root/sources";
import { useExtraDataCounter } from "@/store/extra-data-counter-store";
import { formatNumber } from "@/app/helper/formatNumber";

interface Props {
  startOfYear: number;
  now: number;
  stat: Statistic;
}
const Counter = (props: Props) => {
  const { now, startOfYear, stat } = props;
  const [debt, setDebt] = useState(0);
  const [loading, setLoading] = useState(true);

  const {setOpen} = useCredenza()
  const annualNumber = stat.stat_reference_previous_year;
  const refreshRate = stat.refresh?.value ? stat.refresh.value : 1000;
  const statToAdd = stat.has_starting_stat_to_add
    ? stat.starting_stat_to_add
    : null;
  const isStatic = stat.isStatic;
  const type = stat.isPrice ? "price" : "number";


  const extraData = useExtraDataCounter.use.data();
  const setExtraData = useExtraDataCounter.use.setData();
  const setIsLoading = useExtraDataCounter.use.setIsLoading();
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

  const fetchExtraData = async () => {
    setIsLoading(true)
    setExtraData({sources: await getSourcesFromStatId(stat.id)})
    setIsLoading(false)
  }
  return (
    <div className="my-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex items-center justify-between gap-5">
          <div className="space-y-1">
            <h4 className="font-sans font-bold text-base">{stat.name} : </h4>
            <p className="font-robotoMonospace tracking-tight text-neutral-800">
              {formatNumber(debt, type)}
            </p>
          </div>
          <div className="space-x-1.5">
            {/* <Button 
            onClick={() => {
              setOpen(
                <CredenzaModal
                  title="Metadata"
                  subheading="Données supplémentaires concernant le compteur"
                >
                  
                  <CounterMetadataDetails />
                </CredenzaModal>,
                // async () => {
                //   return { stat: await getStatById(rowData?.id) };
                // }
              );
            }}
            variant={"outlinePrimaryColor"} size={"sm_icon"}>
              <LineChart size={12} />
            </Button> */}
            <Button 
            onClick={() => {
              fetchExtraData()
              setOpen(
                <CredenzaModal
                title="Sources"
                subheading="Liste des sources officielles de ayant permis de calculer les projections de ce compteur."
                >
                  <CounterSourceDetails />
                </CredenzaModal>
              );
            }}
            variant={"outlinePrimaryColor"} size={"sm_icon"}>
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
