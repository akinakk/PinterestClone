"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, FolderOpen, Check } from "lucide-react";
import { pinsApi } from "../api/pinsApi";
import { collectionsApi } from "../api/collectionsApi";
import { Collection, CreateCollectionRequest } from "../types/pin-types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LoaderTrioRed } from "@/components/ui/Loader";
import toast from "react-hot-toast";

interface SavePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinId: string | number;
}

export default function SavePinModal({
  isOpen,
  onClose,
  pinId,
}: SavePinModalProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    number | null
  >(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadCollections();
    }
  }, [isOpen]);

  const loadCollections = async () => {
    try {
      setIsLoading(true);
      const userCollections = await collectionsApi.getUserCollections();
      setCollections(userCollections);
    } catch (err) {
      setError("Failed to load collections");
      console.error("Error loading collections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return;

    try {
      setIsLoading(true);
      const createRequest: CreateCollectionRequest = {
        name: newCollectionName.trim(),
        description: "",
        is_private: isPrivate,
      };

      const newCollection = await collectionsApi.createCollection(
        createRequest
      );

      if (newCollection && newCollection.id) {
        setCollections((prev) => [...(prev || []), newCollection]);
        setSelectedCollectionId(newCollection.id);
        setNewCollectionName("");
        setIsPrivate(false);
        setIsCreatingNew(false);
      }
    } catch (err) {
      setError("Failed to create collection");
      console.error("Error creating collection:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePin = async () => {
    if (!selectedCollectionId) return;

    try {
      setIsLoading(true);
      toast.success("Pin saved to collection!");
      const numericPinId = typeof pinId === "string" ? parseInt(pinId) : pinId;
      await collectionsApi.addPinToCollection(
        selectedCollectionId,
        numericPinId
      );
      onClose();
    } catch (err) {
      setError("Failed to save pin to collection");
      toast.error("Failed to save pin");
      console.error("Error saving pin:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedCollectionId(null);
    setIsCreatingNew(false);
    setNewCollectionName("");
    setIsPrivate(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Save Pin</h2>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <LoaderTrioRed />
                <p className="text-gray-600 mt-4">Loading collections...</p>
              </div>
            ) : (
              <>
                {collections && collections.length > 0 ? (
                  collections.map((collection) => (
                    <div
                      key={collection.id}
                      onClick={() => setSelectedCollectionId(collection.id)}
                      className={`p-4 border rounded-xl cursor-pointer transition-all ${
                        selectedCollectionId === collection.id
                          ? "border-[#E60023] bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <FolderOpen className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {collection.name}
                              </span>
                              {collection.is_private && (
                                <svg
                                  className="w-3 h-3 text-gray-500"
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
                              )}
                            </div>
                            {collection.description && (
                              <div className="text-sm text-gray-500 mt-1">
                                {collection.description}
                              </div>
                            )}
                          </div>
                        </div>
                        {selectedCollectionId === collection.id && (
                          <div className="p-1 bg-[#E60023] rounded-full">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No collections yet
                    </h3>
                    <p className="text-gray-500">
                      Create your first collection to save pins!
                    </p>
                  </div>
                )}

                {isCreatingNew ? (
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Enter collection name"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCreateCollection();
                          }
                          if (e.key === "Escape") {
                            setIsCreatingNew(false);
                          }
                        }}
                      />

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Privacy
                            </label>
                            <p className="text-xs text-gray-500">
                              {isPrivate
                                ? "Only you can see this collection"
                                : "Anyone can see this collection"}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 ml-3">
                            <div className="flex items-center space-x-1">
                              <svg
                                className={`w-3 h-3 ${
                                  !isPrivate
                                    ? "text-green-500"
                                    : "text-gray-400"
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
                                  !isPrivate
                                    ? "text-green-700"
                                    : "text-gray-500"
                                }`}
                              >
                                Public
                              </span>
                            </div>

                            <Switch
                              checked={isPrivate}
                              onCheckedChange={setIsPrivate}
                              size="sm"
                            />

                            <div className="flex items-center space-x-1">
                              <svg
                                className={`w-3 h-3 ${
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

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setIsCreatingNew(false)}
                          variant="outline"
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleCreateCollection}
                          disabled={!newCollectionName.trim() || isLoading}
                          className="flex-1"
                        >
                          {isLoading ? (
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
                            "Create"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsCreatingNew(true)}
                    className="w-full p-4 border border-dashed border-gray-300 rounded-xl hover:border-gray-400 flex items-center justify-center gap-2 text-gray-600 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Create new collection
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex gap-3 pt-6">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePin}
              disabled={!selectedCollectionId || isLoading}
              className="flex-1"
            >
              {isLoading ? (
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
                  Saving...
                </>
              ) : (
                "Save Pin"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
