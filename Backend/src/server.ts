// import dotenv from 'dotenv';
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import itemRouter from './routers/item.router';
// import userRouter from './routers/user.router';
// import orderRouter from './routers/order.router';
// import { dbConnect } from './configs/database.config';
// dbConnect();

// const path = require('path');
// const app = express();
// app.use(express.json());
// app.use(cors({
//     credentials:true,
//     origin:["http://localhost:4200"]
// }));

// app.use("/api/items", itemRouter);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);

// const port = 5000;
// app.listen(port, () =>{
//     console.log("website served on http://localhost:"+ port);
// });

import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { dbConnect } from './configs/database.config';
import itemRouter from './routers/item.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';

dotenv.config();

const app = express();

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL || "http://localhost:4200"]
}));

// API routes
app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// Serve Angular production files
const angularDistPath = path.join(__dirname, '../../ClientSide/dist/ClientSide/browser');
app.use(express.static(angularDistPath));

// Catch-all: redirect all other routes to Angular
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../ClientSide/dist/ClientSide/browser/index.html'));
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 