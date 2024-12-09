import {Router} from "express";
import { conn } from "./bandodedados.js";

const ref_router = Router();


// Listar refeições de uma semana
ref_router.get("/refeicao/:semana_id", (req, res) => {
    const { semana_id } = req.params;
    const sql = "SELECT * FROM refeicoes WHERE semana_id = ?";
    conn.query(sql, [semana_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Criar uma nova refeição
ref_router.post("/refeicao/:semana_id", (req, res) => {
    const { semana_id } = req.params;
    const { dia, nome, horario } = req.body;
    const sql = "INSERT INTO refeicoes (semana_id, dia, nome, horario) VALUES (?, ?, ?, ?)";
    conn.query(sql, [semana_id, dia, nome, horario], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Refeição criada com sucesso!" });
    });
});

// Atualizar uma refeição
ref_router.put("/refeicao/:id", (req, res) => {
    const { id } = req.params;
    const { dia, nome, horario } = req.body;
    const sql = "UPDATE refeicoes SET dia = ?, nome = ?, horario = ? WHERE id = ?";
    conn.query(sql, [dia, nome, horario, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Refeição atualizada com sucesso!" });
    });
});

// Excluir uma refeição
ref_router.delete("/refeicao/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM refeicoes WHERE id = ?";
    conn.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Refeição deletada com sucesso!" });
    });
});

export {ref_router};