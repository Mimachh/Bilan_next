import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";


const Hero = () => {
  return (
    <section
      className="bg-black
   text-white relative"
    >
      {/* <RootNav /> */}
      <div
        className="z-[5] absolute inset-0 element
    "
      />
      <div className="bg-transparent md:grid md:grid-cols-12 h-[90vh] md:min-h-[calc(110vh-0.5rem)]  max-w-7xl mx-auto px-4">
        <div className="relative z-[6] md:col-span-6 flex items-center md:h-full h-screen">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="gradient_primary_text font-extrabold text-7xl md:text-[110px] leading-[5.5rem]">
                Bravo Macron.
              </h1>
              <div className="">
                <p className="leading-6 text-neutral-200">
                  Un homme, deux quinquennats, un bilan.
                </p>
                <p className="leading-6 text-neutral-200">
                  Découvrer en temps réel le désastre du Mozart de la finance.
                </p>
              </div>
            </div>
            <Button
              type="button"
              className="h-12"
              size={"lg"}
              variant={"primaryColor"}
            >
              Voir le bilan
            </Button>
          </div>
        </div>
        <div className="absolute -z-0 top-0 right-0 bottom-0 md:col-span-6 flex items-center">
          <div className="w-full h-full">
            <Image
              className="w-full h-full object-cover"
              src={"/assets/macron/1_no_bg.png"}
              width={650}
              priority
              height={850}
              alt="Macron"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
