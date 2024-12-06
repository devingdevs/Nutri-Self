import express from "express";
import { conn } from "./bandodedados.js";

const alimentos_router = Router();

// Listar todos os alimentos
alimentos_router.get("/", (req, res) => {
    conn.query("SELECT * FROM alimentos", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Criar um novo alimento
alimentos_router.post("/", (req, res) => {
    const { nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio } = req.body;
    const sql = `
        INSERT INTO alimentos (nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    conn.query(sql, [nome, calorias, proteinas, carboidratos, gorduras, vitamina_a, vitamina_c, ferro, calcio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Alimento criado com sucesso!" });
    });
});


export { alimentos_router };
