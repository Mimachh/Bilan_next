import React from "react";
import TitleSection from "../global/title-section";

const About = () => {
  return (
    <div className="text-white py-32 container mx-auto">
      <p className="uppercase text-primaryColor text-center">A propos</p>
      <TitleSection title="Qui sommes-nous ?" classNames="text-center mb-12" />

      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          <p className="tracking-wider leading-7 text-muted/85 font-normal text-[15px] font-montSerrat">
            Nous sommes deux Français âgés de 28 et 33 ans, originaires de la
            France rurale. Deux Français préoccupés par l’état de dégradation de
            notre pays, car c’est notre génération, ainsi que celle de nos
            enfants, qui paiera les conséquences des politiques menées ces 40
            dernières années. <br /> À travers notre
            initiative France Chaos, un site de projections statistiques{" "}
            <span className="font-semibold">en temps réel</span> basé sur les
            chiffres annoncés de différentes sources (PLF 2025, Ministère de l'Intérieur, Insee, etc), nous souhaitons alerter les Français
            sur l'accélération de{" "}
            <span className="font-semibold">la dégradation du pays</span>,
            l'ampleur de <span className="font-semibold">la dette</span> qui
            s’aggrave à une vitesse folle, ainsi que sur l’insécurité
            grandissante. Parce que nous estimons que vous avez le droit de
            savoir. Vos proches ont également droit à cette information. <br />{" "}
            Nous vous encourageons à partager largement notre site internet.{" "}
            <br /> <br />{" "}
            <span className="font-bold text-white">
              Aidez-nous dans ce combat
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
