import React from "react";

import Image from "next/image";
import PetitionForm from "../forms/petition-form";
import GoogleCaptchaProvider from "@/providers/google-recaptcha-provider";

const Petition = () => {
  return (
    <div className="bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 ">
        <h4 className="mb-24 text-center text-white text-2xl font-normal">
          Face au déclassement, face à l'insécurité, face à l'effondrement de
          notre économie... <br />
          <span className="uppercase font-5xl font-extrabold">
            FACE AU CHAOS
          </span>
        </h4>

        <div className="flex gap-2 my-8">
          <div className="">
            <div className="w-full h-[580px] relative">
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <Image
                className="w-full h-full object-cover"
                src={"/assets/hanouna.png"}
                width={650}
                priority
                height={900}
                alt="Macron"
              />
            </div>
          </div>
          <div className="h-uto flex items-center">
            <GoogleCaptchaProvider>
              <PetitionForm />
            </GoogleCaptchaProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
