import express from "express";
import { conn } from "./bandodedados.js";

const refeiçao_router = Router();

// Listar refeições de uma semana
refeiçao_router.get("/:semana_id", (req, res) => {
    const { semana_id } = req.params;
    const sql = `
        SELECT r.id AS refeicao_id, r.dia, r.nome AS refeicao, r.horario, 
               a.nome AS alimento, ir.quantidade,
               (a.calorias * ir.quantidade / 100) AS calorias,
               (a.proteinas * ir.quantidade / 100) AS proteinas,
               (a.carboidratos * ir.quantidade / 100) AS carboidratos,
               (a.gorduras * ir.quantidade / 100) AS gorduras
        FROM refeicoes r
        LEFT JOIN itens_refeicao ir ON r.id = ir.refeicao_id
        LEFT JOIN alimentos a ON ir.alimento_id = a.id
        WHERE r.semana_id = ?
        ORDER BY FIELD(r.dia, 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'), r.horario;
    `;
    conn.query(sql, [semana_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Adicionar uma refeição
refeiçao_router.post("/:semana_id", (req, res) => {
    const { semana_id } = req.params;
    const { dia, nome, horario } = req.body;
    const sql = "INSERT INTO refeicoes (semana_id, dia, nome, horario) VALUES (?, ?, ?, ?)";
    conn.query(sql, [semana_id, dia, nome, horario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Refeição adicionada com sucesso!" });
    });
});

export { refeiçao_router };