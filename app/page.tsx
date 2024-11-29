"use client";

import Image from "next/image";
import ScratchCard from "./component/scratch-card";
import { useState, useEffect } from "react";

export default function Home() {
  const [windowHeight, setWindowHeight] = useState("100vh");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(`${window.innerHeight}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div
      className="flex flex-col items-center gap-4 justify-center overflow-hidden"
      style={{ height: windowHeight }}
    >
      <p> Scratch to reveal location</p>
      <div className="w-full max-w-[300px] aspect-square">
        <ScratchCard imageUrl="./logo.png" width={300} height={300} />
      </div>
    </div>
  );
}
