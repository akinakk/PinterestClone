package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/akinakk/PinterestClone/db"
	"github.com/akinakk/PinterestClone/db/sqlc"
	"github.com/akinakk/PinterestClone/middleware"
	"github.com/akinakk/PinterestClone/utils"
	"github.com/go-chi/chi/v5"
)

type CreatePinRequest struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	ImageURL    string `json:"image_url"`
	SourceURL   string `json:"source_url"`
}

func CreatePin(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreatePinRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONErrorMessage(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.Title == "" || req.ImageURL == "" {
		utils.JSONErrorMessage(w, "Title and image URL are required", http.StatusBadRequest)
		return
	}

	var description, sourceURL *string
	if req.Description != "" {
		description = &req.Description
	}
	if req.SourceURL != "" {
		sourceURL = &req.SourceURL
	}

	pin, err := db.Q.CreatePin(context.Background(), sqlc.CreatePinParams{
		UserID:      userID,
		Title:       req.Title,
		Description: description,
		ImageUrl:    req.ImageURL,
		SourceUrl:   sourceURL,
	})

	if err != nil {
		utils.JSONErrorMessage(w, "Failed to create pin", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	utils.JSONResponse(w, pin)
}

func GetAllPins(w http.ResponseWriter, r *http.Request) {
	pins, err := db.Q.GetAllPins(context.Background())
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch pins", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, pins)
}

func GetPinByID(w http.ResponseWriter, r *http.Request) {
	pinIDStr := chi.URLParam(r, "id")
	pinID, err := strconv.ParseInt(pinIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid pin ID", http.StatusBadRequest)
		return
	}

	pin, err := db.Q.GetPinByID(context.Background(), pinID)
	if err != nil {
		utils.JSONErrorMessage(w, "Pin not found", http.StatusNotFound)
		return
	}

	utils.JSONResponse(w, pin)
}

func GetUserPins(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	pins, err := db.Q.GetUserPins(context.Background(), userID)
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch user pins", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, pins)
}

func CreateMockPins(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	mockPins := []struct {
		Title       string
		Description string
		ImageURL    string
		SourceURL   string
	}{
		{"Beautiful Nature", "Nature landscape", "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Modern Design", "Modern architecture", "https://images.unsplash.com/photo-1668906093328-99601a1aa584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Delicious Food", "Food photography", "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"City Vibes", "Urban landscape", "https://images.unsplash.com/photo-1668584054131-d5721c515211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Creative Art", "Art and design", "https://images.unsplash.com/photo-1664574654529-b60630f33fdb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Architecture Wonder", "Building architecture", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Travel Dreams", "Travel destination", "https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Natural Beauty", "Nature scene", "https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Home Design", "Interior design", "https://images.unsplash.com/photo-1668869713519-9bcbb0da7171?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Lifestyle Moments", "Lifestyle photography", "https://images.unsplash.com/photo-1668584054035-f5ba7d426401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Fashion Style", "Fashion", "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Mountain View", "Mountain landscape", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Tech Innovation", "Technology", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Creative Object", "Random object", "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
		{"Galaxy Dreams", "Space", "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80", "https://unsplash.com"},
	}

	var createdPins []interface{}
	for _, mockPin := range mockPins {
		var description, sourceURL *string
		if mockPin.Description != "" {
			description = &mockPin.Description
		}
		if mockPin.SourceURL != "" {
			sourceURL = &mockPin.SourceURL
		}

		pin, err := db.Q.CreatePin(context.Background(), sqlc.CreatePinParams{
			UserID:      userID,
			Title:       mockPin.Title,
			Description: description,
			ImageUrl:    mockPin.ImageURL,
			SourceUrl:   sourceURL,
		})

		if err != nil {
			utils.JSONErrorMessage(w, "Failed to create mock pin: "+err.Error(), http.StatusInternalServerError)
			return
		}

		createdPins = append(createdPins, pin)
	}

	utils.JSONResponse(w, utils.H{
		"message":      "Mock pins created successfully",
		"count":        len(createdPins),
		"created_pins": createdPins,
	})
}
