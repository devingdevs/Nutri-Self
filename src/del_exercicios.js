import { conn } from "./bandodedados.js";
import { Router } from "express";

const d_exercicios = Router()

d_exercicios.delete("/delete_exercicio", (req, res) => {
    const {id} = req.body;

    conn.query(`DELETE FROM exerciciios WHERE id=${id}`, (err, result) => {
        if (err) {
            console.log("aconteceu o erro", err)
        }

        console.log("a tabela", result, "foi deletada")
        })
  
})

export {d_exercicios}
