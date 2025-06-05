import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'; // Add `.js` if using ES modules
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
// Connect to MongoDB


// App config
const app = express();
const port = process.env.PORT || 4000;

connectDB()
connectCloudinary()
// Middleware
app.use(express.json());
app.use(cors());

//api endpoint
app.use('/api/admin',adminRouter)
//localhost:4000/api/admin

// Routes
app.get('/', (req, res) => {
  res.send('API working great ✅');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
