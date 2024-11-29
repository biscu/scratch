"use client";

import React, { useRef, useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface ScratchCardProps {
  imageUrl: string;
  width: number;
  height: number;
}

const ScratchCard: React.FC<ScratchCardProps> = ({
  imageUrl,
  width,
  height,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const imageCanvas = imageCanvasRef.current;
    if (!canvas || !imageCanvas) return;

    const ctx = canvas.getContext("2d");
    const imageCtx = imageCanvas.getContext("2d");
    if (!ctx || !imageCtx) return;

    // Load and draw the image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;
    image.onload = () => {
      imageCtx.drawImage(image, 0, 0, width, height);
    };

    // Fill the scratch layer with a gray color
    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(0, 0, width, height);

    let isDrawing = false;
    const scratchRadius = 20;

    const scratch = (x: number, y: number) => {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x * scaleX, y * scaleY, scratchRadius, 0, 2 * Math.PI);
      ctx.fill();

      // Check if the entire canvas is scratched
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      let transparentPixels = 0;
      for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i + 3] === 0) transparentPixels++;
      }
      if (transparentPixels / (pixelData.length / 4) > 0.5 && !isRevealed) {
        setIsRevealed(true);
        triggerConfetti();
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      scratch(e.offsetX, e.offsetY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      scratch(e.offsetX, e.offsetY);
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDrawing = true;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDrawing) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      scratch(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleMouseUp);
    };
  }, [imageUrl, width, height, isRevealed]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="relative w-full max-w-[300px] aspect-square">
      <canvas
        ref={imageCanvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full"
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full"
        style={{
          opacity: isRevealed ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default ScratchCard;
