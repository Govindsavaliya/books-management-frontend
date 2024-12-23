# Books Management Frontend

This is a React.js-based frontend application for managing books, interacting with the Books Management Backend API. It includes functionalities such as user registration, login, and managing books.

## Features
- **User Authentication**: Register, login, and manage session.
- **Books Management**: View and add books.
- **API Integration**: Interact with the backend API for data retrieval and manipulation.
- **Responsive UI**: User-friendly interface for managing books and user information.

---

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js**: v14.x or higher
- **npm**: Comes with Node.js

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Govindsavaliya/books-management-frontend.git
   cd books-management-frontend
   ```

2. **Install Dependencies**  
   Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. **Run the Application**  
   Start the application in development mode:
   ```bash
   npm start
   ```

4. **Access the Application**  
   The frontend will be available at [http://localhost:3000](http://localhost:3000).

---

## Folder Structure

```
.
├── public
│   └── index.html
├── src
│   ├── app
│   │   ├── store.js
│   ├── components
│   │   ├── BookList.jsx
│   │   ├── BookForm.jsx
│   ├── features
│   │   └── authSlice.js
│   │   └── booksSlice.js
│   ├── pages
│   │   └── Login.jsx
│   │   └── Profile.jsx
│   │   └── Register.jsx
│   ├── App.js
│   ├── config.js
│   ├── index.js
│   └── index.css
├── package.json
├── vercel.json
└── README.md

```

---

## How to Use the Application

### Register a User
- Navigate to the **Register** page.
- Form fields:
  - First Name
  - Last Name
  - Email
  - Password
  - Confirm Password
- When the user submits the form, the data is sent to the backend to register.

### Login a User
- Navigate to the **Login** page.
- Form fields:
  - Email
  - Password
- On successful login, the user will be redirected to the dashboard and the JWT token will be saved in localStorage for authentication.

### Get User Info
- The **User Info** section displays the logged-in user's details. The JWT token is required to fetch this information.

### Add a Book
- Navigate to the **Add Book** page.
- Provide the title and author of the book to add it to the system.

### Get All Books
- The **Dashboard** page displays a list of all books retrieved from the backend.

---

## API Integration

The frontend communicates with the backend via the following API endpoints:

- **User Registration**:  
  `POST /register`  
  Request Body:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```

- **User Login**:  
  `POST /login`  
  Request Body:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Get User Info**:  
  `GET /user-info`  
  Headers:  
  ```plaintext
  Authorization: Bearer <your_jwt_token>
  ```

- **Add a Book**:  
  `POST /books`  
  Request Body:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  ```

- **Get All Books**:  
  `GET /books`

---

## Technologies Used
- **React.js**: Frontend framework.
- **Axios**: HTTP client for API requests.
- **React Router**: For routing between pages.
- **Redux**: State management library for managing global application state.
- **Material-UI**: UI component library for building responsive and modern user interfaces.

---