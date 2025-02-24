"use client";
import React, { useState } from "react";
import SingleCounter from "../compteur/single-counter";
import ProgressBar from "./progress-bar";
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { XTwitter } from "../svg";

interface Props {
  counters: any[];
  now: number;
  startOfYear: number;
}

const HeroSlide = (props: Props) => {
  const { counters, now, startOfYear } = props;
  const [index, setIndex] = useState(0);

  const intervalTime = 5000;

  const handleSlideChange = () => {
    setIndex((prevIndex) => (prevIndex + 1) % counters.length);
  };

  const url = "https://france-chaos.fr";
  return (
    <div className="bg-black text-white flex justify-center items-center min-h-[60vh] md:min-h-[80vh] w-full relative px-6">
      <ProgressBar
        intervalTime={intervalTime}
        onComplete={handleSlideChange}
        direction="width"
        className="z-10 bottom-0 left-0 h-[1px] bg-primaryColor w-full"
      />
      <div className="text-center absolute top-0 left-0 w-full h-full flex justify-center items-center">
        {counters.map((counter: any, i: number) => (
          <div
            key={i}
            className={`absolute w-full flex flex-col items-center transition-opacity duration-500 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="h-[90px] md:h-[150px]">
              <p className="font-madeTommy gradient_primary_text font-medium text-xl">
                {counter.title}
              </p>
              {counter.stat && (
                <SingleCounter
                  className="text-3xl md:text-7xl"
                  now={now}
                  startOfYear={startOfYear}
                  stat={counter.stat}
                />
              )}
            </div>
          </div>
        ))}

        {/* Partie réseaux fixée en bas */}
        <div className="font-madeTommy absolute bottom-[50px] md:bottom-[140px] left-0 w-full text-center">
          <p className="text-2xl font-bold">#PartageTonChaos</p>
          <div className="flex justify-center items-center space-x-4 mt-5">
            <ul className="flex space-x-4">
              <li>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primaryColor transition-all"
                >
                  <Facebook />
                </Link>
              </li>

              <li>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(
                    "Découvrez le chaos Français sur France Chaos ! #PartageTonChaos"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-primaryColor transition-all"
                >
                  <XTwitter className="w-7 h-7" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
