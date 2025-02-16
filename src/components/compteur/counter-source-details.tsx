"use client";
import { useCredenza } from "@/providers/credenza-provider";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRightFromLine } from "lucide-react";
import { useExtraDataCounter } from "@/store/extra-data-counter-store";
import Loading from "../global/loading";

const CounterSourceDetails = () => {
  const extraData = useExtraDataCounter.use.data();
  const isLoading = useExtraDataCounter.use.isLoading();

  return (
    <div className="pb-5">
      {isLoading ? (
        <div className="h-48 flex items-center justify-center"><Loading /></div>
      ) : (
        <ul className="mt-5 space-y-3">
          {extraData?.sources && extraData?.sources?.length > 0 ? (
            <>
              {extraData?.sources?.map((source, index) => (
                <li key={index}>
                  <a target="_blank" href={source.url ?? ""} className="group">
                    <Card className="grid grid-cols-12 overflow-hidden">
                      <div className="col-span-10">
                        <CardHeader>
                          <CardTitle className="text-[15px]">{source.name}</CardTitle>
                          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
                        </CardHeader>
                        <CardContent className="text-[13px]">{source.description}</CardContent>
                      </div>

                      <div className="border-l group-hover:bg-gray-100 cursor-pointer transition-all bg-gray-50 w-full h-full col-span-2">
                        <div className="h-full flex items-center justify-center w-full">
                          <ArrowRightFromLine
                            className="transition-all group-hover:text-primaryColor scale-75 group-hover:scale-100 stroke-[1.5px] text-neutral-600"
                            size={28}
                          />
                        </div>
                      </div>
                    </Card>
                  </a>
                </li>
              ))}
            </>
          ) : (
            <p>Pas de souces à affichier pour l'instant.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CounterSourceDetails;
