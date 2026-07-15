import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/health', (_, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'KnowledgeVault API',
    version: '1.0.0',
  });
});

export default app;
