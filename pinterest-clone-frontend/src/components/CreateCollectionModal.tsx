"use client";
import { useState } from "react";
import { useCreateCollection } from "@/hooks/useCollections";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCollectionModal({
  isOpen,
  onClose,
}: CreateCollectionModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const createCollection = useCreateCollection();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await createCollection.mutateAsync({
        name: name.trim(),
        description: description.trim() || undefined,
        is_private: isPrivate,
      });
      setName("");
      setDescription("");
      setIsPrivate(false);
      onClose();
    } catch (error) {
      console.error("Failed to create collection:", error);
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setIsPrivate(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create Collection
            </h2>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="collection-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Collection Name *
              </label>
              <input
                id="collection-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter collection name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                maxLength={100}
                required
              />
            </div>

            <div>
              <label
                htmlFor="collection-description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description (optional)
              </label>
              <textarea
                id="collection-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your collection"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                maxLength={500}
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Privacy
                  </label>
                  <p className="text-xs text-gray-500">
                    {isPrivate
                      ? "Only you can see this collection"
                      : "Anyone can see this collection"}
                  </p>
                </div>
                <div className="flex items-center space-x-3 ml-4">
                  <div className="flex items-center space-x-2">
                    <svg
                      className={`w-4 h-4 ${
                        !isPrivate ? "text-green-500" : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span
                      className={`text-xs font-medium ${
                        !isPrivate ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      Public
                    </span>
                  </div>

                  <Switch
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                    variant="default"
                    size="default"
                  />

                  <div className="flex items-center space-x-2">
                    <svg
                      className={`w-4 h-4 ${
                        isPrivate ? "text-red-500" : "text-gray-400"
                      }`}
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
                    <span
                      className={`text-xs font-medium ${
                        isPrivate ? "text-red-700" : "text-gray-500"
                      }`}
                    >
                      Private
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name.trim() || createCollection.isPending}
                className="flex-1"
              >
                {createCollection.isPending ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Collection"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
