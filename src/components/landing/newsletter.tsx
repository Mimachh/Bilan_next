import React from "react";
import { FacebookLogo, TwitterLogo } from "../svg";
import NewsletterForm from "../forms/newsletter";

const Newsletter = () => {
  return (
    <section className="bg-neutral-950 h-[35rem] md:min-h-[95vh]">
      <div className="flex-col flex items-center justify-center h-full w-full space-y-12">
        <div className="md:px-2 px-4 mx-auto w-full  md:max-w-4xl md:space-y-4">
          <div className="mt-[-43px] md:mt-[-65px]">
            <ul className="flex justify-center items-center md:w-md md:mb-6">
              <li className="">
                <FacebookLogo
                  className=" 
            text-[#c8bdb0] hover:text-primaryColor transition-all duration-300 cursor-pointer w-[85px] h-[85px] 
            p-[30px]
            "
                />
              </li>
              <li>
                <TwitterLogo
                  className=" 
            text-[#c8bdb0] hover:text-primaryColor transition-all duration-300 cursor-pointer w-[85px] h-[85px] 
            p-[30px]
            "
                />
              </li>
            </ul>
          </div>
          <h2
            className="gradient_primary_text  font-bold text-3xl md:text-6xl text-center  
    "
          >
            Restez Informé
          </h2>
          <p className="text-center text-sm text-gray-300 w-full md:max-w-lg mx-auto">
            Inscrivez-vous à notre newsletter pour être informé des dernières
            actualités et des dernières stats.
          </p>
        </div>
        <div className="px-12 md:px-2 w-full md:w-fit max-w-lg mx-auto">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
