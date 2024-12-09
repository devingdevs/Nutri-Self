import express from "express";
import { user_router } from "./usuario.js";
import { ali_router } from "./alimentos.js";
import { sem_router } from "./semanas.js";
import { ref_router } from "./refeiçao.js";


const app = express();


app.use(express.json());

app.use(user_router);

app.use(ali_router);

app.use(sem_router);

app.use(ref_router);


app.get("/", (req, res) => {
    res.send("servidor rodando");
});

app.listen(3000, (req, res) => {
    console.log("sem erros no servidor");
});



