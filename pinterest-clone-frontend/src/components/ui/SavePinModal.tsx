"use client";
import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Collection, CreateCollectionRequest } from "@/types/pin-types";
import { collectionsApi } from "@/api/collectionsApi";
import { LoaderTrio } from "@/components/ui/Loader";
import { toast } from "react-hot-toast";

interface SavePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinId: string;
}

export default function SavePinModal({
  isOpen,
  onClose,
  pinId,
}: SavePinModalProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadCollections();
    }
  }, [isOpen]);

  const loadCollections = async () => {
    try {
      setLoading(true);
      const userCollections = await collectionsApi.getUserCollections();
      setCollections(userCollections);
    } catch (error) {
      console.error("Failed to load collections:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCollection = async (collectionId: number) => {
    try {
      await collectionsApi.addPinToCollection(collectionId, parseInt(pinId));
      onClose();
    } catch (error) {
      console.error("Failed to save pin:", error);
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    try {
      setCreating(true);
      const newCollection = await collectionsApi.createCollection({
        name: newCollectionName.trim(),
        is_private: false,
      });

      await collectionsApi.addPinToCollection(
        newCollection.id,
        parseInt(pinId)
      );
      onClose();
    } catch (error) {
      console.error("Failed to create collection:", error);
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Save Pin</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="text-center py-8">
              <LoaderTrio />
              <p className="text-gray-600 mt-4">Loading collections...</p>
            </div>
          ) : (
            <>
              {!showCreateForm ? (
                <>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:border-gray-400 transition-colors mb-4"
                  >
                    <Plus className="w-5 h-5" />
                    Create new collection
                  </button>

                  <div className="space-y-2">
                    {collections.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No collections yet. Create your first collection!
                      </p>
                    ) : (
                      collections.map((collection) => (
                        <button
                          key={collection.id}
                          onClick={() => handleSaveToCollection(collection.id)}
                          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium">{collection.name}</div>
                          {collection.description && (
                            <div className="text-sm text-gray-500 mt-1">
                              {collection.description}
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </>
              ) : (
                <form onSubmit={handleCreateCollection}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection Name
                    </label>
                    <input
                      type="text"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="Enter collection name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={creating || !newCollectionName.trim()}
                      className="flex-1 px-4 py-2 bg-[#E60023] text-white rounded-lg hover:bg-[#d50520] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {creating ? "Creating..." : "Create & Save"}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
