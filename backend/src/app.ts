import fs from "fs";
import path from "path";
import compression from "compression";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config";
import { HTTP_STATUS_CODE } from "./constants";
import {
  authMiddleware,
  errorMiddleware,
  rateLimiterMiddleware,
} from "./middleware";
import {
  escolaridadesRouter,
  planesRouter,
  previaturasRouter,
  unidadesCurricularesRouter,
} from "./routes";

const app: Express = express();

const logDir = path.join(__dirname, "../logs");
const logFile = path.join(logDir, "accesos.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, "", { flag: "w" });
}

const logStream = fs.createWriteStream(logFile, {
  flags: "a",
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Logger
app.use(morgan("dev"));
if (env.NODE_ENV === "production")
  app.use(morgan("combined", { stream: logStream }));

// Seguridad
app.use(authMiddleware);
if (env.NODE_ENV === "production") app.use(rateLimiterMiddleware);

// Rutas
app.use("/api/previaturas", previaturasRouter);
app.use("/api/escolaridades", escolaridadesRouter);
app.use("/api/unidades-curriculares", unidadesCurricularesRouter);
app.use("/api/planes", planesRouter);

app.get("*", (_req, res) => {
  res.status(HTTP_STATUS_CODE.NOT_FOUND).json({ error: "Ruta no encontrada" });
});

// Manejador de errores
app.use(errorMiddleware);

export { app };
