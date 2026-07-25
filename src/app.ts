import express, { Express } from "express";
import config from "./config";
import cors from "cors";
import { connectDB } from "./config/db";
import { logger } from "./utils/logger";


const app: Express = express()
const PORT = config.PORT || 8000;

const allowedOrigins = ["http://localhost:3000"]



app.use(
    cors({
        // origin: config.CORS_ORIGIN,
        origin: allowedOrigins,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


// Regular JSON parsing for all routes (webhooks will be skipped)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


// Connect to MongoDB
connectDB();


app.get('/', (req, res) => {
    res.json({ message: 'backend is running' })
})


try {
    // Start Server
    app.listen(PORT, () => {
        logger.info(`🚀 Server running in ${config.NODE_ENV} mode on port ${PORT}`);
        logger.info(
            `🔗 API Base URL: http://localhost:${PORT}${config.API_PREFIX}`
        );
    });
} catch (err) {
    console.error("🔥 Failed to start the server:", err);

}

export default app;
