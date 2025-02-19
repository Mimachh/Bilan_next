"use client";
import React, { useState } from "react";
import SingleCounter from "../compteur/single-counter";
import ProgressBar from "./progress-bar";

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

  return (
    <div className="bg-black text-white flex justify-center items-center min-h-[80vh] w-full relative">
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
            <div className="h-[150px]">
              <p className="font-madeTommy gradient_primary_text font-medium text-xl">
                {counter.title}
              </p>
              {counter.stat && (
                <SingleCounter
                  className="text-9xl"
                  now={now}
                  startOfYear={startOfYear}
                  stat={counter.stat}
                />
              )}
            </div>
          </div>
        ))}

        {/* Partie réseaux fixée en bas */}
        <div className="font-madeTommy absolute bottom-[180px] left-0 w-full text-center">
          <p className="text-2xl font-bold">#PartageTonChaos</p>
          <div>Réseaux</div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
