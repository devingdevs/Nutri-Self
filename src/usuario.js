import express from "express";
import { conn } from "./bandodedados.js";

const user_router = Router();

// listar 
user_router.get("/", (req, res) => {
    conn.query("SELECT * FROM usuarios", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// criar 
user_router.post("/", (req, res) => {
    const { nome, email, senha } = req.body;
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    conn.query(sql, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, message: "Usuário criado com sucesso!" });
    });
});


//atuaalizar
user_router.put("/usuarios/:id", (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;
    const sql = `UPDATE usuarios SET nome = ?, email = ? WHERE id = ?`;
    conn.query(sql, [nome, email, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuário atualizado com sucesso!" });
    });
});

//deletar
user_router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Usuario deletado com sucesso!"})
    });
});

export {user_router}
