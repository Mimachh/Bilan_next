import { getCounterBySlug } from "@/actions/root/stat";
import { getCurrentYear } from "@/actions/root/year";
import React from "react";
import HeroSlide from "./hero-slides";


const slides = [
  { slug: "dette-publique", title: "Votre dette" },
  { slug: "deficit-cumule", title: "Déficit cumulé" },
  { slug: "fraude-carte-vitale", title: "Fraude à la carte vitale" },
];

const HeroBeta = async () => {
  const year = await getCurrentYear();
  const startOfYear = year?.value ? parseInt(year?.value) : 1672527600000;
  const now = new Date().getTime();

  const counters = await Promise.all(
    slides.map(async (slide) => ({
      ...slide,
      stat: await getCounterBySlug(slide.slug),
    }))
  );
  return <HeroSlide counters={counters} now={now} startOfYear={startOfYear} />;

};

export default HeroBeta;
