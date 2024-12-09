import { Router} from "express";
import { conn } from "./bandodedados.js";

const user_router = Router();

// listar
user_router.get("/usuario", (req, res) => {
    const sql = "SELECT * FROM usuarios";
    conn.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Criar 
user_router.post("/usuario", (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    conn.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Usuário criado com sucesso!" });
    });
});

// Atualizaa
user_router.put("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const sql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";
    conn.query(sql, [nome, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário atualizado com sucesso!" });
    });
});

// remoeve
user_router.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    conn.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário deletado com sucesso!" });
    });
});

export {user_router};