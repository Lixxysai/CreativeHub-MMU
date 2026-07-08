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
- dotenv
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
mpm install dotenv
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

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
```

```bash
node Backendindex.js
```

Open the website:

```
http://localhost:3000  => http://localhost:3000**/placeURLfilehere**

The URL file is a html file and it is recommended to use the /homepage.html as a starting since it's the main page of the website

```

---

# MongoDB Database

This project is connected to a MongoDB Atlas cloud database.

**No additional MongoDB installation is required** since the provided MongoDB Atlas server is still available.

If the database connection changes in the future, update the MongoDB connection string inside the `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# Project Structure

```
CreativeHub-MMU
│
├── Backendindex.js
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

Note: Other files that are listed not used or contact.html are not used in the website, just the ones listed inside of the structure
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
| dotenv | Loads the MongoDB connection string from the .env file |

---

## Important

This project uses Express.js and Node.js.

**Do NOT open the HTML files directly from File Explorer.**

Incorrect:

```
file:///C:/CreativeHub-MMU/login.html
```

Correct:

```
http://localhost:3000/login.html
```

Reasoning: Other functions like Socket.io and express server can't express their code properly through regular file and some of the connection might not even work leaving the website in an unfinished and redundant kind of broken website

# Notes

- This project was developed as part of the **Mini IT Project** at **Multimedia University (MMU)**.
- The system uses **MongoDB Atlas** for cloud database storage.
- The lecturer only needs to install the required Node.js packages, create a `.env` file containing the MongoDB Atlas connection string, and run the server.

---

# Authors

MMUCreativeHub G083
- Sailesh
- Desmond
- Ibrahim

Multimedia University (MMU)
