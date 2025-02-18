"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface ProgressBarProps {
  intervalTime: number;
  onComplete: () => void;
  className?: string;
    direction?: "width" | "height";
}

const ProgressBar = ({
  intervalTime,
  onComplete,
  className,
  direction = "width"
}: ProgressBarProps) => {
  const [progress, setProgress] = useState(100);
  const [startTime, setStartTime] = useState(0);
  // useEffect(() => {
  //   const progressInterval = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       if (prevProgress <= 0) {
  //         onComplete(); // Appeler la fonction callback quand le timer est terminé
  //         return 100; // Reset la barre à 100% quand la progression est terminée
  //       }
  //       return prevProgress - 100 / (intervalTime / 10); // Mise à jour très rapide
  //     });
  //   }, 10); // Rafraîchissement toutes les 10ms

  //   return () => clearInterval(progressInterval);
  // }, [intervalTime, onComplete]);

  useEffect(() => {
    const start = Date.now();
    setStartTime(start);

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const newProgress = 100 - (elapsed / intervalTime) * 100;

      if (newProgress <= 0) {
        setProgress(0);
        onComplete(); // Appel de onComplete quand la progression atteint 0
        return;
      }

      setProgress(newProgress);
      requestAnimationFrame(updateProgress);
    };

    requestAnimationFrame(updateProgress);

    return () => setProgress(100); // Reset si le composant est démonté
  }, [intervalTime, onComplete]);

  return (
    <div
      className={cn("absolute bottom-0 w-full h-1 bg-red-600", className)}
      style={{ [direction]: `${progress}%` }}
    ></div>
  );
};

export default ProgressBar;
