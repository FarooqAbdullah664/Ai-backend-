import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import resumeGeneratorRoutes from './routes/resumeGeneratorRoutes.js';
import resumeMatchRoutes from './routes/resumeMatchRoutes.js';
import cvRoutes from './routes/cvRoutes.js';

dotenv.config();
const app = express();

// Simple CORS setup
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Handle preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working!', timestamp: new Date().toISOString() });
});

// Connect to MongoDB only if MONGO_URI exists
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Error:', err.message));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/resume-generator', resumeGeneratorRoutes);
app.use('/api/resume-match', resumeMatchRoutes);
app.use('/api/cv', cvRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'AI Resume Analyzer API', status: 'running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
