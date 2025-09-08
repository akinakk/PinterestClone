"use client";
import Image from "next/image";
import { useState } from "react";
import { PinCardProps, PinData } from "../../types/pin-types";
import { Heart, Share, MoreHorizontal, Bookmark } from "lucide-react";
import { usePins } from "../../hooks/usePins";
import { mockPins } from "../../mock/pins";
import SavePinModal from "../SavePinModal";
import CreateMockPinsButton from "../CreateMockPinsButton";
import ImageModal from "../ImageModal";
import { Loader } from "@/components/ui/Loader";

function PinCard({ pin }: PinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSaveModal(true);
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  return (
    <div
      className="relative group cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-gray-100 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={handleImageClick}
      >
        <Image
          src={
            pin.image_url || pin.src || "https://via.placeholder.com/300x400"
          }
          alt={pin.alt || pin.title || "Pin image"}
          width={560}
          height={0}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ height: "auto" }}
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-3 right-3 flex gap-2 pointer-events-auto">
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

            <div className="absolute bottom-3 right-3 pointer-events-auto">
              <button
                onClick={handleSaveClick}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-[#E60023]/70 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-[#d50520] hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {(pin.title || pin.description || pin.author) && (
        <div className="mt-2 px-1">
          {pin.title && (
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
              {pin.title}
            </h3>
          )}
          {(pin.description || pin.author) && (
            <p className="text-xs text-gray-600">
              {pin.description || pin.author}
            </p>
          )}
        </div>
      )}

      <SavePinModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        pinId={pin.id}
      />

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={
          pin.image_url || pin.src || "https://via.placeholder.com/300x400"
        }
        alt={pin.alt || pin.title || "Pin image"}
        title={pin.title}
      />
    </div>
  );
}

export default function PinterestGrid() {
  const { data: pins = [], isLoading, error } = usePins();

  const pinsToDisplay = pins || [];

  const distributeToColumns = (pins: PinData[], columnCount: number) => {
    const columns: PinData[][] = Array.from({ length: columnCount }, () => []);

    pins.forEach((pin, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(pin);
    });

    return columns;
  };

  if (isLoading) {
    return (
      <div className="max-w-[115rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center py-8">
          <Loader />
          <p className="text-gray-600 mt-4">Loading pins...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.warn("API Error:", error);
  }

  if (!pinsToDisplay || pinsToDisplay.length === 0) {
    return (
      <div className="max-w-[115rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center py-16">
          <img
            src="/photo.svg"
            alt="No pins"
            className="w-74 h-74 mx-auto mb-6 opacity-50"
          />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No pins yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by clicking "Click here to generate random images" button!
          </p>
          <CreateMockPinsButton />
        </div>
      </div>
    );
  }

  const columnsXLarge = distributeToColumns(pinsToDisplay, 6);
  const columnsLarge = distributeToColumns(pinsToDisplay, 4);
  const columnsMedium = distributeToColumns(pinsToDisplay, 3);
  const columnsSmall = distributeToColumns(pinsToDisplay, 2);

  return (
    <div className="max-w-[115rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
      <CreateMockPinsButton />

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
