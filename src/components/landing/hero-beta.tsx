import { getCounterBySlug } from "@/actions/root/stat";
import React from "react";
import HeroSlide from "./hero-slides";
import { getStartOfYear } from "@/lib/const";


const slides = [
  { slug: "dette-publique", title: "Votre dette" },
  { slug: "arcom", title: "Arcom" },
  { slug: "depenses-sociales", title: "Dépenses sociales" },
];

const HeroBeta = async () => {
  // const year = await getCurrentYear();
  // const startOfYear = year?.value ? parseInt(year?.value) : 1672527600000;
  const startOfYear = getStartOfYear;
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
