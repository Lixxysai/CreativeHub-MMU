#  CreativeHub MMU

## Mini IT Project - Multimedia University (MMU)

CreativeHub MMU is a web-based social platform developed for MMU students to share artwork, communicate with other users, and interact through a global chat system.

---

# Features

- User Registration
- User Login
- Secure Password Encryption (bcrypt)
- User Profile
- Artwork Upload
- Homepage Artwork Feed
- Global Chat
- Persistent Chat History
- Artwork Comments
- MongoDB Atlas Database Integration

---

# Technologies Used

## Frontend

- HTML
- CSS
- JavaScript(fronted connection)

## Backend

-JavaScript(backend connection)
- Node.js
- Express.js
- Socket.IO
- MongoDB Atlas
- Mongoose
- Multer
- bcrypt

---

# Installation

Clone the repository.

Install all required packages:

```bash
npm install
```

Or install manually:

```bash
npm install express
npm install socket.io
npm install mongoose
npm install multer
npm install bcrypt
npm install mongodb
```

(Optional)

```bash
npm install --save-dev nodemon
```

---

# Built-in Node.js Modules

These are already included with Node.js.

- http
- path
- fs

No installation is required.

---

# Running the Project

Start the backend server:

```bash
node backendindex.js
```

Open the website:

```
http://localhost:3000  => http://localhost:3000**/placeURLfilehere**
```

---

# MongoDB Database

This project is connected to a MongoDB Atlas cloud database.

**No additional MongoDB installation is required** since the provided MongoDB Atlas server is still available.

If the database connection changes in the future, update the MongoDB connection string inside:

```
Backendindex.js
```

---

# Project Structure

```
CreativeHub-MMU
│
├── backendindex.js
├── User.model.js
├── Post.model.js
├── Message.model.js
├── Login.js
├── GlobalChat.js
├── PostSystem.js
├── CommentSystem.js
├── ChangeProfile.js
├── FirstRegisterProfile.js
├── homepage.html
├── homepage.js
├── upload.html
├── upload.js
├── profile.html
├── profile.js
├── chatroom.html
├── chatsystem.js
├── style.css
├── uploads/
├── package.json
└── README.md
```

---

# Dependencies

| Package | Purpose |
|----------|---------|
| express | Backend web server |
| socket.io | Real-time communication |
| mongoose | MongoDB Atlas connection |
| multer | Image upload handling |
| bcrypt | Password hashing |

---

# Notes

- This project was developed as part of the **Mini IT Project** at **Multimedia University (MMU)**.
- The system uses **MongoDB Atlas** for cloud database storage.
- The lecturer only needs to install the required Node.js packages and run the server if using the provided MongoDB Atlas connection.

---

# Authors

MMUCreativeHub G083
Sailesh
Demsmond
Ibrahim

Multimedia University (MMU)
