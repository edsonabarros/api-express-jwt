import express from "express";
import { userRoutes } from "./routes/userRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
