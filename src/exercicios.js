import { Router } from "express";

import { conn } from "./bandodedados.js";

const exercicios_router = Router();

exercicios_router.post("/exercicios", (req, res) => {
    const {nome_exercicio, horas_dia, vezes_na_semana} = req.body;

    conn.query(`INSERT INTO (nome_exercicio, horas_dia, vezes_na_semana) VALUES ('${nome_exercicio}', '${horas_dia}', '${vezes_na_semana}')`, (err, result) => {
        if (err) {
            console.log("aconteceu o erro", err)
        }

        res.json(result)
    })
})


export { exercicios_router }