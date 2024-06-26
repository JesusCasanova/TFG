// Vendors
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
// Configs
import connectDatabase from "./config/database.config.js";
// Routes
import authRoutes from "./routes/auth.routes.js";
import reservationsRoutes from "./routes/reservations.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

dotenv.config();

await connectDatabase();

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api", reservationsRoutes);
app.use("/api", servicesRoutes);
app.use("/api", usersRoutes);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
