import { conn } from "./bandodedados.js";
import { Router } from "express";

const list_exercicios = Router()

list_exercicios.get("/lista_de_exercicios") = (req, res) => {
    const {nome_exercicio, horas_dia, vezes_na_semana} = req.body

    conn.query(`select`, (err, result) => {`SELECT * FROM ALUNO WHERE ID=1`
        if (err) {
            console.log("aconteceu o erro", err)
        }
        res.json(result)
    })
}

export {list_exercicios}