import {conn } from "./bandodedados.js"

import { Router } from "express";

const user_router = Router();

user_router.post("/usuario", (req, res) => {
    const {nome, email, senha} = req.body;

    conn.query(`INSERT INTO (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`, (err, result) => {
        if (err) {
            console.log("aconteceu o erro", err);
        };

        res.json(result);
    });
});

export { user_router }