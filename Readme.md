# MERN Student CRUD Application


## Overview


A simple CRUD application to manage student records using the MERN stack. Users can create, read, update, and delete student entries.


### Features
- Add student (Name, Email, Age, Course)
- View all students in a table (ID, Name, Email, Age, Course)
- Edit student (loads existing data into form; allows updates)
- Delete student with confirmation
- RESTful API endpoints

## Requirements
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas connection string


## Setup & Installation

### Backend
1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `Backend` directory with the following content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_student_crud
```
   - For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string
   - Example: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mern_student_crud`

4. Start the backend server:
```bash
npm start
```
   Or for development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend
1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/students` | Create a new student |
| GET | `/api/students` | Fetch all students |
| GET | `/api/students/:id` | Fetch a single student by ID |
| PUT | `/api/students/:id` | Update a student by ID |
| DELETE | `/api/students/:id` | Delete a student by ID |

## Student Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  age: Number,
  course: String
}
```

## Features Implemented

✅ Create Student - Add new student records with Name, Email, Age, and Course  
✅ Read Students - View all students in a table format with ID, Name, Email, Age, Course  
✅ Update Student - Edit existing student records (loads data into form, allows updates)  
✅ Delete Student - Remove student records with confirmation dialog  
✅ React Hooks - Uses useState and useEffect  
✅ API Communication - Uses Axios for HTTP requests  
✅ Form Validation - Required fields validation  
✅ Error Handling - Proper error messages and handling  

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - CORS
  - dotenv

- **Frontend:**
  - React
  - Axios
  - React Hooks (useState, useEffect)

## Commands Summary

### Backend
```bash
cd Backend
npm install
npm run dev        # Development mode with nodemon
```

### Frontend
```bash
cd frontend
npm install
npm run dev          # Starts React development server
```

## Notes

- Make sure MongoDB is running locally or you have a valid MongoDB Atlas connection string
- The frontend expects the backend to be running on `http://localhost:5000`
- If you change the backend port, update the API URL in `frontend/src/api.js` or set the `REACT_APP_API_URL` environment variable

