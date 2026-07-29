# 🎬 Cinemax - Theatre Booking System

A modern, full-stack web application for booking movie tickets, reserving seats, and ordering snacks. Built with a **Spring Boot** Java backend and a fast **React + Vite** frontend.

## ✨ Features
- **User Authentication**: Secure signup and login functionality.
- **Movie Browsing**: View currently playing movies, descriptions, and showtimes.
- **Interactive Seat Selection**: Visually select available seats for a specific showtime. 
- **Snack Ordering**: Add food and beverages to your booking cart.
- **Admin Dashboard**: Manage movies, showtimes, and snack inventory in real-time.
- **Modern UI/UX**: A sleek, responsive, and beautifully designed user interface with glassmorphism effects.

## 🛠️ Tech Stack
**Backend**:
- Java 21
- Spring Boot 3.2.4
- Spring Data JPA (Hibernate)
- PostgreSQL Database
- Maven

**Frontend**:
- React 18
- Vite
- React Router DOM
- Vanilla CSS (Custom Design System)

## 🚀 How to Run Locally

### Prerequisites
1. **Java 21** or higher
2. **Node.js** (v16+)
3. **PostgreSQL** installed and running on port `5432`

### 1. Database Setup
Create a PostgreSQL database named `theatre_db`.
```sql
CREATE DATABASE theatre_db;
```
*(Note: The application is configured to trust local connections, or you can update the credentials in `application.properties`)*

### 2. Run the Backend (Spring Boot)
Open the project in VS Code (or your preferred IDE) and run the `TheatreBookingApplication.java` file. 
Alternatively, use the Maven wrapper:
```bash
./mvnw spring-boot:run
```
The backend will automatically start on `http://localhost:8081` and create the necessary database tables.

### 3. Run the Frontend (React)
Open a new terminal, navigate to the frontend folder, and start the development server:
```bash
cd theatre-frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:5173` (or the port specified in your terminal).

## 📸 Screenshots
*(You can add your own screenshots of the homepage and booking screens here!)*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open-source and available under the MIT License.
