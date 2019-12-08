package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	hub := newHub()
	go hub.run()
	http.Handle("/", http.FileServer(http.Dir("dist")))
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w ,r)
	})
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
