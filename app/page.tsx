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
      className="flex items-center justify-center overflow-hidden"
      style={{ height: windowHeight }}
    >
      <div className="w-full max-w-[300px] aspect-square">
        <ScratchCard
          imageUrl="https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
