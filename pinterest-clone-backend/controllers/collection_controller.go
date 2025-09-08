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

type CreateCollectionRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	IsPrivate   bool   `json:"is_private"`
}

type AddPinToCollectionRequest struct {
	PinID int64 `json:"pin_id"`
}

func CreateCollection(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req CreateCollectionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONErrorMessage(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		utils.JSONErrorMessage(w, "Collection name is required", http.StatusBadRequest)
		return
	}

	var description *string
	if req.Description != "" {
		description = &req.Description
	}

	collection, err := db.Q.CreateCollection(context.Background(), sqlc.CreateCollectionParams{
		UserID:      userID,
		Name:        req.Name,
		Description: description,
		IsPrivate:   &req.IsPrivate,
	})

	if err != nil {
		utils.JSONErrorMessage(w, "Failed to create collection", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, collection)
}

func GetUserCollections(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collections, err := db.Q.GetUserCollections(context.Background(), userID)
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch collections", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, collections)
}

func GetCollection(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())

	collectionIDStr := chi.URLParam(r, "id")
	collectionID, err := strconv.ParseInt(collectionIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid collection ID", http.StatusBadRequest)
		return
	}

	collection, err := db.Q.GetCollection(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Collection not found", http.StatusNotFound)
		return
	}

	if collection.IsPrivate != nil && *collection.IsPrivate {
		if userID == 0 {
			utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		if collection.UserID != userID {
			utils.JSONErrorMessage(w, "Access denied", http.StatusForbidden)
			return
		}
	}

	pins, err := db.Q.GetCollectionPins(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch collection pins", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id":          collection.ID,
		"user_id":     collection.UserID,
		"name":        collection.Name,
		"description": collection.Description,
		"is_private":  collection.IsPrivate,
		"created_at":  collection.CreatedAt,
		"updated_at":  collection.UpdatedAt,
		"pins":        pins,
	}

	utils.JSONResponse(w, response)
}

func AddPinToCollection(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collectionIDStr := chi.URLParam(r, "id")
	collectionID, err := strconv.ParseInt(collectionIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid collection ID", http.StatusBadRequest)
		return
	}

	var req AddPinToCollectionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.JSONErrorMessage(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	collection, err := db.Q.GetCollection(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Collection not found", http.StatusNotFound)
		return
	}

	if collection.UserID != userID {
		utils.JSONErrorMessage(w, "Access denied", http.StatusForbidden)
		return
	}

	_, err = db.Q.GetPinByID(context.Background(), req.PinID)
	if err != nil {
		utils.JSONErrorMessage(w, "Pin not found", http.StatusNotFound)
		return
	}

	err = db.Q.AddPinToCollection(context.Background(), sqlc.AddPinToCollectionParams{
		CollectionID: collectionID,
		PinID:        req.PinID,
	})

	if err != nil {
		utils.JSONErrorMessage(w, "Failed to add pin to collection", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, utils.H{"message": "Pin added to collection"})
}

func GetCollectionWithPins(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())

	collectionIDStr := chi.URLParam(r, "id")
	collectionID, err := strconv.ParseInt(collectionIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid collection ID", http.StatusBadRequest)
		return
	}

	collection, err := db.Q.GetCollection(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Collection not found", http.StatusNotFound)
		return
	}

	if collection.IsPrivate != nil && *collection.IsPrivate {
		if userID == 0 {
			utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		if collection.UserID != userID {
			utils.JSONErrorMessage(w, "Access denied", http.StatusForbidden)
			return
		}
	}

	pins, err := db.Q.GetCollectionPins(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch collection pins", http.StatusInternalServerError)
		return
	}

	response := struct {
		sqlc.Collection
		Pins []sqlc.Pin `json:"pins"`
	}{
		Collection: collection,
		Pins:       pins,
	}

	utils.JSONResponse(w, response)
}

func GetCollectionPins(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())

	collectionIDStr := chi.URLParam(r, "id")
	collectionID, err := strconv.ParseInt(collectionIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid collection ID", http.StatusBadRequest)
		return
	}

	collection, err := db.Q.GetCollection(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Collection not found", http.StatusNotFound)
		return
	}

	if collection.IsPrivate != nil && *collection.IsPrivate {
		if userID == 0 {
			utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		if collection.UserID != userID {
			utils.JSONErrorMessage(w, "Access denied", http.StatusForbidden)
			return
		}
	}

	pins, err := db.Q.GetCollectionPins(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Failed to fetch collection pins", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, pins)
}

func RemovePinFromCollection(w http.ResponseWriter, r *http.Request) {
	userID := middleware.GetUserID(r.Context())
	if userID == 0 {
		utils.JSONErrorMessage(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	collectionIDStr := chi.URLParam(r, "collectionId")
	collectionID, err := strconv.ParseInt(collectionIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid collection ID", http.StatusBadRequest)
		return
	}

	pinIDStr := chi.URLParam(r, "pinId")
	pinID, err := strconv.ParseInt(pinIDStr, 10, 64)
	if err != nil {
		utils.JSONErrorMessage(w, "Invalid pin ID", http.StatusBadRequest)
		return
	}

	collection, err := db.Q.GetCollection(context.Background(), collectionID)
	if err != nil {
		utils.JSONErrorMessage(w, "Collection not found", http.StatusNotFound)
		return
	}

	if collection.UserID != userID {
		utils.JSONErrorMessage(w, "Access denied", http.StatusForbidden)
		return
	}

	err = db.Q.RemovePinFromCollection(context.Background(), sqlc.RemovePinFromCollectionParams{
		CollectionID: collectionID,
		PinID:        pinID,
	})

	if err != nil {
		utils.JSONErrorMessage(w, "Failed to remove pin from collection", http.StatusInternalServerError)
		return
	}

	utils.JSONResponse(w, utils.H{"message": "Pin removed from collection"})
}
