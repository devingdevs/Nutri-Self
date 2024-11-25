import { Router } from "express";
import { conn } from "./bandodedados";

const alimentos_router = router()

alimentos_router.post("/alimentos", (req, res) => {
    const {nome_alimento, tipo, calorias, valor} = req.body;

    conn.query(`INSERT INTO (nome_alimento, tipo, calorias, valor) VALUES ('${nome_alimento}', '${tipo}', '${calorias}', '${valor}')`, (err, result) => {
        if (err) {
            console.log("aconteceu o erro", err)
        }

        res.json(result)
    })


})


export { alimentos_router }