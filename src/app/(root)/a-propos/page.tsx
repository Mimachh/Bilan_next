import React from "react";

const Page = () => {
  return (
    <div className="text-black">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
            <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
              Qui sommes-nous ?
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Qui sommes-nous ? Nous sommes deux Français âgés de 28 et 33
                ans, originaires de la France rurale. Deux Français préoccupés
                par l’état de dégradation de notre pays, car c’est notre
                génération, ainsi que celle de nos enfants, qui paiera les
                conséquences des politiques menées ces 40 dernières années. Nous
                n’avons aucune appartenance politique, nous nous considérons
                comme de simples et humbles patriotes. À travers notre
                initiative France Chaos, un site de projections statistiques en
                temps réel basé sur les résultats des années passées, nous
                souhaitons alerter les Français sur l'accélération de la
                dégradation du pays, l'ampleur de la dette qui s’aggrave à une
                vitesse folle, ainsi que sur l’insécurité grandissante. Parce
                que nous estimons que vous avez le droit de savoir. Vos proches
                ont également droit à cette information. Nous vous encourageons
                à partager largement notre site internet. Aidez-nous dans ce
                combat.
              </p>
            </div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </div>
  );
};

export default Page;
