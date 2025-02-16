import { getCounterBySlug } from "@/actions/root/stat";
import { getCurrentYear } from "@/actions/root/year";
import React from "react";
import SingleCounter from "../compteur/single-counter";

const HeroBeta = async () => {
  const debtCounter = await getCounterBySlug("dette-publique");
  const year = await getCurrentYear();
  const startOfYear = year?.value ? parseInt(year?.value) : 1672527600000;
  const now = new Date().getTime();

  return (
    <div className="bg-black text-white flex justify-center items-center min-h-[75vh] w-full">
      <div className="text-center space-y-5">
        <div className="space-y-3">
          <p className="font-madeTommy gradient_primary_text font-medium text-xl">Votre dette</p>
          {debtCounter && (
            <SingleCounter className="text-9xl" now={now} startOfYear={startOfYear} stat={debtCounter} />
          )}
        </div>
        <div className="font-madeTommy">
          <p className="text-2xl font-bold font-madeTommy">#PartageTonChaos</p>
          <div>Réseaux</div>
        </div>
      </div>
    </div>
  );
};

export default HeroBeta;
