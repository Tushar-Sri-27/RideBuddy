# 🚗 RideBuddy - Smart Community Carpooling Platform

## 🌍 Overview

RideBuddy is a smart ride-sharing platform designed to reduce traffic congestion, fuel consumption, and air pollution by enabling users to share rides within their trusted communities and nearby areas.

The platform uses a **Colony-Based + Geo-Radius Matching System** that prioritizes trusted rides within the same residential colony and falls back to nearby users using geospatial matching.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* JWT-based Authentication
* Secure Login & Registration
* Protected API Routes

### 🏘️ Colony-Based Ride Sharing

* Join a residential colony/community
* Trusted ride matching within the same colony
* Community-first ride discovery

### 📍 Geo-Spatial Ride Matching

* MongoDB 2dsphere indexing
* Nearby ride search within configurable radius
* Smart location-based recommendations

### 🚗 Ride Management

* Create Ride
* Join Ride
* Search Ride
* Start Ride
* Complete Ride

### 🧠 Smart Matching Engine

RideBuddy ranks rides using:

* Same Colony Matching
* Destination Similarity
* Nearby Pickup Points
* Ride Time Compatibility

Match Score Example:

* Same Colony → +50
* Destination Match → +30
* Nearby Pickup → +20

Maximum Score: 100

---

## 🗺️ Maps & Routing

### OpenStreetMap

Used for:

* Geocoding
* Location Search

### OpenRouteService

Used for:

* Route Distance Calculation
* ETA Estimation
* Navigation Data

Example:

Distance: 5.2 km

Estimated Time: 7.21 min

---

## 🌱 Sustainability Impact Tracking

After each completed ride, RideBuddy calculates:

* Fuel Saved
* CO₂ Emissions Reduced
* Money Saved

Example:

Distance Shared: 5.2 km

Fuel Saved: 0.42 L

CO₂ Reduced: 0.96 kg

Money Saved: ₹45.76

This feature encourages environmentally responsible commuting.

---

## 📡 Real-Time Live Tracking

Built using Socket.io.

Features:

* Driver Live Location Updates
* Passenger Real-Time Tracking
* Ride-Based Socket Rooms
* Location Persistence in MongoDB

Flow:

Driver GPS
↓
Socket.io
↓
MongoDB
↓
Passengers

---

## 🏗️ System Architecture

User
↓
Frontend (React)
↓
Express API
↓
MongoDB Atlas
↓
Matching Engine
↓
Socket.io Live Tracking

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* React Leaflet
* Socket.io Client

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.io

### APIs

* OpenStreetMap (Nominatim)
* OpenRouteService

---

## 📂 Project Structure

Backend/

├── src/

│ ├── config/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── services/

│ ├── socket/

│ └── utils/

├── server.js

└── package.json

---

## 🗄️ Database Collections

### Users

Stores:

* User Information
* Authentication Data
* Colony Association

### Colonies

Stores:

* Colony Details
* Members

### Rides

Stores:

* Source & Destination
* Driver Information
* Passengers
* Route Metadata

### Impacts

Stores:

* Fuel Saved
* CO₂ Reduced
* Money Saved

### RideLocations

Stores:

* Driver Live Location
* Last Updated Position

---

## 🚀 API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Colonies

POST /api/colonies

GET /api/colonies

### Rides

POST /api/rides

GET /api/rides/search

GET /api/rides/nearby

GET /api/rides/smart-match

POST /api/rides/:id/join

PUT /api/rides/:id/start

PUT /api/rides/:id/complete

### Impact

GET /api/rides/impact/:rideId

### Live Location

GET /api/rides/location/:rideId

---

## 🎯 Future Enhancements

* AI Route Clustering
* Women-Only Ride Preferences
* Push Notifications
* In-App Chat
* Driver Verification
* Ride History Dashboard
* Carbon Footprint Analytics
* School & Office Commute Groups

---

## 👩‍💻 Team

Developed as a MERN Stack Community Mobility Solution focused on:

✅ Sustainable Transportation

✅ Trusted Community Ride Sharing

✅ Real-Time Tracking

✅ Smart Geo-Spatial Matching

---

## 🌱 Vision

RideBuddy aims to make daily commuting safer, greener, and more affordable by connecting people who travel along similar routes and belong to trusted communities.
