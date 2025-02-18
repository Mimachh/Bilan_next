import React from "react";
import NewsletterForm from "../forms/newsletter";

const BetaNewsletter = () => {
  return (
    <section className="container h-[25rem] ">
      <div className="bg-neutral-900/70 rounded-xl flex-col flex items-center justify-center h-full w-full space-y-12">
        <div className="md:px-2 px-4 mx-auto w-full  md:max-w-4xl md:space-y-4">
          <h2
            className="text-muted/60 font-bold text-3xl md:text-5xl text-center  
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

export default BetaNewsletter;
