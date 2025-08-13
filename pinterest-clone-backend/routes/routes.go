package routes

import (
	"github.com/akinakk/PinterestClone/controllers"
	"github.com/akinakk/PinterestClone/middleware"
	"github.com/go-chi/chi/v5"
)

func SetupRoutes() *chi.Mux {
	router := chi.NewRouter()

	router.Route("/api", func(r chi.Router) {
		
		// Public user routes
		r.Route("/users", func(r chi.Router) {
			r.Post("/register", controllers.RegisterUser)
			r.Post("/login", controllers.LoginUser)
		})

		// protected routes
		r.Group(func(r chi.Router) {
			r.Use(middleware.Protect)

			// User management endpoints
			r.Route("/me", func(r chi.Router) {
				r.Get("/", controllers.GetMe)
				r.Post("/logout", controllers.Logout)
			})
		})
	})

	return router
}
