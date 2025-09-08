"use client";

import { useState, useEffect } from "react";
import {
  collectionsApi,
  type Collection,
  type Pin,
} from "@/api/collectionsApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ImageModal from "@/components/ImageModal";
import { Loader } from "@/components/ui/Loader";

interface CollectionViewProps {
  collectionId: number;
}

export default function CollectionView({ collectionId }: CollectionViewProps) {
  const [collection, setCollection] = useState<
    (Collection & { pins: Pin[] }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadCollection();
  }, [collectionId]);

  const loadCollection = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await collectionsApi.getCollectionById(collectionId);
      setCollection(data);
    } catch (err) {
      console.error("Error loading collection:", err);
      setError("Failed to load collection");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Loader />
            <p className="text-gray-600 mt-4">Loading collection...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No access to collection
          </h2>
          <p className="text-gray-600 mb-6">
            Collection doesn't exist or is private
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="lg"
            className="gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Profile
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">
              {collection.name}
            </h1>
            {collection.is_private && (
              <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  Private
                </span>
              </div>
            )}
          </div>

          {collection.description && (
            <p className="text-lg text-gray-600 mb-2">
              {collection.description}
            </p>
          )}

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>
              {collection.pins?.length || 0} pin
              {(collection.pins?.length || 0) !== 1 ? "s" : ""}
            </span>
            <span>•</span>
            <span>
              Created {new Date(collection.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {collection.pins && collection.pins.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4">
            {collection.pins.map((pin) => (
              <PinCard
                key={pin.id}
                pin={pin}
                collectionId={collection.id}
                onPinRemoved={loadCollection}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-2">
            <img
              src="/photo.svg"
              alt="No pins"
              className="w-74 h-74 mx-auto mb-4"
            />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No pins in this collection yet
            </h3>
            <p className="text-gray-600">
              Start adding pins to build your collection!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface PinCardProps {
  pin: Pin;
  collectionId: number;
  onPinRemoved: () => void;
}

function PinCard({ pin, collectionId, onPinRemoved }: PinCardProps) {
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleRemovePin = async () => {
    if (removing) return;

    try {
      setRemoving(true);
      await collectionsApi.removePinFromCollection(collectionId, pin.id);
      toast.success("Pin removed from collection");
      onPinRemoved();
    } catch (error) {
      toast.error("Error while removing pin");
      console.error("Error removing pin:", error);
    } finally {
      setRemoving(false);
    }
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  return (
    <div
      className="break-inside-avoid mb-4 group cursor-pointer relative"
      onMouseEnter={() => setShowRemoveButton(true)}
      onMouseLeave={() => setShowRemoveButton(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        <img
          src={pin.image_url}
          alt={pin.title}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-200 cursor-pointer"
          loading="lazy"
          onClick={handleImageClick}
        />

        {showRemoveButton && (
          <div className="absolute inset-0 bg-black/20 flex items-start justify-end p-2 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemovePin();
              }}
              disabled={removing}
              className="bg-white text-red-600 cursor-pointer hover:bg-red-50 p-2 rounded-full shadow-lg transition-all disabled:opacity-50 pointer-events-auto"
              title="Remove from collection"
            >
              {removing ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="p-2">
        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {pin.title}
        </h3>
        {pin.description && (
          <p className="text-xs text-gray-600 line-clamp-2">
            {pin.description}
          </p>
        )}
      </div>

      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        imageUrl={pin.image_url}
        alt={pin.title}
        title={pin.title}
      />
    </div>
  );
}
