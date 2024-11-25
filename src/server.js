import express from "express";
import { user_router } from "./usuario.js";
import { alimentos_router } from "./alimentos.js";
import { exercicios_router } from "./exercicios.js";

const app = express();


app.use(express.json());

app.use(user_router);

app.use(alimentos_router);

app.use(exercicios_router)

app.get("/", (req, res) => {
    res.send("servidor rodando");
});

app.listen(3333, (req, res) => {
    console.log("sem erros no servidor");
});

