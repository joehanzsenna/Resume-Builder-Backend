import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['http://localhost:5173'];

// const corsOptions = {
//   origin: function (origin, callback) {
//     // allow requests with no origin (like curl, Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'), false);
//     }
//   },
//   credentials: true,
//   methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization','Accept'],
//   preflightContinue: false, // let cors finish OPTIONS response
//   optionsSuccessStatus: 204,
// };
// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// register CORS before routes
// app.use(cors(corsOptions));
app.use(cors())

app.use(express.json());

await connectDB()

app.get('/', (req, res)=> res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
});