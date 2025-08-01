// server/index.js

const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Serve analytics.js

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// When a client connects
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.post("/track", (req, res) => {
  const { url, timestamp } = req.body;
  console.log("🔍 Tracking:", { url, timestamp });

  // Later: Save to MongoDB here

  io.emit("new_visit", { url, timestamp }); // Optional for live updates
  res.status(200).send({ success: true });
});

// Start the server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
