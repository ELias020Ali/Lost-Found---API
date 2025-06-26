Backend API

A Node.js + Express backend with MongoDB, JWT authentication, file uploads, and more.

## Tech Stack

* **Node.js**, **Express**
* **MongoDB** + **Mongoose**
* **JWT**, **bcrypt**
* **multer** (file uploads)
* **dotenv**, **validator**, **cors*Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/backend.git
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=your_mongo_uri
   JWT_SECRET=your_secret
   ```

4. Start the server:

   * Dev: `npm run dev`
   * Prod: `npm start`
