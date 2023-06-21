const express = require("express");


const app =express();

const dbconfig = require('./db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require('./routes/bookingsRoute')
 
app.use(express.json())

app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 8800;

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set the static folder
    app.use(express.static("client/build"));
  
    // Serve the index.html file for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.listen(port, () => console.log('Node Server Started using Nodemon!'));