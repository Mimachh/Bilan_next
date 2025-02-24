"use client";
import { useState } from "react";
import Image from "next/image";
import PetitionForm from "../forms/petition-form";
import OpenLetter from "./open-letter";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Petition = () => {
  const [showPetition, setShowPetition] = useState(false);

  return (
    <div className="bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <h4 className="mb-24 text-center text-white text-2xl font-normal">
          Face au déclassement, face à l'insécurité, face à l'effondrement de
          notre économie... <br />
          <span className="uppercase font-5xl font-extrabold">
            FACE AU CHAOS
          </span>
        </h4>

        {/* GRID CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* IMAGE */}
          <div className="relative w-full h-[580px]">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute inset-0 bg-black/30"></div>
            <Image
              className="w-full h-full object-cover"
              src={"/assets/hanouna.png"}
              width={900}
              priority={false}
              height={900}
              alt="Macron"
            />
          </div>

          {/* CONTENU TEXTUEL AVEC ANIMATION */}
          <div className={cn("relative bg-white rounded-2xl p-5 md:p-8 flex flex-col items-center   w-full shadow-lg", showPetition ? "min-h-[580px]" : "md:min-h-[560px] min-h-[600px] lg:min-h-[640px]")}>
            {/* OpenLetter et PetitionForm sont superposés ici */}
            <div className="relative w-full h-full">
              <div
                className={`absolute w-full h-auto transition-all duration-500 flex items-center justify-center ${
                  showPetition
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10 pointer-events-none"
                }`}
              >
                <PetitionForm />
              </div>
              <div
                className={`absolute w-full h-auto transition-all duration-500 flex items-center justify-center ${
                  showPetition
                    ? "opacity-0 -translate-x-10 pointer-events-none"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <OpenLetter />
              </div>
            </div>

            {/* BOUTON SWITCH */}
            <Button
            variant={"destructive"}
              onClick={() => setShowPetition(!showPetition)}
              className="absolute bottom-8"
            >
              {showPetition ? "Voir la lettre" : "Signer la pétition"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
