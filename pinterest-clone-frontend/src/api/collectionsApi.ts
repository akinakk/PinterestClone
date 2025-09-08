import { apiClient } from "@/lib/api"

export interface Collection {
  id: number
  name: string
  description?: string
  user_id: number
  is_private: boolean
  created_at: string
  updated_at: string
  pins_count?: number
  preview_pins?: Pin[]
}

export interface Pin {
  id: number
  title: string
  description?: string
  image_url: string
  user_id: number
  created_at: string
  updated_at: string
}

export const collectionsApi = {
  getUserCollections: async (): Promise<Collection[]> => {
    try {
      const response = await apiClient.get("/collections")
      return response.data
    } catch (error) {
      throw error
    }
  },

  getCollectionById: async (id: number): Promise<Collection & { pins: Pin[] }> => {
    try {
      const response = await apiClient.get(`/collections/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  createCollection: async (data: { name: string; description?: string; is_private?: boolean }): Promise<Collection> => {
    try {
      const response = await apiClient.post("/collections", data)
      return response.data
    } catch (error) {
      throw error
    }
  },

  addPinToCollection: async (collectionId: number, pinId: number): Promise<void> => {
    try {
      await apiClient.post(`/collections/${collectionId}/pins`, { pin_id: pinId })
    } catch (error) {
      throw error
    }
  },

  removePinFromCollection: async (collectionId: number, pinId: number): Promise<void> => {
    try {
      await apiClient.delete(`/collections/${collectionId}/pins/${pinId}`)
    } catch (error) {
      throw error
    }
  },
}
