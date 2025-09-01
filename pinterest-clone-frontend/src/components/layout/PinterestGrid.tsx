"use client";
import Image from "next/image";
import { useState } from "react";
import { PinCardProps, PinData } from "@/types/pin-types";
import { Heart, Share, MoreHorizontal } from "lucide-react";
import { mockPins } from "@/mock/pins";

function PinCard({ pin }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="relative group cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={pin.src}
          alt={pin.alt}
          width={560}
          height={0}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ height: "auto" }}
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300">
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                />
              </button>
              <button className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                <Share className="w-4 h-4 text-gray-700" />
              </button>
              <button className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-all duration-200">
                <MoreHorizontal className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div className="absolute bottom-3 right-3">
              <button className="px-4 py-2 bg-[#E60023] text-white font-semibold rounded-full hover:bg-[#d50520] transition-colors duration-200 shadow-lg">
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {(pin.title || pin.author) && (
        <div className="mt-2 px-1">
          {pin.title && (
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
              {pin.title}
            </h3>
          )}
          {pin.author && <p className="text-xs text-gray-600">{pin.author}</p>}
        </div>
      )}
    </div>
  );
}

export default function PinterestGrid() {
  const distributeToColumns = (pins: PinData[], columnCount: number) => {
    const columns: PinData[][] = Array.from({ length: columnCount }, () => []);

    pins.forEach((pin, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(pin);
    });

    return columns;
  };

  const columnsXLarge = distributeToColumns(mockPins, 6);
  const columnsLarge = distributeToColumns(mockPins, 4);
  const columnsMedium = distributeToColumns(mockPins, 3);
  const columnsSmall = distributeToColumns(mockPins, 2);

  return (
    <div className="max-w-[115rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
      <div className="hidden 2xl:grid 2xl:grid-cols-6 gap-4">
        {columnsXLarge.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-4 2xl:hidden gap-4">
        {columnsLarge.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4">
            {column.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-3 lg:hidden gap-3">
        {columnsMedium.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-3">
            {column.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 md:hidden">
        {columnsSmall.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-2">
            {column.map((pin) => (
              <PinCard key={pin.id} pin={pin} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
