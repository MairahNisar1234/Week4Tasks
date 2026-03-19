const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();

// 1. Dynamic Port for Deployment
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// 2. Socket.io Setup with CORS
const io = new Server(server, { 
  cors: { 
    origin: "*", // Change this to your Vercel URL after deployment for better security
    methods: ["GET", "POST", "DELETE"]
  } 
});

let announcements = [
  { id: 1, message: "Welcome to NewsHub! 🚀", date: new Date() }
];

// GET: Fetch all announcements
app.get('/announcements', (req, res) => {
  res.json(announcements); 
});

// POST: Create a new announcement
app.post('/announcement', (req, res) => {
  const { message } = req.body;
  if (message) {
    const newEntry = { id: Date.now(), message, date: new Date() };
    announcements.unshift(newEntry); 
    
    // Broadcast to all connected clients
    io.emit('announcement_updated'); 
    return res.status(200).json({ success: true });
  }
  res.status(400).json({ error: "No message" });
});

// DELETE: Remove an announcement by ID
app.delete('/announcement/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = announcements.length;
  
  // Filter out the one we want to delete
  announcements = announcements.filter(a => a.id.toString() !== id.toString());
  
  if (announcements.length < initialLength) {
    io.emit('announcement_updated'); // Tell frontend to refresh
    return res.status(200).json({ success: true });
  }
  res.status(404).json({ error: "Announcement not found" });
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server is live on port ${PORT}`);
});