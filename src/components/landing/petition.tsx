import React from "react";

import Image from "next/image";
import PetitionForm from "../forms/petition-form";

const Petition = () => {
  const gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 94%, .08) 0, hsla(210, 100%, 70%, .04) 50%, hsla(210, 100%, 60%, .02) 80%)";
  const gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 94%, .07) 0, hsla(210, 100%, 70%, .03) 80%, transparent 100%)";
  const gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 94%, .05) 0, hsla(210, 100%, 60%, .025) 80%, transparent 100%)";
  
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

        <div className="flex-col md:flex-row flex gap-2 my-8">
          <div className="">
            <div className="w-full h-[580px] relative">
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              {/* <SpotlightAnimated
                gradientFirst={gradientFirst}
                gradientSecond={gradientSecond}
                gradientThird={gradientThird}
              /> */}
              <Image
                className="w-full h-full object-cover"
                src={"/assets/hanouna.png"}
                width={900}
                priority={false}
                height={900}
                alt="Macron"
              />
            </div>
          </div>
          <div className="h-auto flex items-center">
              <PetitionForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Petition;
