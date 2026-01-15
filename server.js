import express from 'express';
import cors from 'cors';

const app = express();

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend working!', timestamp: new Date().toISOString() });
});

// Simple auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }
  
  // Dummy response for testing
  res.json({ 
    token: 'dummy-token-123', 
    name: 'Test User',
    message: 'Login successful (demo mode)'
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  
  // Dummy response for testing
  res.json({ 
    message: 'Registration successful (demo mode)',
    userId: 'dummy-user-123'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'AI Resume Analyzer API', status: 'running' });
});

export default app;
