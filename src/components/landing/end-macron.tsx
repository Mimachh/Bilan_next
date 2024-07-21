"use client";
import React, { useEffect, useState } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { FuseeLogo } from "../svg";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (endtime: Date): TimeLeft => {
  const timeTotal = endtime.getTime() - new Date().getTime();
  const timeSeconds = Math.floor((timeTotal / 1000) % 60);
  const timeMinutes = Math.floor((timeTotal / 1000 / 60) % 60);
  const timeHours = Math.floor((timeTotal / (1000 * 60 * 60)) % 24);
  const timeDays = Math.floor(timeTotal / (1000 * 60 * 60 * 24));

  return {
    days: timeDays,
    hours: timeHours,
    minutes: timeMinutes,
    seconds: timeSeconds,
  };
};

const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};

const EndMacron = ({ deadline }: { deadline: Date }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft(deadline);
      setTimeLeft(newTimeLeft);
      setIsLoading(false);
    };

    updateTimer(); // Initial call to set the state immediately
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  if (typeof window === "undefined" || isLoading || timeLeft === null) {
    return <p>Loading...</p>; // Show loading on server render and initial client render
  }

  return (
    <section className="flex flex-col justify-center gap-24 items-center relative w-full min-h-[92vh] bg-neutral-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
<FuseeLogo className="w-20 h-20 relative z-5" />
    <h4 className="relative z-1 text-white font-bold text-3xl md:text-6xl text-center ">Départ de Macron dans :</h4>
      <div className="relative z-1 font-robotoMonospace flex items-center justify-center gap-3 max-w-6xl mx-auto px-4">
        <ItemList time={timeLeft.days} duration="Jours" />
        <ItemList time={timeLeft.hours} duration="Heures" />
        <ItemList time={timeLeft.minutes} duration="Minutes"/>
        <ItemList time={timeLeft.seconds} duration="Secondes"/>
      </div>
      <p className="relative z-1 font-madeTommy font-semibold gradient_primary_text text-4xl leading-[3.5rem]">Courage !</p>
    </section>
  );
};

export default EndMacron;

const ItemList = ({ time, duration }: { time: number, duration: string }) => {
  return (
    <div className="text-center w-[20vw]">
      <div className="bg-neutral-800 rounded-sm shadow font-semibold py-6 px-3 md:px-8 text-lg md:text-4xl text-white">
        {formatTime(time)}
      </div>
      <p className="text-white font-madeTommy">{duration}</p>
    </div>
  );
};
