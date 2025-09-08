import { apiClient } from "@/lib/api"
import { CreatePinRequest, PinData } from "../types/pin-types"

export const pinsApi = {
    getAllPins: async (): Promise<PinData[]> => {
        try {
            const response = await apiClient.get("/pins")
            return response.data
        } catch (error) {
            throw error
        }
    },

    getPinById: async (id: string): Promise<PinData> => {
        try {
            const response = await apiClient.get(`/pins/${id}`)
            return response.data
        } catch (error) {
            throw error
        }
    },

    createPin: async (pin: CreatePinRequest): Promise<PinData> => {
        try {
            const response = await apiClient.post("/pins", pin)
            return response.data
        } catch (error) {
            throw error
        }
    },

    getUserPins: async (): Promise<PinData[]> => {
        try {
            const response = await apiClient.get("/me/pins")
            return response.data
        } catch (error) {
            throw error
        }
    },

    createMockPins: async (): Promise<{ message: string; pins_created: number }> => {
        try {
            const response = await apiClient.post("/pins/create-mock")
            return response.data
        } catch (error) {
            throw error
        }
    },
}
