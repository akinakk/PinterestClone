"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserCollections } from "@/hooks/useCollections";
import { collectionsApi, type Collection } from "@/api/collectionsApi";
import CreateCollectionModal from "@/components/CreateCollectionModal";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import { LoaderTrio } from "@/components/ui/Loader";
import { useGetMe } from "@/hooks/auth";

export default function Profile() {
  const router = useRouter();
  const { data: collections = [], isLoading, refetch } = useUserCollections();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: user } = useGetMe({
    isEnabled: true,
  });

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="bg-white rounded-lg p-2">
          <div className="flex flex-col sm:flex-row items-center gap-6 border border-gray-100 p-4 rounded-xl">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
              alt="Eliana Garcia"
            />

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.first_name || "User"} {user?.last_name || "Name"}
              </h1>
              <p className="text-lg text-red-600 font-medium mb-4">
                Graphic Designer & Web Developer
              </p>

              <div className="flex justify-center sm:justify-start gap-6 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Pins</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {collections?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Collections</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">1.2k</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">342</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2">
          <div className="gap-6 border border-gray-100 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 mb-4">
              This is a mini Pinterest Clone project. It doesn't fully replicate
              all Pinterest functionality, but within the scope of this project
              I tried to implement the main features including pin creation,
              collections management, and adding pins to collections.
            </p>
            <p className="text-gray-700">
              The project also includes authentication system and user
              management. Built as a full-stack application to demonstrate
              modern web development practices and technologies.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-2">
          <div className="gap-6 border border-gray-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                My Collections
              </h2>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                size="lg"
                className="gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Collection
              </Button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <LoaderTrio />
                <p className="text-gray-600 mt-4">Loading collections...</p>
              </div>
            ) : collections && collections.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <img
                  src="/photo.svg"
                  alt="No collections"
                  className="w-74 h-74 mx-auto mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No collections
                </h3>
                <p className="text-gray-600">
                  Start creating collections to organize your pins!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({ collection }: CollectionCardProps) {
  const [collectionDetails, setCollectionDetails] = useState<
    (Collection & { pins: any[] }) | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadCollectionDetails = async () => {
    try {
      setLoading(true);
      const details = await collectionsApi.getCollectionById(collection.id);
      setCollectionDetails(details);
    } catch (error) {
      console.error("Error loading collection details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCollectionDetails();
  }, [collection.id]);

  const previewPins = collectionDetails?.pins || [];
  const pinsCount = previewPins.length;

  const hasRealPins = !loading && previewPins.length > 0;

  console.log(
    "Collection:",
    collection.name,
    "collectionDetails:",
    collectionDetails,
    "previewPins:",
    previewPins,
    "previewPins.length:",
    previewPins.length,
    "hasRealPins:",
    hasRealPins,
    "loading:",
    loading
  );

  const handleClick = () => {
    router.push(`/collections/${collection.id}`);
  };

  return (
    <div className="cursor-pointer group" onClick={handleClick}>
      <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden relative">
        {loading ? (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <LoaderTrio />
          </div>
        ) : hasRealPins ? (
          previewPins.length > 0 && previewPins[0]?.image_url ? (
            <div className="grid grid-cols-2 h-full gap-0.5">
              {previewPins.slice(0, 4).map((pin: any, index: number) => (
                <div key={pin.id || index} className="overflow-hidden">
                  <img
                    src={pin.image_url}
                    alt={pin.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <FolderOpen className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                <div className="text-xs text-gray-600 font-medium">
                  {pinsCount} pin{pinsCount !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
            <div className="text-center p-4">
              <FolderOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-500 font-medium">Empty</div>
            </div>
          </div>
        )}

        {!loading && hasRealPins && (
          <div className="absolute inset-0 group-hover:bg-black/30 hover:backdrop-blur-xs transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-center">
              <div className="text-sm font-medium bg-black/70 backdrop-blur-xl px-3 py-1 rounded-full">
                View Collection
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-red-600 transition-colors flex-1">
            {collection.name}
          </h3>
          {collection.is_private && (
            <div className="flex-shrink-0" title="Private collection">
              <svg
                className="w-4 h-4 text-gray-500"
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
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600">
          {pinsCount} pin{pinsCount !== 1 ? "s" : ""}
        </p>
        {collection.description && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            {collection.description}
          </p>
        )}
      </div>
    </div>
  );
}
