import express from 'express';
import cors from 'cors'
import indexRouter from './routes/index.js';
 
const app = express();
const PORT = process.env.PORT || 4000
 
app.use(cors());
app.use(express.json());
app.use('/api', indexRouter);
app.listen(PORT, ()=> console.log(`server is listening on http://localhost:${PORT}`));