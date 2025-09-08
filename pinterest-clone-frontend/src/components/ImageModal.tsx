"use client";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  title?: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt,
  title,
}: ImageModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative inline-block">
          <Image
            src={imageUrl}
            alt={alt}
            width={0}
            height={0}
            sizes="90vw"
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg"
            priority
          />

          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-xl text-white p-3 rounded-b-lg">
              <p className="text-sm font-medium">{title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
