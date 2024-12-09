import {Router} from "express";
import { conn } from "./bandodedados.js";

const sem_router = Router();

// Listar semanas de um usuário
sem_router.get("/semanas/:usuario_id", (req, res) => {
    const { usuario_id } = req.params;
    const sql = "SELECT * FROM semanas WHERE usuario_id = ?";
    conn.query(sql, [usuario_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Criar uma nova semana
sem_router.post("/semanas", (req, res) => {
    const { usuario_id, semana_inicio } = req.body;
    const sql = "INSERT INTO semanas (usuario_id, semana_inicio) VALUES (?, ?)";
    conn.query(sql, [usuario_id, semana_inicio], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Semana criada com sucesso!" });
    });
});

// Atualizar uma semana
sem_router.put("/semanas/:id", (req, res) => {
    const { id } = req.params;
    const { semana_inicio } = req.body;
    const sql = "UPDATE semanas SET semana_inicio = ? WHERE id = ?";
    conn.query(sql, [semana_inicio, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Semana atualizada com sucesso!" });
    });
});

// Excluir uma semana
sem_router.delete("/semana/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM semanas WHERE id = ?";
    conn.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Semana deletada com sucesso!" });
    });
});

export {sem_router};